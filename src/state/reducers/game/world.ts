import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from '../../../config';
import _ from 'lodash';
import numberValueModify from '../../../state/reducers/common/numberValueModify';

const slice = createSlice({
  name: 'world',
  initialState: {
    seenAll: false,
    mask: [] as boolean[][],
    map: [] as any[][],
    enableShip: false,
    ship: [0, 0],
    dir: '',
    sulphurmine: false,
    ironmine: false,
    coalmine: false,
    water: 0,
    danger: false,
    foodMove: 0,
    waterMove: 0,
    starvation: false,
    thirst: false,
    usedOutposts: {} as { [key: string]: boolean },
    curPos: _.cloneDeep(config.World.VILLAGE_POS),
    health: 0,
    dead: false,
    fightMove: 0,
    outfit: {} as { [key: string]: number },
    stunned: 0
  },
  reducers: {
    ...numberValueModify,
    seeAll(state, action: PayloadAction<boolean>) {
      state.seenAll = action.payload;
    },
    visit(state, action: PayloadAction<{ x: number; y: number }>) {
      const { x, y } = action.payload;
      state.map[x][y] = state.map[x][y].replace('!') + '!';
    },
    useOutpost(state) {
      state.usedOutposts[state.curPos[0] + ',' + state.curPos[1]] = true;
    },
    setMap(state, action: PayloadAction<{ pos: number[]; value: any }>) {
      const { pos, value } = action.payload;
      state.map[pos[0]][pos[1]] = value;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
