import { createSlice } from '@reduxjs/toolkit';
import { Building } from '../../../type';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'stores',
  initialState: {} as  { [key in Building]: number },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
