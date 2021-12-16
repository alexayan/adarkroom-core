export declare const actions: {
    seeAll: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
    visit: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        x: number;
        y: number;
    }, string>;
    useOutpost: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    setMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        pos: number[];
        value: any;
    }, string>;
    clean: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string | undefined, string>;
    removeM: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[], string>;
    set: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
    setM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        [key: string]: any;
    }, string>;
    addM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
        [key: string]: any;
    }, string>;
};
declare const _default: import("redux").Reducer<{
    seenAll: boolean;
    mask: boolean[][];
    map: any[][];
    enableShip: boolean;
    ship: number[];
    dir: string;
    sulphurmine: boolean;
    ironmine: boolean;
    coalmine: boolean;
    water: number;
    danger: boolean;
    foodMove: number;
    waterMove: number;
    starvation: boolean;
    thirst: boolean;
    usedOutposts: {
        [key: string]: boolean;
    };
    curPos: number[];
    health: number;
    dead: boolean;
    fightMove: number;
    outfit: {
        [key: string]: number;
    };
    stunned: number;
}, import("redux").AnyAction>;
export default _default;
