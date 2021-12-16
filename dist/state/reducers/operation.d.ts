import { GameState } from '../index';
import { Operation, OptHistory } from '../../operations';
import Engine from '../../engine';
export declare const actions: {
    record: import("@reduxjs/toolkit").AsyncThunk<OptHistory, Operation, {
        state: GameState;
        extra: {
            engine: Engine;
        };
    }>;
    clearCooldown: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
};
declare const _default: import("redux").Reducer<{
    [operationId: string]: OptHistory;
}, import("redux").AnyAction>;
export default _default;
