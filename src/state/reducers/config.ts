import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    hyperMode: false,
    soundOn: false,
  },
  reducers: {
    changeHyperMode(state, action: PayloadAction<boolean>) {
      state.hyperMode = action.payload;
    },
    changeSound(state, action: PayloadAction<boolean>) {
      state.soundOn = action.payload;
    },
  },
});

export const actions = configSlice.actions;

export default configSlice.reducer;
