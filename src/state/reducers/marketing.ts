import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'marketing',
  initialState: {
    penrose: false,
  },
  reducers: {
    changePenrose(state, action) {
      state.penrose = action.payload;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
