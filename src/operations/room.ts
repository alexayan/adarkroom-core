import { operationManager } from './index';
import translate from '../translate';
import config, { TradeCategory, CraftableCategory } from '../config';
import { GameSpace, StoreCategory, Building } from '../type';
import _ from 'lodash';
import {needsWorkshop} from '../tools/room';

operationManager.add({
    id: 'Room.lightFire',
    name: translate("light fire"),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && state.game.fire.status.value === config.Room.FireStatus.Dead.value;
    },
    exec: async (engine) => {
        const Room = engine.spaces.Room;
        const appState = engine.getState();
        let wood = appState.stores.wood;
        let currentFireStatus = appState.game.fire.status;

        if (typeof wood !== 'undefined') {
            wood = wood || 0;
            if (wood < 5) {
                engine.notify(
                    translate('not enough wood to get the fire going'),
                    GameSpace.Room
                );
                engine.operationExecutor.clearCooldown('Room.lightFire')
                return currentFireStatus;
            } else if (wood > 4) {
                await engine.dispatch(engine.actions.stores.addM({
                    wood: -5
                }))
            }
        } else {
            await engine.dispatch(engine.actions.stores.addM({
                wood: 5
            }))
            await engine.operationExecutor.cooldown('Room.stokeFire')
        }

        currentFireStatus = config.Room.FireStatus.Burning;
        await engine.dispatch(
            engine.actions.game.fire.changeFire(currentFireStatus)
        );
        Room.onFireChange(currentFireStatus);
        return currentFireStatus;
    },
    cooldown: () => {
        return config.Room.STOKE_COOLDOWN;
    },
    meta: {
        space: GameSpace.Room,
        cost: {
            [StoreCategory.wood]: 5
        }
    }
})

operationManager.add({
    id: 'Room.stokeFire',
    name: translate("stoke fire"),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !state.engine.activeSubSpace &&  state.engine.activeSpace === GameSpace.Room && state.game.fire.status.value !== config.Room.FireStatus.Dead.value;
    },
    exec: async (engine) => {
        const appState = engine.getState();
        const wood = appState.stores.wood;
        const Room = engine.spaces.Room;
        let currentFireStatus = appState.game.fire.status;
        if (!wood) {
            engine.notify(translate('the wood has run out'), GameSpace.Room);
            engine.operationExecutor.clearCooldown('Room.stokeFire');
            return currentFireStatus;
        }
        await engine.dispatch(
            engine.actions.stores.addM({
                wood: -1,
            })
        );
        if (currentFireStatus.value < config.Room.FireStatus.Roaring.value) {
            const newState = _.findKey(config.Room.FireStatus, fire => {
                return fire.value === currentFireStatus.value + 1;
            });
            if (newState) {
                currentFireStatus =
                    config.Room.FireStatus[
                    newState as keyof typeof config.Room.FireStatus
                    ];
                await engine.dispatch(
                    engine.actions.game.fire.changeFire(currentFireStatus)
                );
            }
        }
        Room.onFireChange(currentFireStatus);
        return currentFireStatus;
    },
    cooldown: () => {
        return config.Room.STOKE_COOLDOWN
    },
    meta: {
        space: GameSpace.Room,
        cost: {
            [StoreCategory.wood]: 1
        }
    }
})

operationManager.add({
    id: 'Room.stores',
    name: translate("warehouse"),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && typeof state.stores.wood !== 'undefined'
    },
    exec: async (engine) => {
        const state = engine.getState();
        let storeNames = Object.keys(state.stores);
        const stores = [];
        for (let i = 0, len = storeNames.length; i < len; i++) {
            const name = storeNames[i];
            const count = state.stores[name as StoreCategory];
            if (!!count && config.items[name] && config.items[name].type !== 'building') {
                stores.push({
                    name,
                    count,
                    info: config.items[name]
                })
            }
        }
        /* i18n-extract view {place} */
        return stores;
    },
    meta: {
        space: GameSpace.Room,
    }
})

operationManager.add({
    id: 'Room.trading_post',
    name: translate('trading post'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && !!state.game.buildings.trading_post;
    },
    meta: {
        space: GameSpace.Room,
    },
    exec: async (engine, operation) => {
        await engine.travelToSubSpace(operation.name);
        return operation.name;
    }
})

operationManager.add({
    id: 'Room.workshop',
    name: translate('workshop'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && !!state.game.buildings.workshop;
    },
    meta: {
        space: GameSpace.Room,
    },
    exec: async (engine, operation) => {
        await engine.travelToSubSpace(operation.name);
        return operation.name;
    }
})


Object.keys(TradeCategory).forEach((thing) => {
    operationManager.add({
        id: `Room.buy.${thing}`,
        name: translate(thing),
        isAvailable: (engine, operation) => {
            const state = engine.getState();
            const thing = operation.meta.thing;
            return state.engine.activeSubSpace === 'trading post' && engine.spaces.Room.buyUnlocked(thing);
        },
        meta: {
            thing,
            space: GameSpace.Room,
            group: 'buy'
        },
        exec: async (engine, operation) => {
            const thing = operation.meta.thing as StoreCategory;
            const state = engine.getState();
            const good = config.items[thing];
            let count = state.stores[thing] || 0;
            if (count < 0) {
                count = 0;
            }
            if (!good.trade) {
                return false;
            }
            if (good.trade.maximum && good.trade.maximum < count) {
                /* i18n-extract can't buy any more of {item} */
                engine.notify(`can't buy any more of ${good.name}`, GameSpace.Room);
                return false;
            }
            const storeMod = {} as { [key: string]: number };
            const cost = good.trade.cost();
            for (let k in cost) {
                const have = state.stores[k as StoreCategory] || 0;
                if (have < cost[k]) {
                    /* i18n-extract not enough {item}, need {count1}, stock {count2} */
                    engine.notify(`not enough ${k}, need ${cost[k]}, stock ${have}`, GameSpace.Room);
                    return false;
                } else {
                    storeMod[k] = have - cost[k];
                }
            }
            await await engine.dispatch(engine.actions.stores.addM(storeMod));
            if (good.trade.tradeMsg) {
                engine.notify(good.trade.tradeMsg);
            }
            await engine.dispatch(
                engine.actions.stores.addM({
                    [thing]: 1,
                })
            );
            /* i18n-extract bought {item} */
            engine.notify(`bought ${thing}`, GameSpace.Room);
            return true;
        }
    })
})

Object.keys(CraftableCategory).forEach((thing) => {
    const item = config.items[thing];
    const group = needsWorkshop(item.craft!.type) ? 'craft' : 'build';
    operationManager.add({
        id: `Room.${group}.${thing}`,
        name: translate(thing),
        isAvailable: (engine, operation) => {
            const state = engine.getState();
            const thing = operation.meta.thing;
            const group = operation.meta.group;
            if (group === 'craft') {
                return state.engine.activeSubSpace === 'workshop' && state.engine.activeSpace === GameSpace.Room && engine.spaces.Room.craftUnlocked(thing);
            }
            return !state.engine.activeSubSpace && state.engine.activeSpace === GameSpace.Room && engine.spaces.Room.craftUnlocked(thing);
        },
        meta: {
            thing,
            space: GameSpace.Room,
            group
        },
        exec: async (engine, operation) => {
            const thing = operation.meta.thing as StoreCategory;
            const state = engine.getState();
            if (
                state.game.temperature.status.value <=
                config.Room.TemperatureStatus.Cold.value
            ) {
                engine.notify('builder just shivers', GameSpace.Room);
                return false;
            }
            const craftable = config.items[thing];

            if (!craftable.craft) {
                return false;
            }

            let numThings = 0;
            switch (craftable.type) {
                case 'good':
                case 'weapon':
                case 'tool':
                case 'upgrade':
                    numThings = state.stores[(thing as any) as StoreCategory] || 0;
                    break;
                case 'building':
                    numThings = state.game.buildings[(thing as any) as Building] || 0;
                    break;
            }

            if (numThings < 0) numThings = 0;
            if (craftable.craft.maximum && craftable.craft.maximum <= numThings) {
                /* i18n-extract can't build any more of {item} */
                engine.notify(`can't build any more of ${craftable.name}`, GameSpace.Room);
                return false;
            }

            const storeMod = {} as { [key in StoreCategory]: number };
            const cost = craftable.craft.cost(state);
            for (var k in cost) {
                var have = state.stores[k as StoreCategory] || 0;
                if (have < cost[k]) {
                    engine.notify(`not enough ${k}, need ${cost[k]}, stock ${have}`, GameSpace.Room);
                    return false;
                } else {
                    storeMod[k as StoreCategory] = have - cost[k];
                }
            }
            await engine.setToStore(storeMod);

            if (craftable.craft.buildMsg) {
                engine.notify(craftable.craft?.buildMsg, GameSpace.Room);
            }

            switch (craftable.craft?.type) {
                case 'good':
                case 'weapon':
                case 'upgrade':
                case 'tool':
                    await engine.addToStore({
                        [thing]: 1,
                    });
                    break;
                case 'building':
                    await engine.dispatch(
                        engine.actions.game.buildings.addM({
                            [thing]: 1,
                        })
                    );
                    break;
            }
            return true;
        }
    })
})