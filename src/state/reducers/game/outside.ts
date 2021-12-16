import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'outside',
  initialState: {
    seenForest: false,
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
