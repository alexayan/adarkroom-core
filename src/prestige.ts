import Engine from './engine';
import config from './config';
import GameModule from './module';

export default class Prestige extends GameModule {
  constructor(engine: Engine) {
    super(engine);
  }

  collectStores() {
    const state = this.engine.store?.getState();
    const prevStores = state!.previous.stores;
    if (prevStores && prevStores.length > 0) {
      const toAdd = {} as any;
      for (const i in config.Prestige.storesMap) {
        const s = config.Prestige.storesMap[i];
        toAdd[s.store.toString()] = prevStores[i];
      }
      this.engine?.store?.dispatch(this.engine.actions.stores.addM(toAdd));
    }
    this.engine?.store?.dispatch(
      this.engine.actions.previous.setM({
        stores: [],
      })
    );
  }

  save() {
    const stores = this.getStores(true);
    const score = this.totalScore();
    this.engine.store?.dispatch(
      this.engine.actions.previous.setM({
        stores,
        score,
      })
    );
  }

  totalScore() {
    const state = this.engine.store?.getState();
    return (state?.previous.score || 0) + this.calculateScore();
  }

  calculateScore() {
    const state = this.engine.store?.getState();
    let scoreUnadded = this.getStores(false);
    let fullScore = 0;

    let factor = [
      1,
      1.5,
      1,
      2,
      2,
      3,
      3,
      2,
      2,
      2,
      2,
      1.5,
      1,
      1,
      10,
      30,
      50,
      100,
      150,
      150,
      3,
      3,
      5,
      4,
    ];
    for (let i = 0; i < factor.length; i++) {
      fullScore += scoreUnadded[i] * factor[i];
    }

    fullScore = fullScore + (state?.stores.alien_alloy || 0) * 10;
    fullScore = fullScore + state!.game.spaceShip.hull * 50;
    return Math.floor(fullScore);
  }

  getStores(reduce: boolean) {
    const state = this.engine.store!.getState();
    const stores = [];

    for (var i in config.Prestige.storesMap) {
      var s = config.Prestige.storesMap[i];
      stores.push(
        Math.floor(
          (state.stores[s.store] || 0) / (reduce ? this.randGen(s.type) : 1)
        )
      );
    }

    return stores;
  }

  randGen(storeType: string) {
    var amount;
    switch (storeType) {
      case 'g':
        amount = Math.floor(Math.random() * 10);
        break;
      case 'w':
        amount = Math.floor(Math.floor(Math.random() * 10) / 2);
        break;
      case 'a':
        amount = Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
        break;
      default:
        return 1;
    }
    if (amount !== 0) {
      return amount;
    }
    return 1;
  }
}
