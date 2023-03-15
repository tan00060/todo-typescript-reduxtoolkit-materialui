import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoListSlice from "../features/todoList/todoListSlice";

export const store = configureStore({
  reducer: {
    todoList: todoListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
