import { PerkCategory } from '../../../type';
export declare function getInitialState(): {
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
export declare const actions: {
    addPerk: import("@reduxjs/toolkit").AsyncThunk<PerkCategory, PerkCategory, {}>;
};
declare const _default: import("redux").Reducer<{
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
}, import("redux").AnyAction>;
export default _default;
