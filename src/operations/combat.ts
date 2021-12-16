import { operationManager } from './index';
import translate from '../translate';
import config, { WeaponCategory } from '../config';
import { GameSpace, StoreCategory, PerkCategory } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'Combat.takeLoot',
    name: translate('take'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
    },
    help: (engine) => {
        const state = engine.getState();
        const loots: string[] = [];
        Object.keys(state.events.loot).forEach((name) => {
            if (state.events.loot[name] > 0) {
                loots.push(name);
            }
        })
        return {
            desc: `take ${loots.join(', ')}`,
            parms: [loots]
        }
    },
    exec: async (engine, _, name: StoreCategory) => {
        const state = engine.getState();
        const lootNumLeft = state.events.loot[name];
        const Path = engine.spaces.Path;
        if (lootNumLeft > 0) {
            const lootweight = Path.getWeight(name);
            const freeSpace = engine.spaces.World.getFreeSpace();
            if (lootweight <= freeSpace) {
                await engine.dispatch(engine.actions.events.addM({
                    [`loot.${name}`]: -1
                }))
                await engine.dispatch(engine.actions.game.world.addM({
                    [`outfit.${name}`]: 1
                }))
            }
            return true;
        }
        return false;
    }
})

operationManager.add({
    id: 'Combat.takeAllLoot',
    name: translate('take all'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World
    },
    help: (engine) => {
        const state = engine.getState();
        const loots: string[] = [];
        Object.keys(state.events.loot).forEach((name) => {
            if (state.events.loot[name] > 0) {
                loots.push(name);
            }
        })
        return {
            desc: `take all ${loots.join(', ')}`,
            parms: [loots]
        }
    },
    exec: async (engine, _, name: StoreCategory) => {
        const state = engine.getState();
        const lootNumLeft = state.events.loot[name];
        let i;
        for (i = 0; i < lootNumLeft; i++) {
            const taken = await engine.operationExecutor.exec('Combat.takeLoot', name);
            if (!taken) {
                break;
            }
        }
        return [i === lootNumLeft, i];
    }
})

operationManager.add({
    id: 'Combat.takeEverything',
    name: translate('take everything'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !_.isEmpty(state.events.loot) && state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World
    },
    exec: async (engine) => {
        const state = engine.getState();
        const loots = state.events.loot;
        let taken = {} as any;
        let success = true;
        for (let name in loots) {
            const res = await engine.operationExecutor.exec('Combat.takeAllLoot', name)
            taken[name] = res[1];
            if (!res[0]) {
                success = false;
                break;
            }
        }
        return [success, taken]
    }
})

operationManager.add({
    id: 'Combat.dropStuff',
    name: translate('drop stuff'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !_.isEmpty(state.game.world.outfit) && state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World
    },
    help: (engine) => {
        const state = engine.getState();
        const loots: string[] = [];
        Object.keys(state.game.world.outfit).forEach((name) => {
            if (state.events.loot[name] > 0) {
                loots.push(name);
            }
        })
        return {
            desc: `drop ${loots.join(', ')}`,
            parms: [loots]
        }
    },
    exec: async (engine, _, name: string) => {
        const num = 1;
        const state = engine.getState();
        const stuffNum = state.game.world.outfit[name];
        const dropNum = Math.min(stuffNum, num);
        if (dropNum > 0) {
            await engine.dispatch(engine.actions.events.addM({
                [`loot.${name}`]: dropNum
            }))
            await engine.dispatch(engine.actions.game.world.addM({
                [`outfit.${name}`]: -dropNum
            }))
        }
        return dropNum;
    }
})


operationManager.add({
    id: 'Combat.eatMeatInFight',
    name: translate('eat meat'),
    cooldown: () => {
        return config.Event.EAT_COOLDOWN
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
        cost: { [StoreCategory.cured_meat]: 1 }
    },
    exec: async (engine) => {
        const res = await engine.events.doHeal(StoreCategory.cured_meat, engine.spaces.World.meatHeal())
        if (!res) {
            engine.operationExecutor.clearCooldown('Combat.eatMeatInFight')
        }
    }
})


operationManager.add({
    id: 'Combat.eatMeat',
    name: translate('eat meat'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
        cost: { [StoreCategory.cured_meat]: 1 }
    },
    exec: async (engine) => {
        const res = await engine.events.doHeal(StoreCategory.cured_meat, engine.spaces.World.meatHeal())
        if (!res) {
            engine.operationExecutor.clearCooldown('Combat.eatMeat')
        }
    }
})

operationManager.add({
    id: 'Combat.useMedsInFight',
    name: translate('use meds'),
    cooldown: () => {
        return config.Event.MEDS_COOLDOWN
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
        cost: { [StoreCategory.medicine]: 1 }
    },
    exec: async (engine) => {
        const res = await engine.events.doHeal(StoreCategory.medicine, engine.spaces.World.medsHeal())
        if (!res) {
            engine.operationExecutor.clearCooldown('Combat.useMedsInFight')
        }
    }
})

operationManager.add({
    id: 'Combat.useMeds',
    name: translate('use meds'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
        cost: { [StoreCategory.cured_meat]: 1 }
    },
    exec: async (engine) => {
        const res = await engine.events.doHeal(StoreCategory.medicine, engine.spaces.World.medsHeal())
        if (!res) {
            engine.operationExecutor.clearCooldown('Combat.useMeds')
        }
    }
})

operationManager.add({
    id: 'Combat.leave',
    name: translate('leave'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.events.won && state.engine.activeSpace === GameSpace.World;
    },
    meta: {
        space: GameSpace.World,
    },
    exec: async (engine) => {
        engine.events.endEvent()
    }
})

Object.keys(WeaponCategory).forEach((name) => {
    const item = config.items[name];
    operationManager.add({
        id: `Combat.useWeapon.${name}`,
        name: translate(name),
        cooldown: (engine, operation) => {
            let cd = operation.meta.weapon.cooldown;
            const state = engine.getState();
            if (state.character.perks.unarmed_master) {
                cd /= 2;
            }
            return cd;
        },
        isAvailable: (engine, operation) => {
            const state = engine.getState();
            let numWeapons = 0;
            for (let k in WeaponCategory) {
                const weapon = config.items[k].weapon;
                if (!!state.game.world.outfit[k]) {
                    if (typeof weapon?.damage !== 'number' || weapon.damage === 0) {
                        // Weapons that deal no damage don't count
                        numWeapons--;
                    } else if (weapon.cost) {
                        for (let c in weapon.cost) {
                            let num = weapon.cost[c];
                            if (state.game.world.outfit[c] < num) {
                                // Can't use this weapon, so don't count it
                                numWeapons--;
                            }
                        }
                    }
                    numWeapons++;
                }
            }
            const name = operation.meta.name;
            if (numWeapons === 0 && name === 'fists') {
                return state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
            } else {
                const outfitNum = state.path.outfit[name as StoreCategory];
                return !!outfitNum && state.events.enemys.length > 0 && !state.events.won && state.engine.activeSpace === GameSpace.World;
            }
        },
        meta: {
            space: GameSpace.World,
            cost: item.trade?.cost,
            weapon: item.weapon,
            name: name
        },
        exec: async (engine, operation) => {
            const name = operation.meta.name;
            const event = engine.events.getActiveEvent();
            const state = engine.getState();
            if (!event || state.game.world.stunned && state.game.world.stunned >= Date.now()) {
                engine.operationExecutor.clearCooldown(`Combat.useWeapon.${name}`)
                return;
            }

            const item = config.items[name];
            const weapon = item.weapon;


            if (weapon!.type === 'unarmed') {
                let punches = (state.character.statistics.punches || 0) + 1;
                engine.dispatch(engine.actions.character.statistics.setM({
                    punches
                }))
                if (punches === 50 && !state.character.perks.boxer) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.boxer))
                } else if (punches === 150 && !state.character.perks.martial_artist) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.martial_artist))
                } else if (punches === 300 && !state.character.perks.unarmed_master) {
                    engine.dispatch(engine.actions.character.perks.addPerk(PerkCategory.unarmed_master))
                }
            }

            if (weapon?.cost) {
                const outfit = { ...state.game.world.outfit };
                for (let k in weapon.cost) {
                    if (outfit[k] < weapon.cost[k]) {
                        engine.operationExecutor.clearCooldown(`Combat.useWeapon.${name}`)
                        return;
                    }
                    outfit[k] = outfit[k] - weapon.cost[k];
                }
                engine.dispatch(engine.actions.game.world.setM({
                    outfit
                }))
            }

            let dmg: any = -1;
            if (Math.random() <= engine.events.getHitChance()) {
                dmg = weapon?.damage;
                if (typeof dmg === 'number') {
                    if (weapon?.type === 'unarmed' && state.character.perks.boxer) {
                        dmg *= 2;
                    }
                    if (weapon?.type === 'unarmed' && state.character.perks.martial_artist) {
                        dmg *= 3;
                    }
                    if (weapon?.type === 'unarmed' && state.character.perks.unarmed_master) {
                        dmg *= 2;
                    }
                    if (weapon?.type === 'melee' && state.character.perks.barbarian) {
                        dmg = Math.floor(dmg * 1.5);
                    }
                }
            }

            await engine.events.damageEnemy(dmg, weapon);

            const newState = engine.getState();
            if (newState.events.enemys[0].health <= 0 && !state.events.won) {
                engine.events.winFight();
            }
        }
    })
})