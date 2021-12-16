import { operationManager } from './index';
import translate from '../translate';
import config from '../config';
import { GameSpace, Building, StoreCategory } from '../type';
import _ from 'lodash';


operationManager.add({
    id: 'Outside.checkTraps',
    name: translate('check traps'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Outside;
    },
    cooldown: () => {
        return config.Outside.TRAPS_DELAY
    },
    exec: async (engine) => {
        const state = engine.getState();
        const drops = {} as any;
        const msg = [];
        const numTraps = state.game.buildings.trap || 0;
        if (!numTraps) {
            engine.notify('not enough trap')
            await engine.operationExecutor.clearCooldown('Outside.checkTraps');
            return;
        }
        const numBait = state.stores.bait || 0;
        const numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
        for (let i = 0; i < numDrops; i++) {
            const roll = Math.random();
            for (const j in config.Outside.TrapDrops) {
                const drop = config.Outside.TrapDrops[j];
                if (roll < drop.rollUnder) {
                    let num = drops[drop.name];
                    if (typeof num == 'undefined') {
                        num = 0;
                        msg.push(drop.message);
                    }
                    drops[drop.name] = num + 1;
                    break;
                }
            }
        }
        /// TRANSLATORS : Mind the whitespace at the end.
        /* i18n-extract the traps contain {item1} */
        /* i18n-extract the traps contain {item1} and {item2} */
        /* i18n-extract the traps contain {item1}, {item2} and {item3} */
        /* i18n-extract the traps contain {item1}, {item2}, {item3} and {item4} */
        /* i18n-extract the traps contain {item1}, {item2}, {item3}, {item4} and {item5} */
        /* i18n-extract the traps contain {item1}, {item2}, {item3}, {item4}, {item5} and {item6} */
        let s = 'the traps contain ';
        for (let l = 0, len = msg.length; l < len; l++) {
            if (len > 1 && l > 0 && l < len - 1) {
                s += ", ";
            } else if (len > 1 && l == len - 1) {
                /// TRANSLATORS : Mind the whitespaces at the beginning and end.
                s += " and ";
            }
            s += msg[l];
        }

        let baitUsed = numBait < numTraps ? numBait : numTraps;
        drops['bait'] = -baitUsed;

        engine.notify(s, GameSpace.Outside);
        await engine.dispatch(engine.actions.stores.addM(drops))
    },
    meta: {
        buildings: {
            [Building.trap]: 1
        },
        space: GameSpace.Outside
    }
})

operationManager.add({
    id: 'Outside.gatherWood',
    name: translate('gather wood'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Outside;
    },
    cooldown: () => {
        return config.Outside.GATHER_DELAY
    },
    exec: async (engine) => {
        engine.notify(translate("dry brush and dead branches litter the forest floor"), GameSpace.Outside);
        const state = engine.getState();
        const gatherAmt = !!state.game.buildings.cart ? 50 : 10;
        await engine.dispatch(engine.actions.stores.addM({
            wood: gatherAmt
        }))
    },
    meta: {
        space: GameSpace.Outside
    }
})

operationManager.add({
    id: 'Outside.building',
    name: translate("Buildings"),
    isAvailable: (engine) => {
        const state = engine.getState();
        if (state.engine.activeSpace !== GameSpace.Outside) {
            return false;
        }
        let existBuilding = false;
        let storeNames = Object.keys(state.stores);
        for (let i = 0, len = storeNames.length; i < len; i++) {
            const name = storeNames[i];
            if (state.stores[name as StoreCategory] && config.items[name] && config.items[name].type === 'building') {
                existBuilding = true;
                break;
            }
        }
        return existBuilding;
    },
    exec: async (engine) => {
        const state = engine.getState();
        let storeNames = Object.keys(state.stores);
        const buildings = [];
        for (let i = 0, len = storeNames.length; i < len; i++) {
            const name = storeNames[i];
            const count = state.stores[name as StoreCategory];
            if (count && config.items[name] && config.items[name].type === 'building') {
                buildings.push({
                    name,
                    count,
                    info: config.items[name]
                })
            }
        }
        return buildings;
    },
    meta: {
        space: GameSpace.Outside,
    }
})