import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'space_ship',
  initialState: {
    hull: 0,
    thrusters: 1,
    seenShip: false,
    seenWarning: false,
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
