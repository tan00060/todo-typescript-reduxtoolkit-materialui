import React from "react";
import { useAppSelector } from "../../app/hooks";
import "./todoListItem.scss";
import ListItemContainer from "../listItemContainer/listItemContainer";

const TodoListItems = () => {
  const todoList = useAppSelector((state) => state.todoList.list);

  return (
    <div className="listContainer">
      {todoList.length !== 0 ? (
        todoList.map((item: any, i) => <ListItemContainer listItem={item} />)
      ) : (
        <>no items</>
      )}
    </div>
  );
};

export default TodoListItems;
