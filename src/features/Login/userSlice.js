import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Client from '@app/api/client';
import {showToast} from "@app/components/Toast";

export const authenticate = createAsyncThunk(
  'user/authenticate',
  async ({ username, password }) => {
    const api = new Client();
    return api.authenticate(username, password);
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    jwtToken: null,
    hasLoginError: false,
  },
  reducers: {
    logout: (state) => {
      state.jwtToken = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.hasLoginError = false;
      state.jwtToken = action.payload.token;
      state.loggedIn = true;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      showToast({type: 'error', title: 'Une erreur s\'est produite.', message: action.error.message});
    });
  },
});

export const { logout } = userSlice.actions;

export const getJwtToken = (state) => state.user.jwtToken;
export const isLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
