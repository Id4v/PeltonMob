import {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isVisible: false,
    text: 'Loading...'
  },
  reducers: {
    showLoader: (state, action) => {
      state.isVisible = true;
      state.text = 'Loading...';

      if (action.payload && action.payload.text) {
        state.text = action.payload.text;
      }

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
export const getText = (state) => state.loader.text;
