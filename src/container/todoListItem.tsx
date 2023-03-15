import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  finishTodoItem,
  deleteTodoItem,
} from "../features/todoList/todoListSlice";
import "./todoListItem.scss";
import CheckboxList from "./listItem";

interface toDoItem {
  id: string;
  name: string;
  status: boolean;
  dateCreated: string;
}

const TodoListItems = () => {
  const todoList = useAppSelector((state) => state.todoList.list);
  const dispatch = useAppDispatch();

  const checkHandler = (item: toDoItem) => {
    dispatch(
      finishTodoItem({
        name: item.name,
        status: !item.status,
        id: item.id,
        dateCreated: item.dateCreated,
      })
    );
  };

  const deleteItem = (deleteItem: any) => {
    let newList = todoList.filter((item: any) => item.id !== deleteItem.id);
    dispatch(deleteTodoItem(newList));
  };

  return (
    <div className="listContainer">
      {todoList.length !== 0 ? (
        todoList.map((item: any, i) => <CheckboxList listItem={item} />)
      ) : (
        <>no items</>
      )}
    </div>
  );
};

export default TodoListItems;
