import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'population',
  initialState: {
    value: 0,
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
