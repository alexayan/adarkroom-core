import { PayloadAction } from '@reduxjs/toolkit';
declare const _default: {
    clean(state: any, action: PayloadAction<string | undefined>): void;
    removeM(state: any, action: PayloadAction<string[]>): void;
    set(_: any, action: PayloadAction<any>): any;
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
};
export default _default;
