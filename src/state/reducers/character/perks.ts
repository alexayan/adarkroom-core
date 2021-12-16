import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Perks, PerkCategory } from '../../../type';
import { actions as notificationsActions } from '../notifications';

export function getInitialState() {
  return Object.keys(Perks).reduce((accumulator, current) => {
    accumulator[current as PerkCategory] = false;
    return accumulator;
  }, {} as { [key in PerkCategory]: boolean });
}

const addPerk = createAsyncThunk(
  'character/perks/add',
  async (category: PerkCategory, { dispatch }) => {
    const perk = Perks[category];
    dispatch(
      notificationsActions.notify({
        message: {
          text: perk.notify,
        },
      })
    );
    return category;
  }
);

const slice = createSlice({
  name: 'perks',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      addPerk.fulfilled,
      (state, action: PayloadAction<PerkCategory>) => {
        state[action.payload] = true;
      }
    );
  },
});

export const actions = {
  ...slice.actions,
  addPerk,
};

export default slice.reducer;
