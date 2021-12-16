declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    fire: {
        status: {
            status: string;
            value: number;
            text: string;
        };
    };
    builder: {
        level: number;
    };
    temperature: {
        status: {
            value: number;
            text: string;
        };
    };
    thieves: number;
    stolen: {
        wood: number | undefined;
        fur: number | undefined;
        meat: number | undefined;
        iron: number | undefined;
        coal: number | undefined;
        sulphur: number | undefined;
        steel: number | undefined;
        cured_meat: number | undefined;
        scales: number | undefined;
        teeth: number | undefined;
        leather: number | undefined;
        bait: number | undefined;
        torch: number | undefined;
        cloth: number | undefined;
        bone_spear: number | undefined;
        iron_sword: number | undefined;
        steel_sword: number | undefined;
        bayonet: number | undefined;
        rifle: number | undefined;
        laser_rifle: number | undefined;
        bullets: number | undefined;
        energy_cell: number | undefined;
        grenade: number | undefined;
        bolas: number | undefined;
        medicine: number | undefined;
        compass: number | undefined;
        charm: number | undefined;
        alien_alloy: number | undefined;
        waterskin: number | undefined;
        cask: number | undefined;
        water_tank: number | undefined;
        rucksack: number | undefined;
        wagon: number | undefined;
        convoy: number | undefined;
        l_armou: number | undefined;
        i_armour: number | undefined;
        s_armour: number | undefined;
        trap: number | undefined;
        cart: number | undefined;
        hut: number | undefined;
        lodge: number | undefined;
        trading_post: number | undefined;
        tannery: number | undefined;
        smokehouse: number | undefined;
        workshop: number | undefined;
        steelworks: number | undefined;
        armoury: number | undefined;
    };
    buildings: {
        trap: number;
        cart: number;
        hut: number;
        lodge: number;
        trading_post: number;
        tannery: number;
        smokehouse: number;
        workshop: number;
        steelworks: number;
        armoury: number;
        sulphur_mine: number;
        iron_mine: number;
        coal_mine: number;
    };
    population: {
        value: number;
    };
    workers: {
        sulphur_miner: number;
        hunter: number;
        trapper: number;
        charcutier: number;
        iron_miner: number;
        coal_miner: number;
        armourer: number;
        tanner: number;
        steelworker: number;
    };
    city: {
        cleared: boolean;
    };
    world: {
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
    };
    spaceShip: {
        hull: number;
        thrusters: number;
        seenShip: boolean;
        seenWarning: boolean;
    };
    outside: {
        seenForest: boolean;
    };
}>, import("redux").AnyAction>;
export default _default;
export declare const actions: {
    fire: {
        changeFire: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../../..").FireStatus, string>;
    };
    builder: import("@reduxjs/toolkit").CaseReducerActions<{
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
    temperature: import("@reduxjs/toolkit").CaseReducerActions<{
        change(state: import("immer/dist/internal").WritableDraft<{
            status: {
                value: number;
                text: string;
            };
        }>, action: {
            payload: import("../../..").TemperatureStatus;
            type: string;
        }): void;
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
    thieves: import("@reduxjs/toolkit").CaseReducerActions<{
        change(_: number, action: {
            payload: any;
            type: string;
        }): any;
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
    stolen: import("@reduxjs/toolkit").CaseReducerActions<{
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
    buildings: import("@reduxjs/toolkit").CaseReducerActions<{
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
    population: import("@reduxjs/toolkit").CaseReducerActions<{
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
    workers: import("@reduxjs/toolkit").CaseReducerActions<{
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
    city: import("@reduxjs/toolkit").CaseReducerActions<{
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
    world: {
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
        add: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
        setM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
            [key: string]: any;
        }, string>;
        addM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
            [key: string]: any;
        }, string>;
    };
    spaceShip: import("@reduxjs/toolkit").CaseReducerActions<{
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
    outside: import("@reduxjs/toolkit").CaseReducerActions<{
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
};
