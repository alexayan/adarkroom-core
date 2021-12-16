declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    perks: {
        boxer: boolean;
        martial_artist: boolean;
        unarmed_master: boolean;
        barbarian: boolean;
        slow_metabolism: boolean;
        desert_rat: boolean;
        evasive: boolean;
        precise: boolean;
        scout: boolean;
        stealthy: boolean;
        gastronome: boolean;
    };
    statistics: {
        punches: number;
        starved: number;
        dehydrated: number;
        cityCleared: boolean;
    };
}>, import("redux").AnyAction>;
export default _default;
export declare const actions: {
    perks: {
        addPerk: import("@reduxjs/toolkit").AsyncThunk<import("../../..").PerkCategory, import("../../..").PerkCategory, {}>;
    };
    statistics: {
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
};
