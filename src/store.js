import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@app/features/Login/userSlice';
import loadingReducer from '@app/components/LoadingView/loaderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loadingReducer,
  },
  devTools: true,
});

export default store;
