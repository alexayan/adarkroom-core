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
    trap: number;
    cart: number;
    hut: number;
    lodge: number;
    trading_post: number;
    tannery: number;
    smokehouse: number;
    workshop: number;
    steelworks: number;
    armoury: number;
    sulphur_mine: number;
    iron_mine: number;
    coal_mine: number;
}, import("redux").AnyAction>;
export default _default;
