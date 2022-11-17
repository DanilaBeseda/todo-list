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

function App() {
  const db = getDatabase();
  /** Выбранный для редактирования todo item */
  const [todoItem, setTodoItem] = useState(null);
  const [todoList, setTodoList] = useState(null);

  /** Подписка на db */
  useEffect(() => {
    onValue(ref(db, "todo-items"), (snapshot) => {
      setTodoList(objToArr(snapshot.val()));
    });
  }, [db]);

  /** Колбеки для мемоизации ссылок */
  const callbacks = {
    add: useCallback(() => {
      setTodoItem({
        title: "",
        description: "",
        expiration: "",
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
      {todoList ? (
        <>
          <List items={todoList} renderItem={renders.TodoItem} />
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
