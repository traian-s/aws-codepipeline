import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizzReducer from "./quizzSlice";

export const store = configureStore({
  reducer: {
    quizz: quizzReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
