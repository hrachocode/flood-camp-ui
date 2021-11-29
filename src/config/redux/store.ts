import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mainSlice from "./main.slice";

export const store = configureStore({
  reducer: { main: mainSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
