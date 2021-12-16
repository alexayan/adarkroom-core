import { FireStatus } from '../../../type';
export declare const actions: {
    changeFire: import("@reduxjs/toolkit").ActionCreatorWithPayload<FireStatus, string>;
};
declare const _default: import("redux").Reducer<{
    status: {
        status: string;
        value: number;
        text: string;
    };
}, import("redux").AnyAction>;
export default _default;
