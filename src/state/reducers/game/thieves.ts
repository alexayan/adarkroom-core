import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'thieves',
  initialState: 0,
  reducers: {
    ...numberValueModify,
    change(_, action) {
      return action.payload;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
