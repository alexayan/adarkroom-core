import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'statistics',
  initialState: {
    punches: 0,
    starved: 0,
    dehydrated: 0,
    cityCleared: false,
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
