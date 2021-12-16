import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FireStatus } from '../../../type';
import config from '../../../config';

const slice = createSlice({
  name: 'fire',
  initialState: {
    status: config.Room.FireStatus.Dead,
  },
  reducers: {
    changeFire(state, action: PayloadAction<FireStatus>) {
      state.status = action.payload;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
