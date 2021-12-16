import { GameSpace } from '../../type';
export declare type Notification = {
    text: string;
    module?: string;
    _module?: string;
};
export declare const actions: {
    notify: import("@reduxjs/toolkit").AsyncThunk<Notification | null, {
        message: Notification;
        noQueue?: boolean | undefined;
    }, {}>;
    spaceNotify: import("@reduxjs/toolkit").ActionCreatorWithPayload<GameSpace, string>;
};
declare const _default: import("redux").Reducer<{
    notifyQueue: {
        [key: string]: Notification[];
    };
}, import("redux").AnyAction>;
export default _default;
