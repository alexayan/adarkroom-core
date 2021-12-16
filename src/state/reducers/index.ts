import { combineReducers } from '@reduxjs/toolkit';
import marketing, { actions as marketingActions } from './marketing';
import config, { actions as configActions } from './config';
import features, { actions as featuresActions } from './features';
import stores, { actions as StoreActions } from './stores';
import game, { actions as gameActions } from './game';
import engine, { actions as engineActions } from './engine';
import income, { actions as incomeActions } from './income';
import character, { actions as characterActions } from './character';
import events, { actions as eventActions } from './events';
import notifications, { actions as notificationActions } from './notifications';
import previous, { actions as previousActions } from './previous';
import room, { actions as roomActions } from './room';
import path, { actions as pathActions } from './path';
import delay, { actions as delayActions } from './delay';
import operation, {actions as operationActions} from './operation';

export const reducer = combineReducers({
  room,
  marketing,
  config,
  features,
  stores,
  game,
  engine,
  income,
  character,
  events,
  notifications,
  previous,
  path,
  delay,
  operation
});

export const actions = {
  config: configActions,
  stores: StoreActions,
  game: gameActions,
  engine: engineActions,
  income: incomeActions,
  character: characterActions,
  marketing: marketingActions,
  events: eventActions,
  notifications: notificationActions,
  previous: previousActions,
  features: featuresActions,
  room: roomActions,
  path: pathActions,
  delay: delayActions,
  operation: operationActions
};
