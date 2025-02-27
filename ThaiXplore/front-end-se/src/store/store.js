import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import pathReducer from "../features/pathSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    path: pathReducer,
  },
});

export default store;
