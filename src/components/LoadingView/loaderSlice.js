import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isVisible: false,
  },
  reducers: {
    show: (state) => {
      state.isVisible = true;
    },
    hide: (state) => {
      state.isVisible = false;
    },
    toggle: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { show, hide, toggle } = loaderSlice.actions;

export default loaderSlice.reducer;

export const isLoading = (state) => state.loader.isVisible;
