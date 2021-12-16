export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    change(_: number, action: {
        payload: any;
        type: string;
    }): any;
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
declare const _default: import("redux").Reducer<number, import("redux").AnyAction>;
export default _default;
