import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from './common/numberValueModify';

const storesSlice = createSlice({
  name: 'previous',
  initialState: {
    stores: [],
    score: 0,
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = { ...storesSlice.actions };

export default storesSlice.reducer;
