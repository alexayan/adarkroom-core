import { Income } from '../../type';
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    clean(state: any, action: {
        payload: string | undefined;
        type: string;
    }): void;
    removeM(state: any, action: {
        payload: string[];
        type: string;
    }): void;
    set(_: any, action: {
        payload: any;
        type: string;
    }): any;
    add(state: any, action: {
        payload: any;
        type: string;
    }): any;
    setM(state: any, action: {
        payload: {
            [key: string]: any;
        };
        type: string;
    }): void;
    addM(state: any, action: {
        payload: {
            [key: string]: any;
        };
        type: string;
    }): void;
}>;
declare const _default: import("redux").Reducer<{
    thieves?: Income | undefined;
    builder?: Income | undefined;
    gatherer?: Income | undefined;
    hunter?: Income | undefined;
    trapper?: Income | undefined;
    tanner?: Income | undefined;
    charcutier?: Income | undefined;
    iron_miner?: Income | undefined;
    coal_miner?: Income | undefined;
    sulphur_miner?: Income | undefined;
    steelworker?: Income | undefined;
    armourer?: Income | undefined;
}, import("redux").AnyAction>;
export default _default;
