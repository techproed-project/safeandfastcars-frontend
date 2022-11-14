import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isUserLogin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isUserLogin = true;
    },
    loginFailed: (state) => {
      state.user = {};
      state.isUserLogin = false;
    },
    logout: (state) => {
      state.user = {};
      state.isUserLogin = false;
    },
  },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
