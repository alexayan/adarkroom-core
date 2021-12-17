import { GameSpace } from '../../type';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GameState } from '../index';
import config from '../../config';

export type Notification = {
  text: string;
  module?: string;
  _module?: string;
};

const notify = createAsyncThunk(
  'notifications/notify',
  async (data: { message: Notification; noQueue?: boolean }, { getState }) => {
    const appState = getState() as GameState;
    let { text, module } = data.message;
    if (text.slice(-1) != '.') {
      text += '.';
    }
    if (module && appState.engine.activeSpace != module) {
      if (!data.noQueue) {
        return data.message;
      }
    } else {
      return {
        ...data.message,
        _module: data.message.module,
        module: 'global',
      };
    }
    return null;
  }
);

const storesSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifyQueue: {
      global: []
    } as { [key: string]: Notification[] },
  },
  reducers: {
    spaceNotify(state, action: PayloadAction<GameSpace>) {
      const queue = state.notifyQueue[action.payload] || [];
      state.notifyQueue[action.payload] = [];
      queue.forEach(message => {
        message._module = message.module;
        message.module = 'global';
      });
      state.notifyQueue['global'] = [...state.notifyQueue['global'], ...queue].slice(-config.Engine.MAX_MESSAGE_COUNT);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      notify.fulfilled,
      (state, action: PayloadAction<Notification | null>) => {
        const message = action.payload;
        if (message) {
          let module = message.module || 'global';
          if (!state.notifyQueue[module]) {
            state.notifyQueue[module] = [];
          }
          state.notifyQueue[module].push(message);
        }
      }
    );
  },
});

export const actions = { ...storesSlice.actions, notify };

export default storesSlice.reducer;
