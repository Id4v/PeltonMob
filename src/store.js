import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'screen/Login/userSlice';
import loadingReducer from 'components/LoadingView/loaderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loadingReducer,
  },
  devTools: true,
});

export default store;
