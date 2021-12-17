import { Event, Scene, StoreCategory, CombatLootItem, GameSpace } from '../type';
import GlobalEvents from './global';
import RoomEvents from './room';
import OutsideEvents from './outside';
import MarketEvents from './marketing';
import logger from '../logger';
import Engine from '../engine';
import _ from 'lodash';
import config from '../config';
import setpieces from './setpieces';
import encounters from './encounters';
import GameModule from '../module';
import '../operations/combat';
import '../operations/events';

export default class Events extends GameModule {
  eventPool: {[key: string]: Event[]};
  eventMap: {
    Global: typeof GlobalEvents,
    Room: typeof RoomEvents,
    Outside: typeof OutsideEvents,
    Market: typeof MarketEvents
  };
  private _enemyAttackTimer: any = null;
  constructor(engine: Engine) {
    super(engine)
    this.eventPool = {
      Global: GlobalEvents,
      Room: RoomEvents,
      Outside: OutsideEvents,
      World: Object.values(setpieces),
      Fight: encounters,
      Ship: []
    };
    this.eventMap = {
      Global: GlobalEvents,
      Room: RoomEvents,
      Outside: OutsideEvents,
      Market: MarketEvents,
    };

    this.scheduleNextEvent();
    this.initDelay();
  }


  winFight() {
    clearInterval(this._enemyAttackTimer);
    this.engine.dispatch(this.engine.actions.events.winFight());
  }

  getHitChance() {
    const state = this.engine.getState();
    if(state.character.perks.precise) {
			return config.World.BASE_HIT_CHANCE + 0.1;
		}
		return config.World.BASE_HIT_CHANCE;
  }

  async doHeal(cost: StoreCategory, heal: number) {
    const state = this.engine.getState();
    if (!!state.game.world.outfit[cost]) {
      const changed = {
        [`outfit.${cost}`]: (state.path.outfit[cost] || 0) - 1
      } as any;
      let hp = state.game.world.health + heal;
			hp = Math.min(this.engine.spaces.World.getMaxHealth(), hp);
      changed.health = hp;
      await this.engine.dispatch(this.engine.actions.game.world.setM(changed))
      return true;
    } else {
      this.engine.notify(`not enough ${cost}`)
      return false;
    }
  }

  getCurrentSpaceEventsPool() {
    const space = this.engine.getState().engine.activeSpace;
    if (space === GameSpace.World) {
      return ([] as Event[]).concat(this.eventPool.World, this.eventPool.Fight);
    } else if (space === GameSpace.Ship) {
      return ([] as Event[]).concat(this.eventPool.Ship, this.eventPool.Global);
    } else {
      return ([] as Event[]).concat(this.eventPool.Global, this.eventPool[space as string] || []);
    }
  }

  triggerEvent() {
    const space = this.engine.getState().engine.activeSpace;
    if (space !== GameSpace.World && this.getActiveEvent() === null) {
      const pool = this.getCurrentSpaceEventsPool();
      var possibleEvents = [];
      for (let i in pool) {
        const event = pool[i];
        if (
          event.isAvailable &&
          event.isAvailable(this.engine.store!.getState(), this.engine)
        ) {
          possibleEvents.push(event);
        }
      }

      if (possibleEvents.length === 0) {
        this.scheduleNextEvent(0.5);
        return;
      } else {
        const r = Math.floor(Math.random() * possibleEvents.length);
        this.startEvent(possibleEvents[r]);
      }
    }

    this.scheduleNextEvent();
  }

  async startEvent(event: Event) {
    if (!event) {
      return;
    }
    const pool = this.getCurrentSpaceEventsPool();
    let eventIndex = pool.indexOf(event);
    if (eventIndex === -1) {
      eventIndex = pool.findIndex((e) => {
        return e.id === event.id && typeof e.id !== 'undefined';
      })
    }
    const eventTitle = eventIndex > -1 ? pool[eventIndex].title : '';
    if (eventTitle) {
      await this.engine.dispatch(this.engine.actions.events.push(eventTitle))
      await this.loadScene('start');
    }
  }

  async loadScene(sceneName: string) {
    const state = this.engine.getState();
    const eventTitle = state.events.eventStack[0];
    const pool = this.getCurrentSpaceEventsPool();
    const event = pool.find((evt) => {
      return evt.title === eventTitle
    });
    if (!event) {
      sceneName = 'end'
    }

    await this.engine.dispatch(this.engine.actions.events.cleanEnemys())

    this.engine.dispatch(this.engine.actions.events.setM({
      activeScene: sceneName,
      loot: {}
    }));

    const scene = event?.scenes[sceneName];

    if (!scene) {
      return;
    }

    if (scene.onLoad) {
      scene.onLoad(this.engine);
    }

    if (scene.notification) {
      this.engine.notify(scene.notification);
    }

    if (scene.reward) {
      this.engine.dispatch(this.engine.actions.stores.addM(scene.reward));
    }

    if (scene.combat) {
      this.startCombat(scene);
    } else {
      this.startStory(scene);
    }
  }
  
  addEvent(space: string, event: Event) {
    const events = this.eventPool[space];
    const exist = events.find((e) => {
      return e.id === event.id;
    })
    if (!exist) {
      this.eventPool[space].push(event);
    }
  }

  startCombat(scene: Scene) {
    this.setRandomLoots(scene.loot);
    this.engine.dispatch(this.engine.actions.events.setSceneEnemy(scene));
    clearInterval(this._enemyAttackTimer);
    this._enemyAttackTimer = this.engine.setInterval(this.enemyAttack.bind(this), scene.attackDelay * 1000);
  }

  startStory(scene: Scene) {
    this.setRandomLoots(scene.loot);
  }

  async enemyAttack() {
    const event = this.getActiveEvent();
    if (!event) {
      return;
    }
    const state = this.engine.getState();
    const scene = event.scenes[state.events.activeScene];
    if (!scene) {
      return;
    }
    for (let i = 0, len = state.events.enemys.length; i < len; i++) {
      const enemy = state.events.enemys[i];
      if (!enemy.stunned) {
        let toHit = scene.hit;
        toHit *= state.character.perks.evasive ? 0.8 : 1;
        let dmg = -1;
        if(Math.random() <= toHit) {
          dmg = scene.damage;
        }
        await this.damageAdventurer(enemy, dmg);
      }
    }
    const newState = this.engine.getState();
    if (newState.game.world.health <= 0) {
      clearInterval(this._enemyAttackTimer);
      this.endEvent();
      this.engine.spaces.World.die();
    }
  }

  async damageEnemy(dmg: any, weapon: any) {
    const state = this.engine.getState();
    let hp = state.events.enemys[0].health;
    if(typeof dmg === 'number') {
			if(dmg < 0) {
				dmg = 0;
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'miss',
          target: 'enemy',
          meta: {
            weapon
          }
        }))
			} else {
				hp = ((hp - dmg) < 0) ? 0 : (hp - dmg);
        this.engine.dispatch(this.engine.actions.events.setM({
          'enemys[0].health': hp
        }))
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'damage',
          target: 'enemy',
          meta: {
            dmg,
            weapon
          }
        }))
			}
		} else {
			if(dmg == 'stun') {
        this.engine.dispatch(this.engine.actions.events.setM({
          'enemys[0].stunned': Date.now() + config.Event.STUN_DURATION
        }))
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'stunned',
          target: 'enemy',
          meta: {
            weapon
          }
        }))
			}
		}
  }

  damageAdventurer(_: any, dmg: any) {
    const state = this.engine.getState();
    let hp = state.game.world.health;
    if(typeof dmg === 'number') {
			if(dmg < 0) {
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'miss',
          target: 'player'
        }))
				dmg = 0;
			} else {
				hp = ((hp - dmg) < 0) ? 0 : (hp - dmg);
        this.engine.spaces.World.setHp(hp);
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'damage',
          target: 'player',
          meta: {
            dmg
          }
        }))
			}
		} else {
			if(dmg == 'stun') {
        this.engine.dispatch(this.engine.actions.game.world.setM({
          stunned: Date.now() + config.Event.STUN_DURATION
        }))
        this.engine.dispatch(this.engine.actions.events.logFight({
          time: Date.now(),
          type: 'stunned',
          target: 'player'
        }))
			}
		}
  }

  setRandomLoots(lootList?: { [key in StoreCategory]?: CombatLootItem}) {
    const randomLoot = {} as any;
    lootList = lootList || {};
    for(let k in lootList) {
			const loot = lootList[k as StoreCategory]!;
			if(Math.random() < loot.chance) {
				const num = Math.floor(Math.random() * (loot.max - loot.min)) + loot.min;
        randomLoot[k] = num;
			}
		}
    this.engine.dispatch(this.engine.actions.events.setM({
      loot: randomLoot
    }))
  }

  triggerFight() {
    const possibleFights = [];
    const state = this.engine.getState();
    for (var i in this.eventPool.Fight) {
      const fight = this.eventPool.Fight[i];
      if (fight.isAvailable && fight.isAvailable(state, this.engine)) {
        possibleFights.push(fight);
      }
    }

    const r = Math.floor(Math.random() * possibleFights.length);
    this.startEvent(possibleFights[r]);
  }

  scheduleNextEvent(scale?: number) {
    let nextEvent =
      Math.floor(
        Math.random() *
        (config.Event.EVENT_TIME_RANGE[1] - config.Event.EVENT_TIME_RANGE[0])
      ) + config.Event.EVENT_TIME_RANGE[0];
    if (scale && scale > 0) {
      nextEvent *= scale;
    }
    logger('next event scheduled in ' + nextEvent + ' minutes');
    this.engine.setTimeout(this.triggerEvent.bind(this), nextEvent * 60 * 1000);
  }

  saveDelay(
    action: (engine: Engine) => any,
    stateName: string,
    delay?: number
  ) {
    if (delay) {
      this.engine.store?.dispatch(
        this.engine.actions.delay.setM({
          [stateName]: delay,
        })
      );
    } else {
      delay = this.engine.store?.getState().delay[stateName] || 0;
    }
    const interval = this.engine.setInterval(() => {
      this.engine.store?.dispatch(
        this.engine.actions.delay.setM({
          [stateName]:
            (this.engine.store?.getState().delay[stateName] || 0) - 0.5,
        })
      );
    }, 500);
    this.engine.setTimeout(async () => {
      interval && clearInterval(interval);
      await this.engine.store?.dispatch(
        this.engine.actions.delay.setM({
          [stateName]: undefined,
        })
      );
      await this.engine.store?.dispatch(
        this.engine.actions.delay.removeM([stateName])
      );
      this.engine.store?.dispatch(this.engine.actions.delay.clean());
      action(this.engine);
    }, (delay || 0) * 1000);
  }

  clean() {
    clearInterval(this._enemyAttackTimer)
    super.clean();
  }

  recallDelay(stateName: string, target: any) {
    const state = _.get(this.engine.store?.getState().events, stateName);
    for (let i in state) {
      if (_.isObject(state[i])) {
        this.recallDelay(stateName + '["' + i + '"]', target[i]);
      } else {
        if (typeof target[i] == 'function') {
          target[i](this.engine);
        }
      }
    }
  }

  initDelay() {
    const state = this.engine.store?.getState().delay;
    for (let i in state) {
      if (_.isObject(state[i])) {
        this.recallDelay(i, (this.eventMap as any)[i]);
      }
    }
  }

  getActiveScene() {
    const state = this.engine.getState();
    const event = this.getActiveEvent();
    if (!event) {
      return null;
    }
    return event.scenes[state.events.activeScene] || null;
  }

  getActiveEvent() {
    const state = this.engine.getState();
    if (state.events.eventStack.length > 0) {
      let pool = this.getCurrentSpaceEventsPool();
      return pool.find((evt) => {
        return evt.title === state.events.eventStack[0]
      }) || null
    }
    return null;
  }

  endEvent() {
    this.engine.dispatch(this.engine.actions.events.end({}))
  }
}
