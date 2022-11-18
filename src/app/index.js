import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import List from "../components/elements/List";
import Button from "../components/elements/Button";
import LayoutPage from "../components/layouts/LayoutPage";
import TodoItemForm from "../components/forms/TodoItemForm";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";
import objToArr from "../utils/objToArr";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

dayjs.extend(customParseFormat);

function App() {
  const db = getDatabase();
  const storage = getStorage();
  /** Задержка для проверки todoList на айтемы с истёкшим сроком */
  const timeInterval = 3000;
  /** Выбранный для редактирования todo item */
  const [todoItem, setTodoItem] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /** Подписка на db */
  useEffect(() => {
    setIsLoading(true);
    onValue(ref(db, "todo-items"), (snapshot) => {
      const val = snapshot.val();
      val ? setTodoList(objToArr(val)) : setTodoList(null);
      setIsLoading(false);
    });
  }, [db]);

  /** Проверка даты на экспирацию каждые n секунд */
  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = dayjs();
      todoList?.forEach((item) => {
        const isExpirationDateExist = item.expiration;
        const isComplete = item.isComplete;
        const isTodoItemOverdue =
          today.diff(dayjs(item.expiration, "HH-mm")) > 0;

        if (isExpirationDateExist && !isComplete && isTodoItemOverdue) {
          set(ref(db, "todo-items/" + item.id), {
            title: item.title,
            description: item.description,
            expiration: item.expiration,
            isComplete: true,
            file: item.file,
          });
        }
      });
    }, timeInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [db, todoList]);

  /** Колбеки для мемоизации ссылок */
  const callbacks = {
    addNewItem: useCallback(() => {
      setTodoItem({
        title: "",
        description: "",
        expiration: "",
        isComplete: false,
        file: null,
      });
    }, []),
    editItem: useCallback((item) => {
      setTodoItem(item);
    }, []),
    removeItem: useCallback(
      (id) => {
        setIsLoading(true);
        remove(ref(db, "todo-items/" + id)).catch((e) => {
          alert(e);
        });
      },
      [db]
    ),
    submit: useCallback(
      async (item) => {
        setIsLoading(true);
        /** Если прикреплённый файл был изменён */
        if (item.file instanceof File) {
          const url = await callbacks.uploadFile(item.file);
          item.file = { name: item.file.name, url };
        }
        /** id == true значит item редактируется, иначе пушится новый */
        item.id ? callbacks.updateItem(item) : callbacks.pushNewItem(item);
      },
      [db]
    ),
    cancelChanges: useCallback(() => {
      setTodoItem(null);
    }, []),
    uploadFile: useCallback(
      async (file) => {
        try {
          const ref = storageRef(storage, file.name);
          await uploadBytes(ref, file);
          const url = await getDownloadURL(ref);
          return url;
        } catch (e) {
          alert(e);
        }
      },
      [storage]
    ),
    pushNewItem: useCallback(
      (item) => {
        push(ref(db, "todo-items/"), item)
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            setTodoItem(null);
          });
      },
      [db]
    ),
    updateItem: useCallback(
      (item) => {
        set(ref(db, "todo-items/" + item.id), {
          title: item.title,
          description: item.description,
          expiration: item.expiration,
          isComplete: item.isComplete,
          file: item.file,
        })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            setTodoItem(null);
          });
      },
      [db]
    ),
  };

  /** Функции для рендер пропсов */
  const renders = {
    TodoItem: useCallback(
      (item) => {
        return (
          <TodoItem
            theme={item.isComplete ? "line-through" : "default"}
            item={item}
            onEdit={callbacks.editItem}
            onRemove={callbacks.removeItem}
          />
        );
      },
      [callbacks.editItem, callbacks.removeItem]
    ),
  };

  return (
    <LayoutPage header={<h1>Todo List</h1>}>
      {!isLoading ? (
        <>
          {todoList && <List items={todoList} renderItem={renders.TodoItem} />}
          <Button onClick={() => callbacks.addNewItem()}>Добавить</Button>
          {todoItem && (
            <TodoItemForm
              item={todoItem}
              onSubmit={callbacks.submit}
              onCancel={callbacks.cancelChanges}
            />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </LayoutPage>
  );
}

export default App;
