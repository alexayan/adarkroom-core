import { operationManager } from './index';
import translate from '../translate';
import config from '../config';
import { GameSpace, StoreCategory, Event } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'Ship.reinforceHull',
    name: translate('reinforce hull'),
    cooldown: () => {
        return config.Ship.ALLOY_PER_HULL
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Ship;
    },
    meta: {
        space: GameSpace.Ship,
        cost: {
            [StoreCategory.alien_alloy]: config.Ship.ALLOY_PER_HULL
        }
    },
    exec: async (engine) => {
        const state = engine.getState();
        if ((state.stores.alien_alloy || 0) < config.Ship.ALLOY_PER_HULL) {
            engine.notify(translate('not enough alien alloy'), GameSpace.Ship);
            return false;
        }
        await engine.dispatch(
            engine.actions.stores.addM({
                alien_alloy: -1 * config.Ship.ALLOY_PER_HULL,
            })
        );
        await engine.dispatch(
            engine.actions.game.spaceShip.addM({
                hull: 1,
            })
        );
        return true;
    }
})

operationManager.add({
    id: 'Ship.upgradeEngine',
    name: translate('upgrade engine'),
    cooldown: () => {
        return config.Ship.ALLOY_PER_THRUSTER
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Ship;
    },
    meta: {
        space: GameSpace.Ship,
        cost: {
            [StoreCategory.alien_alloy]: config.Ship.ALLOY_PER_THRUSTER
        }
    },
    exec: async (engine) => {
        const state = engine.getState();
        if ((state.stores.alien_alloy || 0) < config.Ship.ALLOY_PER_THRUSTER) {
            engine.notify(translate('not enough alien alloy'), GameSpace.Ship);
            return false;
        }
        await engine.dispatch(
            engine.actions.stores.addM({
                alien_alloy: -1 * config.Ship.ALLOY_PER_THRUSTER,
            })
        );
        await engine.dispatch(
            engine.actions.game.spaceShip.addM({
                thrusters: 1,
            })
        );
        return true;
    }
})

operationManager.add({
    id: 'Ship.checkLiftOff',
    name: translate('lift off'),
    cooldown: () => {
        return 0;
    },
    isAvailable: (engine) => {
        const state = engine.getState();
        return state.engine.activeSpace === GameSpace.Ship;
    },
    meta: {
        space: GameSpace.Ship,
    },
    exec: async (engine) => {
        // const state = engine.getState();
        if (true) {
            const event = {
                title: translate('Ready to Leave?'),
                id: 'ship_check_lift_off',
                scenes: {
                    start: {
                        text: [
                            translate("time to get out of this place. won't be coming back."),
                        ],
                        buttons: {
                            fly: {
                                text: translate('lift off'),
                                onChoose: function (engine) {
                                    engine.dispatch(
                                        engine.actions.game.spaceShip.setM({
                                            seenWarning: true,
                                        })
                                    );
                                    const score = engine.prestige.calculateScore()
                                    engine.notify(translate(`game end`))
                                    /* i18n-extract score for this game: {score} */
                                    engine.notify(`score for this game: ${score}`)
                                    engine.notify(`https://adarkroom.doublespeakgames.com`)
                                    engine.spaces.Ship.liftOff();
                                },
                                nextScene: 'end',
                            },
                            wait: {
                                text: translate('linger'),
                                onChoose: function () { },
                                nextScene: 'end',
                            },
                        },
                    },
                },
            } as Event;
            engine.events.addEvent('Ship', event);
            engine.events.startEvent(event);
        } else {
            // engine.spaces.Ship.liftOff();
        }
    }
})