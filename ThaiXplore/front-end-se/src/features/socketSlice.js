import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: { socket: null },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    disconnectSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
