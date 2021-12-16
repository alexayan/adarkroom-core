import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scene } from '../../type';
import numberValueModify from './common/numberValueModify';
import uuid from '../../tools/uuid';

const storesSlice = createSlice({
  name: 'events',
  initialState: {
    eventStack: [],
    activeScene: '',
    delay: {},
    loot: {},
    enemys: [],
    won: false,
    fightEvents: []
  } as {
    [key: string]: any;
    eventStack: string[];
    activeScene: string;
    delay: { [key: string]: number };
    loot: { [key: string]: number };
    enemys: {
      chara: string,
      health: number,
      maxHealth: number,
      stunned: number
    }[],
    won: boolean,
    fightEvents: {time: number, target: string, type: string, meta?: any, id?: string}[]
  },
  reducers: {
    ...numberValueModify,
    end(state, _) {
      state.eventStack.shift();
      state.activeScene = '';
      state.enemys = [];
      state.won = false;
      state.fightEvents = []
    },
    cleanEnemys(state) {
      state.enemys = [];
      state.won = false;
      state.fightEvents = []
    },
    logFight(state, action: PayloadAction<{time: number, target: string, type: string, meta?: any, id?: string}>) {
      if (!state.fightEvents) {
        state.fightEvents = [];
      }
      state.fightEvents.push({
        ...action.payload,
        id: uuid()
      });
    },
    push(state, action) {
      state.eventStack.unshift(action.payload);
    },
    setSceneEnemy(state, action: PayloadAction<Scene>) {
      const scene = action.payload;
      state.enemys = [{
        chara: scene.chara,
        health: scene.health,
        maxHealth: scene.health,
        stunned: 0
      }]
      state.fightEvents = []
      state.won = false;
    },
    winFight(state) {
      state.won = true;
    }
  }
});

export const actions = { ...storesSlice.actions };

export default storesSlice.reducer;
