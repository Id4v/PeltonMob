import {showToast} from "@app/components/Toast";

export const logout = (state) => {
  state.jwtToken = null;
  state.loggedIn = false;
};

export const onAuthenticate = (state, action) => {
  state.hasLoginError = false;
  state.jwtToken = action.payload.token;
  state.loggedIn = true;
};

export const onAuthenticateFailed = (state, action) => {
  showToast({type: 'error', title: 'Une erreur s\'est produite.', message: action.error.message});
};

export const onGetProfile = (state, action) => {
  state.profile = action.payload;
};