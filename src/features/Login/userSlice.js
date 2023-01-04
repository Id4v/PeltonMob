import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from '@app/api/client';
import {logout, onAuthenticate, onAuthenticateFailed, onFetchProfile} from "@app/features/Login/reducers";
import {hideLoader, showLoader} from "@app/components/LoadingView/loaderSlice";

Api.addResponseInterceptor(
  response => response,
  function(error) {
    const originalConfig = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        if (originalConfig.url !== '/api/login') {
          try {
            this.store.dispatch(logoutAction());
          } catch (e) {
            console.debug(e);
          }
        } else {
          return Promise.reject({
            code: '401',
            name: 'Unauthorized',
            message: error.response.data.message,
            stack: error.stack,
          });
        }
      }

      return Promise.reject({
          code: String(error.response.status),
          name: error.name,
          message: error.response.data.detail,
          stack: error.stack,
        });
    }
    return Promise.reject(error);
  }
)

export const authenticate = createAsyncThunk(
  'user/authenticate',
  async ({username, password}, {dispatch}) => {
    dispatch(showLoader({text: 'Connexion...'}));
    try {
      const response = await Api.authenticate(username, password);
      Api.setHeaderToken(response.token);

      await dispatch(fetchProfile());
      return {
        token: response.token,
      };
    }catch (e) {
      return Promise.reject(e)
    }finally {
      dispatch(hideLoader());
    }
  },
);

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    return Api.getProfile();
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    jwtToken: null,
    hasLoginError: false,
    profile: null,
  },
  reducers: {
    logoutAction: logout,
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, onAuthenticate);
    builder.addCase(authenticate.rejected, onAuthenticateFailed);
    builder.addCase(fetchProfile.fulfilled, onFetchProfile)
  },
});

export const {logoutAction} = userSlice.actions;

export {isLoggedIn, getJwtToken, getUsername, getProfileInfo} from './selectors';

export default userSlice.reducer;
