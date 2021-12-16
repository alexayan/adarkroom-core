import Engine from './engine';
import config, { CraftableCategory, NonCraftableCategory } from './config';
import { StoreCategory } from './type';
import _ from 'lodash';
import GameModule from './module';
import './operations/path';
export default class Path extends GameModule {
  constructor(engine: Engine) {
    super(engine);

    this.engine.observer(
      state => {
        return {
          compass: state.stores.compass,
          pathEnable: state.features.location.Path
        };
      },
      state => {
        if (state.compass && !state.pathEnable) {
          this.openPath();
        }
      }
    );
  }

  onArrival() {
    this.updateOutfitting();
  }

  async openPath() {
    const state = this.engine.getState();
    await this.engine.dispatch(
      this.engine.actions.features.location.enablePath()
    );
    /* i18n-extract the compass points {dir} */
    this.engine.notify('the compass points ' + state.game.world.dir);
  }

  getWeight(thing: StoreCategory) {
    let w = config.Path.Weight[thing];
    if (typeof w !== 'number') w = 1;
    return w;
  }

  getCapacity() {
    const state = this.engine.getState();
    if (!!state.stores.convoy) {
      return config.Path.DEFAULT_BAG_SPACE + 60;
    } else if (!!state.stores.wagon) {
      return config.Path.DEFAULT_BAG_SPACE + 30;
    } else if (!!state.stores.rucksack) {
      return config.Path.DEFAULT_BAG_SPACE + 10;
    } else {
      return config.Path.DEFAULT_BAG_SPACE;
    }
  }

  getFreeSpace() {
    const state = this.engine.getState();
    let num = 0;
    for (let k in state.path.outfit) {
      const n = state.path.outfit[k as StoreCategory] || 0;
      num += n * this.getWeight(k as StoreCategory);
    }
    return this.getCapacity() - num;
  }

  updateOutfitting() {
    const state = this.engine.getState();
    const outfits = Object.keys(NonCraftableCategory).concat(
      Object.keys(CraftableCategory)
    );
    let outfitChanged = false;
    let setOutfit = {} as any;
    for (let k in outfits) {
      const itemName = k as StoreCategory;
      const have = state.stores[itemName] || 0;
      let num = state.path.outfit[itemName] || 0;
      num = typeof num === 'number' ? num : 0;
      if (have < num) {
        num = have;
        outfitChanged = true;
        setOutfit[k] = num;
      }
    }
    if (outfitChanged) {
      this.engine.dispatch(this.engine.actions.path.outfit.setM(setOutfit));
    }
  }

  async increaseSupply(supply: StoreCategory, count: number) {
    const state = this.engine.getState();
    const cur = state.path.outfit[supply] || 0;
    const freeSpace = this.getFreeSpace();
    const weight = this.getWeight(supply);
    const storeCount = state.stores[supply] || 0;
    let addCount = 0;
    if (freeSpace >= weight && cur < storeCount) {
      const maxExtraByWeight = Math.floor(freeSpace / weight);
      const maxExtraByStore = storeCount - cur;
      addCount = Math.min(count, maxExtraByWeight, maxExtraByStore);
      if (addCount) {
        await this.engine.dispatch(
          this.engine.actions.path.outfit.addM({
            [supply]: addCount,
          })
        );
        this.updateOutfitting();
      }
    }
    return cur + addCount;
  }

  async decreaseSupply(supply: StoreCategory, count: number) {
    const state = this.engine.getState();
    const cur = state.path.outfit[supply] || 0;
    if (cur) {
      const to = Math.max(0, cur - count);
      if (cur !== to) {
        await this.engine.dispatch(
          this.engine.actions.path.outfit.setM({
            [supply]: to,
          })
        );
        this.updateOutfitting();
      }
    }
  }
}
