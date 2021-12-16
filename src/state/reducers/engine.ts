import { GameSpace } from '../../type';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../index';
import { actions as notificationActions } from '../../state/reducers/notifications';

const changeSpace = createAsyncThunk(
  'engine/changeSapce',
  async (space: GameSpace, { getState, dispatch }) => {
    const appState = getState() as GameState;
    let prevSpace = appState.engine.activeSpace;
    if (prevSpace !== space) {
      dispatch(notificationActions.spaceNotify(space));
    }
    return space;
  }
);

const configSlice = createSlice({
  name: 'engine',
  initialState: {
    activeSubSpace: ''
  } as { activeSpace?: GameSpace, activeSubSpace: string },
  reducers: {
    changeSubSpace(state, action) {
      state.activeSubSpace = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(
      changeSpace.fulfilled,
      (state, action: PayloadAction<GameSpace>) => {
        state.activeSpace = action.payload;
      }
    );
  },
});

export const actions = { ...configSlice.actions, changeSpace };

export default configSlice.reducer;
