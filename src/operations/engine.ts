import { operationManager } from './index';
import translate from '../translate';
import { GameSpace } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'Engine.travelTo',
    name: translate('travel to'),
    isAvailable: (engine) => {
        const state = engine.getState();
        let activeCount = 0;
        Object.keys(state.features.location).forEach((location) => {
            if (state.features.location[location as never]) {
                activeCount++;
            }
        })
        return !state.engine.activeSubSpace && activeCount > 1 && state.engine.activeSpace !== GameSpace.World && state.engine.activeSpace !== GameSpace.Space;
    },
    exec: async (engine, _, space: string) => {
        return await engine.travelTo(space as GameSpace);
    },
    help: (engine) => {
        const state = engine.getState();
        const locations: string[] = [];
        Object.keys(state.features.location).forEach((location) => {
            if (state.features.location[location as never]) {
                locations.push(location);
            }
        })
        return {
            desc: `travel to ${locations.join(', ')}`,
            parms: [locations]
        }
    }
})

operationManager.add({
    id: 'Engine.SubSpace.back',
    name: translate('Back'),
    isAvailable: (engine) => {
        const state = engine.getState();
        return !!state.engine.activeSubSpace;
    },
    meta: {
       
    },
    exec: async (engine) => {
        await engine.travelToSubSpace('');
    }
})