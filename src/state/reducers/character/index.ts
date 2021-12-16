import { combineReducers } from '@reduxjs/toolkit';
import perks, { actions as perksActions } from './perks';
import statistics, { actions as statisticsActions } from './statistics';

export default combineReducers({
  perks,
  statistics,
});

export const actions = {
  perks: perksActions,
  statistics: statisticsActions,
};
