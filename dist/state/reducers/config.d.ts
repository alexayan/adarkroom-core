import { PayloadAction } from '@reduxjs/toolkit';
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    changeHyperMode(state: import("immer/dist/internal").WritableDraft<{
        hyperMode: boolean;
        soundOn: boolean;
    }>, action: PayloadAction<boolean>): void;
    changeSound(state: import("immer/dist/internal").WritableDraft<{
        hyperMode: boolean;
        soundOn: boolean;
    }>, action: PayloadAction<boolean>): void;
}>;
declare const _default: import("redux").Reducer<{
    hyperMode: boolean;
    soundOn: boolean;
}, import("redux").AnyAction>;
export default _default;
