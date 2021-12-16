export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    changePenrose(state: import("immer/dist/internal").WritableDraft<{
        penrose: boolean;
    }>, action: {
        payload: any;
        type: string;
    }): void;
}>;
declare const _default: import("redux").Reducer<{
    penrose: boolean;
}, import("redux").AnyAction>;
export default _default;
