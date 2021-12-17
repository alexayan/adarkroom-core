import { operationManager } from './index';
import translate from '../translate';
import config from '../config';
import { GameSpace, StoreCategory, PerkCategory, Perks } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'Path.perks',
    name: translate('perks'),
    isAvailable: (engine) => {
        const state = engine.getState();
        if (!(!state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Path)) {
            return false;
        }
        let isExist = false;
        for (let perk in state.character.perks) {
            if (state.character.perks[perk as PerkCategory]) {
                isExist = true;
                break;
            }
        }
        return isExist;
    },
    exec: async (engine) => {
        const state = engine.getState();
        const perks = [] as {name: string, desc: string, id: string}[];
        for (let perk in state.character.perks) {
            if (state.character.perks[perk as PerkCategory]) {
                perks.push({
                    id: perk,
                    name: Perks[perk as PerkCategory].name,
                    desc: Perks[perk as PerkCategory].desc
                })
            }
        }
        return perks;
    },
    meta: {
        space: GameSpace.Path,
    }
})

operationManager.add({
    id: 'Path.embark',
    name: translate('embark'),
    cooldown: () => {
        return config.World.DEATH_COOLDOWN
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Path;
    },
    meta: {
        space: GameSpace.Path
    },
    exec: async (engine) => {
        const state = engine.getState();
        const outfit = state.path.outfit;
        const addStores = {} as any;
        for (var k in state) {
            addStores[k] = -1 * (outfit[k as StoreCategory] || 0);
        }
        await engine.dispatch(engine.actions.stores.addM(addStores));
        const cloneOutfit = {} as any;
        for (let key in outfit) {
            if (!!outfit[key as StoreCategory]) {
                cloneOutfit[key] = outfit[key as StoreCategory];
            }
        }
        await engine.dispatch(engine.actions.game.world.setM({
            outfit: _.cloneDeep(cloneOutfit)
        }))
        await engine.travelTo(GameSpace.World);
    }
})