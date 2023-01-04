import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@app/features/Login/userSlice';
import loadingReducer from '@app/components/LoadingView/loaderSlice';
import Api from '@app/api/client';

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loadingReducer,
  },
  devTools: true,
});

Api.setStore(store);

export default store;
