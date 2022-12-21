import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Client from 'api/client';
import { Toast } from 'native-base';
import { hideLoader, showLoader } from 'components/LoadingView/loaderSlice';
import { CommonActions } from '@react-navigation/native';

export const authenticate = createAsyncThunk(
  'user/authenticate',
  async ({ username, password }) => {
    const api = new Client();
    return api.authenticate(username, password);
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (data, { dispatch }) => {
    const api = new Client();
    dispatch(showLoader());
    return api.register(data)
      .catch((er) => {
        dispatch(hideLoader());
        Toast.show({
          placement: 'bottom',
          backgroundColor: 'red.800',
          color: 'white',
          title: er.message,
        });
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch(CommonActions.navigate({ name: 'Login' }));
        return response.data;
      });
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
      Toast.show({
        placement: 'bottom',
        backgroundColor: 'red.800',
        color: 'white',
        title: action.error.message,
      });
    });
  },
});

export const { logout } = userSlice.actions;

export const getJwtToken = (state) => state.user.jwtToken;
export const isLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
