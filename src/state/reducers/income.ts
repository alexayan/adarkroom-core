import { Income } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import numberValueModify from './common/numberValueModify';

const slice = createSlice({
  name: 'income',
  initialState: {} as {
    thieves?: Income;
    builder?: Income;
    gatherer?: Income;
    hunter?: Income;
    trapper?: Income;
    tanner?: Income;
    charcutier?: Income;
    iron_miner?: Income;
    coal_miner?: Income;
    sulphur_miner?: Income;
    steelworker?: Income;
    armourer?: Income;
  },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
