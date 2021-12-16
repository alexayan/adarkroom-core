import { PayloadAction } from '@reduxjs/toolkit';
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    setChanged(state: import("immer/dist/internal").WritableDraft<{
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    }>, action: PayloadAction<boolean>): void;
    addCraft(state: import("immer/dist/internal").WritableDraft<{
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    }>, action: PayloadAction<{
        name: string;
    }>): void;
    addBuy(state: import("immer/dist/internal").WritableDraft<{
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    }>, action: PayloadAction<{
        name: string;
    }>): void;
}>;
declare const _default: import("redux").Reducer<{
    changed: boolean;
    crafts: {
        [key: string]: boolean;
    };
    buys: {
        [key: string]: boolean;
    };
}, import("redux").AnyAction>;
export default _default;
