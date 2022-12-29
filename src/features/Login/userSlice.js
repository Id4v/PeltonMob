import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from '@app/api/client';
import {logout, onAuthenticate, onAuthenticateFailed, onGetProfile} from "@app/features/Login/reducers";
import {hideLoader, showLoader} from "@app/components/LoadingView/loaderSlice";

export const authenticate = createAsyncThunk(
  'user/authenticate',
  async ({ username, password }, {dispatch}) => {
    dispatch(showLoader({text:'Connexion...'}));
    const response = await Api.authenticate(username, password);
    Api.setHeaderToken(response.token);

    await dispatch(getProfile());
    dispatch(hideLoader());
    return {
      token : response.token,
    };
  },
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
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
    profile : null,
  },
  reducers: {
    logout,
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, onAuthenticate);
    builder.addCase(authenticate.rejected, onAuthenticateFailed);
    builder.addCase(getProfile.fulfilled, onGetProfile)
  },
});

export const {logoutAction} = userSlice.actions;

export { isLoggedIn, getJwtToken, getUsername } from './selectors';

export default userSlice.reducer;
