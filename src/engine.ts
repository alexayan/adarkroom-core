import translate from './translate';
import { GameSpace, StoreCategory } from './type';
import createState, { GameState, Store, actions } from './state';
import logger, {config as configLogger} from './logger';
import Events from './events';
import World from './world';
import Room from './room';
import Path from './path';
import Ship from './ship';
import Space from './space';
import Outside from './outside';
import _ from 'lodash';
import Prestige from './prestige';
import {OperationExecutor, operationManager} from './operations';
import './operations/engine';

export type EngineOptions = {
  state?: GameState,
  debug?: boolean;
  doubleTime?: boolean;
};

class Engine {
  GAME_OVER = false;
  options: EngineOptions = {
    debug: false,
    doubleTime: false,
  };
  actions = actions;
  store?: Store;
  spaces!: {
    [GameSpace.World]: World;
    [GameSpace.Room]: Room;
    [GameSpace.Outside]: Outside;
    [GameSpace.Path]: Path;
    [GameSpace.Ship]: Ship;
    [GameSpace.Space]: Space;
  };
  events!: Events;
  prestige!: Prestige;
  operationExecutor: OperationExecutor;
  paused = false;
  constructor(options?: EngineOptions) {
    Object.assign(this.options, options || {});
    configLogger({
      enable: this.options.debug
    });
    this.operationExecutor = new OperationExecutor(this, operationManager);
    this.startGame(options?.state);
  }

  notify(text: string, space?: GameSpace, noQueue?: boolean) {
    this.store?.dispatch(
      this.actions.notifications.notify({
        message: {
          text: translate(text),
          module: space,
        },
        noQueue,
      })
    );
  }

  async dispatch(action: any) {
    const res = await this.store!.dispatch(action);
    return res;
  }

  async operation(operationId: string, data: any) {
    return await this.operationExecutor.exec(operationId, data);
  }

  operations() {
    return this.operationExecutor.availableOperations()
  }

  startGame(state?: GameState) {
    // this.clean();
    this.GAME_OVER = false;
    this.paused = false;
    this.loadGame(state);
    this.events = new Events(this);
    this.spaces = {
      [GameSpace.World]: new World(this),
      [GameSpace.Room]: new Room(this),
      [GameSpace.Outside]: new Outside(this),
      [GameSpace.Path]: new Path(this),
      [GameSpace.Ship]: new Ship(this),
      [GameSpace.Space]: new Space(this),
    };
    this.prestige = new Prestige(this);
    this._incomeTimeout = this.setTimeout(this.collectIncome.bind(this), 1000);
    const gameState = this.getState();
    if (!gameState?.engine.activeSpace) {
      this.travelTo(GameSpace.Room, true)
    } else {
      this.travelTo(gameState?.engine.activeSpace, true)
    }
  }

  clean() {
    if (!this.events) {
      return;
    }
    clearTimeout(this._incomeTimeout);
    this.events.clean();
    Object.keys(this.spaces).forEach((space) => {
      this.spaces[space as GameSpace].clean()
    })
    this.prestige.clean();
  }

  endGame() {
    if (this.GAME_OVER) {
      return;
    }
    this.GAME_OVER = true;
    this.clean()
  }

  addToStore(toAdd: { [key in StoreCategory]?: number }) {
    this.dispatch(this.actions.stores.addM(toAdd));
  }

  setToStore(toSet: { [key in StoreCategory]?: number }) {
    this.dispatch(this.actions.stores.setM(toSet));
  }

  observer<T>(select: (state: GameState) => T, onChange: (arg0: T) => any) {
    let currentState: T;

    const store = this.store;

    function handleChange() {
      let nextState = select(store!.getState());
      if (!_.isEqual(nextState, currentState)) {
        currentState = nextState;
        onChange(currentState);
      }
    }

    let unsubscribe = store!.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  }

  getIncome(source: string) {
    const state = this.getState();
    return _.get(state.income, source, {});
  }

  setIncome(source: string, options: any) {
    const state = this.getState();
    const exist = _.get(state.income, source);
    if (exist) {
      options.timeLeft = exist.timeLeft;
    }
    this.dispatch(
      this.actions.income.setM({
        [source]: options,
      })
    );
  }

  pauseGame() {
    this.paused = true;
    this.clean();
  }

  continueGame() {
    this.paused = false;
    this.startGame(this.store?.getState())
  }

  saveGame() {}

  getActionSpace() {
    return this.store?.getState().engine.activeSpace;
  }

  getState() {
    return this.store!.getState();
  }

  switchLanguage() {}

  async travelTo(space: GameSpace, force?: boolean) {
    const activeSpace = this.getActionSpace();
    if (activeSpace !== space || force) {
      await this.travelToSubSpace('');
      await this.store?.dispatch(this.actions.engine.changeSpace(space));
      this.spaces[space].onArrival();
    }
  }

  async travelToSubSpace(space: string) {
    /* i18n-extract visit {place} */
    await this.store?.dispatch(this.actions.engine.changeSubSpace(space));
  }

  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  setTimeout(callback: () => any, timeout: number, skipDouble?: boolean) {
    if (this.options.doubleTime && !skipDouble) {
      logger('Double time, cutting timeout in half');
      timeout /= 2;
    }

    return setTimeout(callback, timeout);
  }

  setInterval(callback: () => any, interval: number, skipDouble?: boolean) {
    if (this.options.doubleTime && !skipDouble) {
      logger('Double time, cutting timeout in half');
      interval /= 2;
    }
    return setInterval(callback, interval);
  }

  loadGame(state?: GameState) {
    this.store = createState(this, state);
  }

  _incomeTimeout: any = null;

  collectIncome() {
    let changed = false;
    const incomeStores = [];
    const state = _.cloneDeep(this.getState());
    if (state.engine.activeSpace !== GameSpace.Space) {
      for (let source in state.income) {
        const income = state.income[source as keyof typeof state.income];
        if (!income) {
          continue;
        }
        if (typeof income.timeLeft !== 'number') {
          income.timeLeft = 0;
        }
        income.timeLeft--;

        if (income.timeLeft <= 0) {
          logger('collection income from ' + source);
          if (source === 'thieves') {
            this.addStolen(income.stores);
          }

          const cost = income.stores;
          let ok = true;
          if (source !== 'thieves') {
            for (var k in cost) {
              let have = state.stores[k as StoreCategory] || 0;
              if (have + cost[k as StoreCategory] < 0) {
                ok = false;
                break;
              }
            }
          }

          if (ok) {
            incomeStores.push(income.stores);
          }
          changed = true;
          if (typeof income.delay == 'number') {
            income.timeLeft = income.delay;
          }
        }
      }
    }
    if (changed) {
      const addStores: any = {};
      incomeStores.forEach(store => {
        Object.keys(store).forEach(key => {
          const addCount = addStores[key] || 0 + store[key as StoreCategory] || 0;
          if (addCount) {
            addStores[key] = addStores[key] || 0 + store[key as StoreCategory] || 0;
          }
        });
      });
      this.dispatch(this.actions.stores.addM(addStores));
    }
    this.dispatch(this.actions.income.setM(state.income));
    this._incomeTimeout = this.setTimeout(this.collectIncome.bind(this), 1000);
  }

  addStolen(stores: any) {
    const state = this.getState();
    let addStores: any = {};
    for (let k in stores) {
      let old = state.stores[k as StoreCategory] || 0;
      let short = old + stores[k];
      //if they would steal more than actually owned
      if (short < 0) {
        addStores[k] = stores[k] * -1 + short;
      } else {
        addStores[k] = stores[k] * -1;
      }
    }
    this.dispatch(this.actions.game.stolen.addM(addStores));
  }
}

export default Engine;
