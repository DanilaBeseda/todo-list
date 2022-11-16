import React, { useCallback, useState } from "react";
import TodoItem from "../components/TodoItem";
import List from "../components/elements/List";
import Button from "../components/elements/Button";
import LayoutPage from "../components/layouts/LayoutPage";
import TodoItemForm from "../components/forms/TodoItemForm";

function App() {
  /** Выбранный для редактирования todo item */
  const [todoItem, setTodoItem] = useState(null);
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      title: "title",
      description: "description",
      expiration: "expiretion",
      file: "file",
    },
    {
      id: "2",
      title: "title",
      description: "description",
      expiration: "expiretion",
      file: "file",
    },
  ]);

  /**
   * Создание нового item
   * @returns {object} новый item
   */
  function createEmptyItem() {
    return {
      id: 3,
      title: "",
      description: "",
      expiration: "",
      file: "",
    };
  }

  /** Колбеки для мемоизации ссылок */
  const callbacks = {
    add: useCallback(() => {
      setTodoItem(createEmptyItem());
    }, []),
    edit: useCallback((item) => {
      setTodoItem(item);
    }, []),
    remove: useCallback(
      (id) => {
        setTodoList(
          todoList.filter((item) => {
            return item.id !== id;
          })
        );
      },
      [todoList]
    ),
    submit: useCallback((item) => {
      //TODO: изменить item в database
      console.log(`submit: ${JSON.stringify(item, null, 2)}`);
      setTodoItem(null);
    }, []),
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
      <List items={todoList} renderItem={renders.TodoItem} />
      <Button onClick={() => callbacks.add()}>Добавить</Button>
      {todoItem && (
        <TodoItemForm
          item={todoItem}
          onSubmit={callbacks.submit}
          onCancel={callbacks.cancel}
        />
      )}
    </LayoutPage>
  );
}

export default App;
