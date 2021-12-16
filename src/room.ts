import Engine from './engine';
import { StoreCategory, Building, GameSpace, FireStatus } from './type';
import config, { CraftableCategory } from './config';
import _ from 'lodash';
import GameModule from './module';
import './operations/room';
import translate from './translate';
import {needsWorkshop} from './tools/room';

export default class Room extends GameModule {
  _fireTimer: any = null;
  _tempTimer: any = null;
  _builderTimer: any = null;
  constructor(engine: Engine) {
    super(engine);
    const state = engine.getState();
    if (!state.features.location.Room) {
      engine.dispatch(engine.actions.features.location.enableRoom());
      engine.dispatch(
        engine.actions.game.builder.setM({
          level: -1,
        })
      );
    }

    this._fireTimer = engine.setTimeout(
      this.coolFire.bind(this),
      config.Room.FIRE_COOL_DELAY
    );
    this._tempTimer = engine.setTimeout(
      this.adjustTemp.bind(this),
      config.Room.ROOM_WARM_DELAY
    );
    const builderLevel = state.game.builder.level;
    if (builderLevel >= 0 && builderLevel < 3) {
      this._builderTimer = engine.setTimeout(
        this.updateBuilderState.bind(this),
        config.Room.BUILDER_STATE_DELAY
      );
    }
    if (builderLevel == 1 && typeof state.stores.wood === 'undefined') {
      this.engine.setTimeout(this.unlockForest.bind(this), config.Room.NEED_WOOD_DELAY);
    }

    this.engine.observer(
      state => {
        return {
          wood: state.stores.wood,
          meat: state.stores.meat,
          fur: state.stores.fur,
          thieves: state.game.thieves,
          enableWorld: state.features.location.World,
        };
      },
      state => {
        if (!state.thieves && state.enableWorld) {
          if (
            (state.wood || 0) > 5000 ||
            (state.meat || 0) > 5000 ||
            (state.fur || 0) > 5000
          ) {
            this.startThieves();
          }
        }
      }
    );
  }

  coolFire() {
    const appState = this.engine.getState();
    const wood = appState.stores.wood;
    let currentFireStatus = appState.game.fire.status;
    const builderLevel = appState.game.builder.level;
    if (
      currentFireStatus.value <= config.Room.FireStatus.Flickering.value &&
      builderLevel > 3 &&
      !!wood
    ) {
      this.engine.notify(translate('builder stokes the fire'), GameSpace.Room, true);
      this.engine.dispatch(
        this.engine.actions.stores.addM({
          wood: -1,
        })
      );
      currentFireStatus =
        config.Room.FireStatus[
          _.findKey(config.Room.FireStatus, fire => {
            return fire.value === currentFireStatus.value + 1;
          }) as keyof typeof config.Room.FireStatus
        ];
    }
    if (currentFireStatus.value > 0) {
      currentFireStatus =
        config.Room.FireStatus[
          _.findKey(config.Room.FireStatus, fire => {
            return fire.value === currentFireStatus.value - 1;
          }) as keyof typeof config.Room.FireStatus
        ];
      this.engine.dispatch(
        this.engine.actions.game.fire.changeFire(currentFireStatus)
      );
      this.onFireChange(currentFireStatus);
    }
  }


  onArrival() {
    const state = this.engine.getState();
    if (state.room.changed) {
      /* i18n-extract the fire is {fireStatus} */
      /* i18n-extract the room is {roomStatus} */
      this.engine.notify(`the fire is ${state.game.fire.status.text}`);
      this.engine.notify(`the room is ${state.game.temperature.status.text}`);
      this.engine.dispatch(this.engine.actions.room.setChanged(false));
    }
    if (state.game.builder.level === 3) {
      this.engine.dispatch(
        this.engine.actions.game.builder.addM({
          level: 1,
        })
      );
      this.engine.setIncome('builder', {
        delay: 10,
        stores: { wood: 2 },
      });
      this.engine.notify(
        translate('the stranger is standing by the fire. she says she can help. says she builds things.'),
        GameSpace.Room
      );
    }
  }

  canTrade(thing: Building | StoreCategory) {
    const state = this.engine.getState();
    if (state.room.crafts[thing]) {
      return true;
    } else if (state.game.buildings.trading_post > 0) {
      if (
        thing === StoreCategory.compass ||
        typeof state.stores[thing as StoreCategory] !== 'undefined'
      ) {
        return true;
      }
    }
    return false;
  }

  buyUnlocked(thing: Building | StoreCategory) {
    const state = this.engine.getState();
    if (state.room.buys[thing]) {
      return true;
    } else if (!!state.game.buildings.trading_post) {
      if (
        thing === StoreCategory.compass ||
        typeof state.stores[thing as StoreCategory] !== 'undefined'
      ) {
        return true;
      }
    }
    return false;
  }

  clean() {
    clearTimeout(this._fireTimer)
    clearTimeout(this._tempTimer)
    clearTimeout(this._builderTimer)
    super.clean();
  }

  craftUnlocked(thing: CraftableCategory) {
    const state = this.engine.getState();
    if (state.room.crafts[thing]) {
      return true;
    }
    if (state.game.builder.level < 4) {
      return false;
    }
    const craftable = config.items[thing];

    if (!craftable.craft) {
      return false;
    }

    if (
      needsWorkshop(craftable.type) &&
      state.game.buildings.workshop === 0
    ) {
      return false;
    }

    const cost = craftable.craft.cost(state);

    if (state.game.buildings[(thing as any) as Building] > 0) {
      this.engine.dispatch(
        this.engine.actions.room.addCraft({
          name: thing
        })
      );
      return true;
    }

    if (cost.wood && (state.stores.wood || 0) < cost.wood * 0.5) {
      return false;
    }

    for (var c in cost) {
      if (!state.stores[c as StoreCategory]) {
        return false;
      }
    }

    this.engine.dispatch(
      this.engine.actions.room.addCraft({
        name: thing,
      })
    );

    if (
      craftable.craft.availableMsg &&
      !state.game.buildings[(thing as any) as Building]
    ) {
      this.engine.notify(craftable.craft.availableMsg, GameSpace.Room);
    }

    return true;
  }

  adjustTemp() {
    const state = this.engine.getState();
    const old = state.game.temperature.status;
    let temperature = old;
    const fireStatus = state.game.fire.status;
    if (old.value > 0 && old.value > fireStatus.value) {
      temperature =
        config.Room.TemperatureStatus[
          _.findKey(config.Room.TemperatureStatus, temp => {
            return temp.value === temperature.value - 1;
          }) as keyof typeof config.Room.TemperatureStatus
        ];
      this.engine.notify(
        `the room is ${temperature.text}`,
        GameSpace.Room,
        true
      );
    }
    if (temperature.value < 4 && temperature.value < fireStatus.value) {
      temperature =
        config.Room.TemperatureStatus[
          _.findKey(config.Room.TemperatureStatus, temp => {
            return temp.value === temperature.value + 1;
          }) as keyof typeof config.Room.TemperatureStatus
        ];
      this.engine.notify(
        `the room is ${temperature.text}`,
        GameSpace.Room,
        true
      );
    }
    if (temperature.value != old.value) {
      this.engine.dispatch(this.engine.actions.room.setChanged(true));
      this.engine.dispatch(
        this.engine.actions.game.temperature.change(temperature)
      );
    }
    this._tempTimer = this.engine.setTimeout(
      this.adjustTemp.bind(this),
      config.Room.ROOM_WARM_DELAY
    );
  }

  onFireChange(fireStatus: FireStatus) {
    const appState = this.engine.getState();
    if (appState.engine.activeSpace !== GameSpace.Room) {
      this.engine.dispatch(this.engine.actions.room.setChanged(true));
    }
    this.engine.notify(`the fire is ${fireStatus.text}`, GameSpace.Room, true);
    const builderLevel = appState.game.builder.level;
    if (
      fireStatus.value > config.Room.FireStatus.Smoldering.value &&
      builderLevel < 0
    ) {
      this.engine.dispatch(
        this.engine.actions.game.builder.setM({
          level: 0,
        })
      );
      this.engine.notify(
        translate('the light from the fire spills from the windows, out into the dark'),
        GameSpace.Room
      );
      this.engine.setTimeout(
        this.updateBuilderState.bind(this),
        config.Room.BUILDER_STATE_DELAY
      );
    }
    clearTimeout(this._fireTimer);
    this._fireTimer = this.engine.setTimeout(
      this.coolFire.bind(this),
      config.Room.FIRE_COOL_DELAY
    );
  }

  updateBuilderState() {
    if (!this.engine) {
      return;
    }
    const state = this.engine.getState();
    let lBuilder = state.game.builder.level;
    if (lBuilder === 0) {
      this.engine.notify(
        translate('a ragged stranger stumbles through the door and collapses in the corner'),
        GameSpace.Room
      );
      lBuilder = 1;
      this.engine.dispatch(
        this.engine.actions.game.builder.setM({
          level: 1,
        })
      );
      this.engine.setTimeout(this.unlockForest.bind(this), config.Room.NEED_WOOD_DELAY);
    } else if (
      lBuilder < 3 &&
      state.game.temperature.status.value >=
        config.Room.TemperatureStatus.Warm.value
    ) {
      let msg = '';
      switch (lBuilder) {
        case 1:
          msg =
            translate('the stranger shivers, and mumbles quietly. her words are unintelligible.');
          break;
        case 2:
          msg =
            translate('the stranger in the corner stops shivering. her breathing calms.');
          break;
      }
      this.engine.notify(msg, GameSpace.Room);
      if (lBuilder < 3) {
        lBuilder += 1;
        this.engine.dispatch(
          this.engine.actions.game.builder.setM({
            level: lBuilder,
          })
        );
      }
    }
    if (lBuilder < 3) {
      this.engine.setTimeout(
        this.updateBuilderState.bind(this),
        config.Room.BUILDER_STATE_DELAY
      );
    }
  }

  unlockForest() {
    this.engine.dispatch(
      this.engine.actions.stores.setM({
        wood: 4,
      })
    );
    this.engine.dispatch(this.engine.actions.features.location.enableOutside());
    this.engine.notify(translate('the wind howls outside'), GameSpace.Room);
    this.engine.notify(translate('the wood is running out'), GameSpace.Room);
  }

  startThieves() {
    this.engine.dispatch(this.engine.actions.game.thieves.change(1));
    this.engine.setIncome('thieves', {
      delay: 10,
      stores: {
        wood: -10,
        fur: -5,
        meat: -5,
      },
    });
  }
}
