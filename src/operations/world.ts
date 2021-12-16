import { operationManager } from './index';
import translate from '../translate';
import config from '../config';
import { GameSpace } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'World.moveSouth',
    name: translate('south'),
    isAvailable: (engine) => {
        const state = engine.getState();
        const event = engine.events.getActiveEvent();
        return state.engine.activeSpace === GameSpace.World && !event;
    },
    meta: {
        space: GameSpace.World
    },
    exec: async (engine) => {
        const curPos = engine.getState().game.world.curPos;
        if (curPos[1] < config.World.RADIUS * 2) {
            engine.spaces.World.move(config.World.SOUTH);
        }
    }
})

operationManager.add({
    id: 'World.moveNorth',
    name: translate('north'),
    isAvailable: (engine) => {
        const state = engine.getState();
        const event = engine.events.getActiveEvent();
        return state.engine.activeSpace === GameSpace.World && !event;
    },
    meta: {
        space: GameSpace.World
    },
    exec: async (engine) => {
        const curPos = engine.getState().game.world.curPos;
        if (curPos[1] > 0) {
            engine.spaces.World.move(config.World.NORTH);
        }
    }
})

operationManager.add({
    id: 'World.moveWest',
    name: translate('west'),
    isAvailable: (engine) => {
        const state = engine.getState();
        const event = engine.events.getActiveEvent();
        return state.engine.activeSpace === GameSpace.World && !event;
    },
    meta: {
        space: GameSpace.World
    },
    exec: async (engine) => {
        const curPos = engine.getState().game.world.curPos;
        if (curPos[0] > 0) {
            engine.spaces.World.move(config.World.WEST);
        }
    }
})

operationManager.add({
    id: 'World.moveEast',
    name: translate('east'),
    isAvailable: (engine) => {
        const state = engine.getState();
        const event = engine.events.getActiveEvent();
        return state.engine.activeSpace === GameSpace.World && !event;
    },
    meta: {
        space: GameSpace.World
    },
    exec: async (engine) => {
        const curPos = engine.getState().game.world.curPos;
        if (curPos[0] < config.World.RADIUS * 2) {
            engine.spaces.World.move(config.World.EAST);
        }
    }
})