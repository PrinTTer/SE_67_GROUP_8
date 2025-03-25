import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import pathReducer from "../features/pathSlice";
import socketReducer from "../features/socketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    path: pathReducer,
    socket: socketReducer,
  },
});

export default store;
