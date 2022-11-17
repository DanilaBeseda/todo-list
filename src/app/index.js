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

dayjs.extend(customParseFormat);

function App() {
  const db = getDatabase();
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

  /** Проверка даты на экспирацию каждые n секунд*/
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
    add: useCallback(() => {
      setTodoItem({
        title: "",
        description: "",
        expiration: "",
        isComplete: false,
        file: "",
      });
    }, []),
    edit: useCallback((item) => {
      setTodoItem(item);
    }, []),
    remove: useCallback(
      (id) => {
        remove(ref(db, "todo-items/" + id)).catch((e) => {
          alert(e);
        });
      },
      [db]
    ),
    submit: useCallback(
      (item) => {
        /** Редактируемый item */
        if (item.id) {
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
          /** Новый item */
        } else {
          push(ref(db, "todo-items/"), item)
            .catch((e) => {
              alert(e);
            })
            .finally(() => {
              setTodoItem(null);
            });
        }
      },
      [db]
    ),
    cancel: useCallback(() => {
      setTodoItem(null);
    }, []),
  };

  /** Функции для рендер пропсов */
  const renders = {
    TodoItem: useCallback(
      (item) => {
        return (
          <TodoItem
            theme={item.isComplete ? "line-through" : "default"}
            item={item}
            onEdit={callbacks.edit}
            onRemove={callbacks.remove}
          />
        );
      },
      [callbacks.edit, callbacks.remove]
    ),
  };

  return (
    <LayoutPage header={<h1>Todo List</h1>}>
      {!isLoading ? (
        <>
          {todoList && <List items={todoList} renderItem={renders.TodoItem} />}
          <Button onClick={() => callbacks.add()}>Добавить</Button>
          {todoItem && (
            <TodoItemForm
              item={todoItem}
              onSubmit={callbacks.submit}
              onCancel={callbacks.cancel}
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
