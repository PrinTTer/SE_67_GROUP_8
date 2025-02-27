import { createSlice } from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  initialState: {
    currentPath: '/',
  },
  reducers: {
    setPath: (state, action) => {
      state.currentPath = action.payload;  // เก็บ path ที่เปลี่ยนแปลง
    },
  },
});

export const { setPath } = pathSlice.actions;
export default pathSlice.reducer;
