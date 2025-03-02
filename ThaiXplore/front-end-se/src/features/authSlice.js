import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async function สำหรับ login (API request)
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", userData, { withCredentials: true });
    return response.data; // สมมติ API ส่ง { user: {id, name, email}, token }
  } catch (error) {
    return rejectWithValue("Invalid email or password.");
  }
});

// 🔹 Async function สำหรับ logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
    return null;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await axios.get("http://localhost:3000/users", { withCredentials: true }); // ส่ง Cookie ไปด้วย
  return res.data;
});


// 🔹 Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  loginError: null,
  errors: null,
};

// 🔹 สร้าง Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.authentication.sessionToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
