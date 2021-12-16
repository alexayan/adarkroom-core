export declare const actions: import("@reduxjs/toolkit").CaseReducerActions<{
    empty(): {};
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
    wood?: number | undefined;
    fur?: number | undefined;
    meat?: number | undefined;
    iron?: number | undefined;
    coal?: number | undefined;
    sulphur?: number | undefined;
    steel?: number | undefined;
    cured_meat?: number | undefined;
    scales?: number | undefined;
    teeth?: number | undefined;
    leather?: number | undefined;
    bait?: number | undefined;
    torch?: number | undefined;
    cloth?: number | undefined;
    bone_spear?: number | undefined;
    iron_sword?: number | undefined;
    steel_sword?: number | undefined;
    bayonet?: number | undefined;
    rifle?: number | undefined;
    laser_rifle?: number | undefined;
    bullets?: number | undefined;
    energy_cell?: number | undefined;
    grenade?: number | undefined;
    bolas?: number | undefined;
    medicine?: number | undefined;
    compass?: number | undefined;
    charm?: number | undefined;
    alien_alloy?: number | undefined;
    waterskin?: number | undefined;
    cask?: number | undefined;
    water_tank?: number | undefined;
    rucksack?: number | undefined;
    wagon?: number | undefined;
    convoy?: number | undefined;
    l_armou?: number | undefined;
    i_armour?: number | undefined;
    s_armour?: number | undefined;
    trap?: number | undefined;
    cart?: number | undefined;
    hut?: number | undefined;
    lodge?: number | undefined;
    trading_post?: number | undefined;
    tannery?: number | undefined;
    smokehouse?: number | undefined;
    workshop?: number | undefined;
    steelworks?: number | undefined;
    armoury?: number | undefined;
}, import("redux").AnyAction>;
export default _default;
