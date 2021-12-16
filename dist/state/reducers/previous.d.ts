export declare const actions: {
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
    stores: never[];
    score: number;
}, import("redux").AnyAction>;
export default _default;
