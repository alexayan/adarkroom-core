import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    Outside: false,
    Room: false,
    Ship: false,
    World: false,
    Path: false,
  },
  reducers: {
    enableOutside(state) {
      state.Outside = true;
    },
    enableRoom(state) {
      state.Room = true;
    },
    enableSpaceShip(state) {
      state.Ship = true;
    },
    enableWorld(state) {
      state.World = true;
    },
    enablePath(state) {
      state.Path = true;
    },
  },
});

export const actions = locationSlice.actions;

export default locationSlice.reducer;
