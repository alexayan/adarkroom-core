import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';
import { TemperatureStatus } from '../../../type';
import config from '../../../config';

const slice = createSlice({
  name: 'temperature',
  initialState: {
    status: config.Room.TemperatureStatus.Freezing,
  },
  reducers: {
    ...numberValueModify,
    change(state, action: PayloadAction<TemperatureStatus>) {
      state.status = action.payload;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
