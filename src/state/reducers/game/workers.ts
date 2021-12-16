import { createSlice } from '@reduxjs/toolkit';
import { WorkerType } from '../../../type';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'workers',
  initialState: {} as { [key in WorkerType]: number },
  reducers: {
    ...numberValueModify,
  },
});

export const actions = slice.actions;

export default slice.reducer;
