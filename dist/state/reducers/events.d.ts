import { Scene } from '../../type';
export declare const actions: {
    end: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
    cleanEnemys: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    logFight: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        time: number;
        target: string;
        type: string;
        meta?: any;
        id?: string | undefined;
    }, string>;
    push: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
    setSceneEnemy: import("@reduxjs/toolkit").ActionCreatorWithPayload<Scene, string>;
    winFight: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    clean: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string | undefined, string>;
    removeM: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[], string>;
    set: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
    add: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
    setM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        [key: string]: any;
    }, string>;
    addM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        [key: string]: any;
    }, string>;
};
declare const _default: import("redux").Reducer<{
    [key: string]: any;
    eventStack: string[];
    activeScene: string;
    delay: {
        [key: string]: number;
    };
    loot: {
        [key: string]: number;
    };
    enemys: {
        chara: string;
        health: number;
        maxHealth: number;
        stunned: number;
    }[];
    won: boolean;
    fightEvents: {
        time: number;
        target: string;
        type: string;
        meta?: any;
        id?: string | undefined;
    }[];
}, import("redux").AnyAction>;
export default _default;
