import { operationManager } from './index';
import translate from '../translate';
import { GameSpace, StoreCategory, SceneButton } from '../type';
import _ from 'lodash';

operationManager.add({
    id: 'Events.choice',
    name: translate('choice'),
    isAvailable: (engine) => {
        const scene = engine.events.getActiveScene();
        if (scene?.combat) {
            const state = engine.getState();
            if (!state.events.won) {
                return false;
            }
        }
        return scene && scene.buttons;
    },
    help: (engine) => {
        const scene = engine.events.getActiveScene();
        const choice = [] as string[];
        Object.keys(scene?.buttons || {}).forEach((btn) => {
            choice.push(btn)
        })
        return {
            desc: `choice ${choice.join(', ')}`,
            parms: [choice]
        }
    },
    exec: async (engine, _, name: string) => {
        const event = engine.events.getActiveEvent();
        if (!event) {
            return;
        }
        const state = engine.getState();
        const button = event.scenes[state.events.activeScene].buttons[name] as SceneButton;
        let costMod = {} as any;
        if (button.cost) {
            for (let store in button.cost) {
                const storeKey = store as StoreCategory;
                let num = state.engine.activeSpace === GameSpace.World ? state.path.outfit[storeKey] || 0 : state.stores[storeKey] || 0;
                if (num < (button.cost[storeKey] || 0)) {
                    engine.notify(`not enough ${storeKey}`);
                    return false;
                }
                costMod[storeKey] = -(button.cost[storeKey] || 0);
            }
            if (state.engine.activeSpace === GameSpace.World) {
                await engine.dispatch(engine.actions.path.outfit.addM(costMod))
            } else {
                await engine.dispatch(engine.actions.stores.addM(costMod));
            }
        }

        if (typeof button.onChoose === 'function') {
            button.onChoose(engine);
        }

        if (button.reward) {
            await engine.dispatch(engine.actions.stores.addM(button.reward));
        }

        if (button.notification) {
            engine.notify(button.notification)
        }

        if (button.nextScene) {
            const nextScene = button.nextScene as any;
            if (nextScene === 'end') {
                engine.events.endEvent();
            } else if (typeof nextScene === 'string') {
                engine.events.loadScene(nextScene);
            } else {
                let r = Math.random();
                let lowestMatch = null;
                for (let i in nextScene) {
                    let sceneRate = parseFloat(i);
                    if (r < sceneRate && (lowestMatch == null || i < lowestMatch)) {
                        lowestMatch = i;
                    }
                }
                if (lowestMatch !== null) {
                    engine.events.loadScene(nextScene[lowestMatch]);
                    return;
                }
                engine.events.endEvent();
            }
        }

        return true
    }
})