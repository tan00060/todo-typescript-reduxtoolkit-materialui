import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeList } from "../../utils/storeList";

//type of our todolist
interface todoState {
  list: Array<Object>;
}

const initialState: todoState = {
  list: [],
};

interface item {
  id: string;
  status: boolean;
}

export const todoListSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    getTodoList: (state, action: PayloadAction<Array<Object>>) => {
      state.list = action.payload;
    },

    addTodoItem: (state, action: PayloadAction<Object>) => {
      state.list.push(action.payload);
      storeList(state.list);
    },

    finishTodoItem: (state, action: PayloadAction<Object>) => {
      let payload: any = action.payload;
      var foundIndex = state.list.findIndex(
        (item: any) => item.id === payload.id
      );
      state.list[foundIndex] = action.payload;
      storeList(state.list);
    },

    deleteTodoItem: (state, action: PayloadAction<Array<Object>>) => {
      state.list.splice(0, state.list.length, ...action.payload);
      storeList(state.list);
    },

    updateTodoItem: (state, action: PayloadAction<any>) => {
      state.list[action.payload.itemToUpdate] = action.payload.updatedItem;
      storeList(state.list);
    },
  },
});

export const {
  getTodoList,
  addTodoItem,
  finishTodoItem,
  deleteTodoItem,
  updateTodoItem,
} = todoListSlice.actions;
export default todoListSlice.reducer;
