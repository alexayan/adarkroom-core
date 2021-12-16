import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from './common/numberValueModify';

const slice = createSlice({
  name: 'delay',
  initialState: {} as { [key: string]: any },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
