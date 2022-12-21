import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Login/userSlice';
import loadingReducer from 'components/LoadingView/loaderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loadingReducer,
  },
  devTools: true,
});

export default store;
