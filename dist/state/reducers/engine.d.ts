import { GameSpace } from '../../type';
export declare const actions: {
    changeSpace: import("@reduxjs/toolkit").AsyncThunk<GameSpace, GameSpace, {}>;
    changeSubSpace: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
};
declare const _default: import("redux").Reducer<{
    activeSpace?: GameSpace | undefined;
    activeSubSpace: string;
}, import("redux").AnyAction>;
export default _default;
