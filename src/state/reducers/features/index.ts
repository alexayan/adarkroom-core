import { combineReducers } from '@reduxjs/toolkit';
import location, { actions as locationActions } from './location';

export default combineReducers({
  location,
});

export const actions = {
  location: locationActions,
};
