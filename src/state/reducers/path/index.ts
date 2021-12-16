import { combineReducers } from '@reduxjs/toolkit';
import outfit, { actions as outfitActions } from './outfit';

export default combineReducers({
  outfit,
});

export const actions = {
  outfit: outfitActions,
};
