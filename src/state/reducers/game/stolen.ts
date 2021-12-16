import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../common/numberValueModify';
import { getInitialState as getStoreInitialState } from '../stores';

const slice = createSlice({
  name: 'stolen',
  initialState: getStoreInitialState(),
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
