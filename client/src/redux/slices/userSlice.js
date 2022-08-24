import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  success: false,
  access_token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.success = action.payload.success;
      state.access_token = action.payload.access_token;
    },
    loginFailure(state) {
      state.loading = false;
      state.error = true;
    },
    logout(state) {
      state.currentUser = null;
      state.success = false;
      state.loading = false;
      state.error = false;
      state.access_token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
