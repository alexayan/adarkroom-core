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
    sulphur_miner: number;
    hunter: number;
    trapper: number;
    charcutier: number;
    iron_miner: number;
    coal_miner: number;
    armourer: number;
    tanner: number;
    steelworker: number;
}, import("redux").AnyAction>;
export default _default;
