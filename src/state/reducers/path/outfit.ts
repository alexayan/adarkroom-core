import { createSlice } from '@reduxjs/toolkit';
import { StoreCategory } from '../../../type';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'outfit',
  initialState: {} as { [key in StoreCategory]?: number },
  reducers: {
    ...numberValueModify,
    empty() {
      return {};
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
