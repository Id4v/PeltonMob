import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showLoader: (state) => {
      state.isVisible = true;
    },
    hideLoader: (state) => {
      state.isVisible = false;
    },
    toggleLoader: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showLoader, hideLoader, toggleLoader } = loaderSlice.actions;

export default loaderSlice.reducer;

export const isLoading = (state) => state.loader.isVisible;
