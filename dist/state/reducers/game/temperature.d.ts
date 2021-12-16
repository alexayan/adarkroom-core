import { PayloadAction } from '@reduxjs/toolkit';
import { TemperatureStatus } from '../../../type';
export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    change(state: import("immer/dist/internal").WritableDraft<{
        status: {
            value: number;
            text: string;
        };
    }>, action: PayloadAction<TemperatureStatus>): void;
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
    status: {
        value: number;
        text: string;
    };
}, import("redux").AnyAction>;
export default _default;
