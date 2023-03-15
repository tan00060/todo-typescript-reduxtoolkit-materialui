import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, TextField } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  finishTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "../../features/todoList/todoListSlice";
interface toDoItem {
  id: string;
  name: string;
  status: boolean;
  dateCreated: string;
}

const ListItemContainer = ({ listItem }: { listItem: toDoItem }) => {
  const todoList = useAppSelector((state) => state.todoList.list);
  const dispatch = useAppDispatch();

  const [editTodo, setEditTodo] = React.useState<boolean>(false);
  const [updatedItem, setUpdatedItem] = React.useState<string>(listItem.name);

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

  const editItemHandler = () => {
    setEditTodo(true);
  };

  const cancelEditHandler = () => {
    setEditTodo(false);
  };

  const updateTodoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUpdatedItem(e.target.value);
  };

  const saveUpdateItem = () => {
    let updateArray = todoList.findIndex(
      (item: any) => item.id === listItem.id
    );

    let updatedListItem: Object = {
      itemToUpdate: updateArray,
      updatedItem: {
        id: listItem.id,
        name: updatedItem,
        status: listItem.status,
        dateCreated: listItem.dateCreated,
      },
    };

    dispatch(updateTodoItem(updatedListItem));
    setEditTodo(false);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem
        key={listItem.id}
        secondaryAction={
          <div>
            {editTodo ? (
              <div className="buttonContainer">
                <Button size="small" onClick={() => cancelEditHandler()}>
                  Cancel
                </Button>
                <Button size="small" onClick={() => saveUpdateItem()}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="buttonContainer">
                <Button
                  onClick={() => deleteItem(listItem)}
                  disabled={!listItem.status}
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button size="small" onClick={() => editItemHandler()}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        }
        disablePadding
      >
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={listItem.status}
              tabIndex={-1}
              disableRipple
              onClick={() => checkHandler(listItem)}
            />
          </ListItemIcon>
          {editTodo ? (
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={listItem.name}
              variant="filled"
              size="small"
              onChange={updateTodoValue}
            />
          ) : (
            <ListItemText primary={`${listItem.name}`} />
          )}
        </ListItem>
      </ListItem>
    </List>
  );
};

export default ListItemContainer;
