import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'room',
  initialState: {
    changed: true,
    crafts: {} as { [key: string]: boolean },
    buys: {} as { [key: string]: boolean },
  },
  reducers: {
    setChanged(state, action: PayloadAction<boolean>) {
      state.changed = action.payload;
    },
    addCraft(state, action: PayloadAction<{ name: string}>) {
      const { name } = action.payload;
      state.crafts[name] = true;
    },
    addBuy(state, action: PayloadAction<{ name: string }>) {
      const { name } = action.payload;
      state.buys[name] = true;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
