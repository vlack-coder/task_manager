import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    app: appReducer
  },
});
