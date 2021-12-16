import { createSlice } from '@reduxjs/toolkit';
import { StoreCategory } from '../../type';
import numberValueModify from './common/numberValueModify';

export function getInitialState() {
  const rtn = Object.values(StoreCategory).reduce((p, c: StoreCategory) => {
    p[c] = undefined;
    return p;
  }, {} as { [key in StoreCategory]: number | undefined });
  return rtn;
}

const storesSlice = createSlice({
  name: 'stores',
  initialState: getInitialState(),
  reducers: {
    ...numberValueModify,
  },
});

export const actions = storesSlice.actions;

export default storesSlice.reducer;
