import React, { useCallback } from "react";
import TodoItem from "../components/TodoItem";
import List from "../components/List";
import Layout from "../components/Layout";

function App() {
  const items = [
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
  ];

  //Функции для рендер пропсов
  const renders = {
    TodoItem: useCallback((item) => {
      return <TodoItem item={item} />;
    }, []),
  };

  return (
    <Layout header={<h1>Todo List</h1>}>
      <List items={items} renderItem={renders.TodoItem} />
    </Layout>
  );
}

export default App;
