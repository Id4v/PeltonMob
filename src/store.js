import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'screen/Login/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: true,
});

export default store;