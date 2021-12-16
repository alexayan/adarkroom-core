import { reducer } from './reducers';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import Engine from '../engine';

const moddles: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  moddles.push(logger);
}

function createState(engine: Engine, state?: GameState) {
  const store = configureStore({
    reducer,
    preloadedState: state,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            engine,
          },
        },
      }).concat(moddles),
  });

  return store;
}

export type Store = ReturnType<typeof createState>;
export type GameState = ReturnType<typeof reducer>;
export { actions } from './reducers';

export default createState;
