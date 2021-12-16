import Engine from './engine';
import config from './config';
import _ from 'lodash';
import logger from './logger';
import { GameSpace, StoreCategory, WorkerType, Building } from './type';
import GameModule from './module';
import './operations/outside';
import translate from './translate';
import { Unsubscribe } from '@reduxjs/toolkit';
export default class Outside extends GameModule {
  _popTimeout: any = null;
  unsubBuilding: Unsubscribe = () => { };

  constructor(engine: Engine) {
    super(engine);
    this.updateVillageIncome();
    this.schedulePopIncrease();
    this.unsubBuilding = engine.observer((state) => {
      return state.game.buildings;
    }, () => {
      this.enableBuildingWorker();
    })
  }

  onArrival() {
    const state = this.engine.getState();
    if (!state.game.outside.seenForest) {
      this.engine.notify(
        translate('the sky is grey and the wind blows relentlessly'),
        GameSpace.Outside
      );
      this.engine.dispatch(
        this.engine.actions.game.outside.setM({
          seenForest: true,
        })
      );
    }
  }

  increaseWorker(worker: WorkerType, count: number) {
    const gatherCount = this.getNumGatherers();
    if (gatherCount > 0) {
      const increaseAmt = Math.min(gatherCount, count);
      logger('increasing ' + worker + ' by ' + increaseAmt);
      this.engine.dispatch(
        this.engine.actions.game.workers.addM({
          [worker]: increaseAmt,
        })
      );
    }
  }

  getTitle() {
		const numHuts = this.engine.getState().game.buildings.hut || 0;
		let title;
		if(numHuts === 0) {
			title = translate("A Silent Forest");
		} else if(numHuts == 1) {
			title = translate("A Lonely Hut");
		} else if(numHuts <= 4) {
			title = translate("A Tiny Village");
		} else if(numHuts <= 8) {
			title = translate("A Modest Village");
		} else if(numHuts <= 14) {
			title = translate("A Large Village");
		} else {
			title = translate("A Raucous Village");
		}
    return title;
	}

  decreaseWorker(worker: WorkerType, count: number) {
    const state = this.engine.getState();
    const existCount = state.game.workers[worker] || 0;
    if (existCount > 0) {
      const decreaseAmt = Math.min(existCount, count);
      logger('decreasing ' + worker + ' by ' + decreaseAmt);
      this.engine.dispatch(
        this.engine.actions.game.workers.addM({
          [worker]: decreaseAmt * -1,
        })
      );
    }
  }

  clean() {
    clearTimeout(this._popTimeout)
    this.unsubBuilding();
    super.clean();
  }

  async destroyHuts(count: number, allowEmpty?: boolean) {
    const state = this.engine.getState();
    let dead = 0;
    let lastHut = state.game.buildings.hut;
    let hut = lastHut;
    for (let i = 0; i < count; i++) {
      const population = state.game.population.value;
      const rate = population / config.Outside.HUT_ROOM;
      const full = Math.floor(rate);
      const huts = allowEmpty ? hut : Math.ceil(rate);
      if (!huts) {
        break;
      }
      const target = Math.floor(Math.random() * huts) + 1;
      let inhabitants = 0;
      if (target <= full) {
        inhabitants = config.Outside.HUT_ROOM;
      } else if (target === full + 1) {
        inhabitants = population % config.Outside.HUT_ROOM;
      }
      hut--;
      if (inhabitants) {
        dead += inhabitants;
      }
    }
    if (dead) {
      await this.killVillagers(dead);
    }
    if (hut !== lastHut) {
      await this.engine.dispatch(
        this.engine.actions.game.buildings.setM({
          hut,
        })
      );
    }
    return {
      dead,
      destroyHut: hut - lastHut,
    };
  }

  async killVillagers(count: number) {
    const state = this.engine.getState();
    let last_population = state.game.population.value;
    let population = last_population - count * -1;
    if (population < 0) {
      population = 0;
    }
    if (population !== last_population) {
      await this.engine.dispatch(
        this.engine.actions.game.population.setM({
          value: population,
        })
      );
    }
    const remaining = this.getNumGatherers();
    const changed: any = {};
    if (remaining < 0) {
      let gap = -remaining;
      for (let k in state.game.workers) {
        const numWorkers = _.get(state.game.workers, k, 0);
        if (numWorkers < gap) {
          gap -= numWorkers;
          changed[k] = 0;
        } else {
          changed[k] = numWorkers + gap * -1;
          break;
        }
      }
      if (!_.isPlainObject(changed)) {
        this.engine.dispatch(this.engine.actions.game.workers.setM(changed));
      }
    }
  }

  getNumGatherers() {
    const state = this.engine.getState();
    let num = state.game.population.value;
    for (let k in state.game.workers) {
      num -= _.get(state.game.workers, k, 0);
    }
    return num;
  }

  getMaxPopulation() {
    const state = this.engine.getState();
    return (state.game.buildings.hut || 0) * config.Outside.HUT_ROOM;
  }

  schedulePopIncrease() {
    const nextIncrease =
      Math.floor(
        Math.random() *
        (config.Outside.POP_DELAY[1] - config.Outside.POP_DELAY[0])
      ) + config.Outside.POP_DELAY[0];
    logger(
      'next population increase scheduled in ' + nextIncrease + ' minutes'
    );
    this._popTimeout = this.engine.setTimeout(
      this.increasePopulation.bind(this),
      nextIncrease * 60 * 1000
    );
  }

  increasePopulation() {
    const state = this.engine.getState();
    if (state.features.location.Outside) {
      const space = this.getMaxPopulation() - state.game.population.value;
      if (space > 0) {
        let num = Math.floor(Math.random() * (space / 2) + space / 2);
        if (num === 0) num = 1;
        let msg;
        if (num == 1) {
          msg = translate('a stranger arrives in the night');
        } else if (num < 5) {
          msg = translate('a weathered family takes up in one of the huts.');
        } else if (num < 10) {
          msg = translate('a small group arrives, all dust and bones.');
        } else if (num < 30) {
          msg = translate('a convoy lurches in, equal parts worry and hope.');
        } else {
          msg = translate("the town's booming. word does get around.");
        }
        this.engine.notify(msg);
        logger('population increased by ' + num);
        this.engine.dispatch(
          this.engine.actions.game.population.addM({
            value: num,
          })
        );
      }
    }
    this.schedulePopIncrease();
  }

  enableBuildingWorker() {
    const state = this.engine.getState();
    const jobMap = {
      'lodge': ['hunter', 'trapper'],
      'tannery': ['tanner'],
      'smokehouse': ['charcutier'],
      'iron mine': ['iron miner'],
      'coal mine': ['coal miner'],
      'sulphur mine': ['sulphur miner'],
      'steelworks': ['steelworker'],
      'armoury': ['armourer']
    } as { [key in Building]?: string[] };
    let added = false;
    for (let name in state.game.buildings) {
      if (name !== 'trap') {
        const jobs = jobMap[name as Building];

        if (jobs) {
          for (let i = 0, len = jobs.length; i < len; i++) {
            let job = jobs[i];
            if (typeof state.game.buildings[name as Building] !== 'undefined' &&
              typeof state.game.workers[job as WorkerType] === 'undefined') {
              this.engine.dispatch(this.engine.actions.game.workers.setM({
                [job]: 0
              }))
              added = true;
            }
          }
        }
      }
    }
    return added;
  }

  updateVillageIncome() {
    const state = this.engine.getState();
    for (const worker in config.Outside.INCOME) {
      const income = config.Outside.INCOME[worker as WorkerType];
      let num =
        worker == 'gatherer'
          ? this.getNumGatherers()
          : state.game.workers[worker as WorkerType] || 0;
      if (typeof num === 'number') {
        const stores = {} as any;
        if (num < 0) {
          num = 0;
        }
        let needsUpdate = false;
        let curIncome = this.engine.getIncome(worker);
        for (let store in income.stores) {
          stores[store as StoreCategory] =
            (income.stores[store as keyof typeof income.stores] || 0) * num;
          if (curIncome[store] !== stores[store]) {
            needsUpdate = true;
          }
        }
        if (needsUpdate) {
          this.engine.setIncome(worker, {
            delay: income.delay,
            stores: stores,
          });
        }
      }
    }
  }
}
