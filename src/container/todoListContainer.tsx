import React, { ChangeEvent, useState } from "react";
import { addTodoItem } from "../features/todoList/todoListSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { v4 as uuidv4 } from "uuid";
import { storeList } from "../utils/storeList";
import { Button, Stack, TextField } from "@mui/material";

import "./todoListContainer.scss";

type toDoItem = {
  id: string;
  name: string;
  status: boolean;
  dateCreated: string;
};

const TodoListContainer = () => {
  //redux
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.list);

  const [todoItemName, setTodoItemName] = useState<string>("");

  const clearFields = () => {
    setTodoItemName("");
  };

  const setTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItemName(e.target.value);
  };

  const createTodoHandler = () => {
    let date = new Date();

    if (todoItemName.trim() === "") {
      console.log("empty todo name");
      return;
    }

    let toDoItem: toDoItem = {
      id: uuidv4(),
      name: todoItemName,
      status: false,
      dateCreated: date.toISOString().split("T")[0],
    };

    dispatch(addTodoItem(toDoItem));
    setTodoItemName("");
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="To Do Item"
          variant="outlined"
          type="text"
          value={todoItemName}
          onChange={setTodoName}
        />

        <div className="todoListContainerButtons">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" onClick={clearFields}>
              clear
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={createTodoHandler}
            >
              create
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default TodoListContainer;
