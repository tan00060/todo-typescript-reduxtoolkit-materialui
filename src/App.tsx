import React, { useEffect } from "react";
import "./App.css";
import TodoListContainer from "./container/todoListContainer";
import TodoListItems from "./container/todoListItem";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getSessionStorageTodoList } from "./utils/getSessionStorageTodoList";
import { getTodoList } from "./features/todoList/todoListSlice";

interface todoArray {
  dateCreated: string;
  id: string;
  name: string;
  status: boolean;
}

function App() {
  const todoList = useAppSelector((state) => state.todoList.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoList.length === 0) {
      console.log("load our to do list from local storage.");
      let list: any = getSessionStorageTodoList();
      dispatch(getTodoList(list));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <TodoListContainer />
        <TodoListItems />
      </header>
    </div>
  );
}

export default App;
