import { reducer } from './reducers';
import { Middleware } from '@reduxjs/toolkit';
import Engine from '../engine';
declare function createState(engine: Engine, state?: GameState): import("@reduxjs/toolkit").EnhancedStore<import("redux").CombinedState<{
    room: {
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    };
    marketing: {
        penrose: boolean;
    };
    config: {
        hyperMode: boolean;
        soundOn: boolean;
    };
    features: import("redux").CombinedState<{
        location: any;
    }>;
    stores: {
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
    game: import("redux").CombinedState<{
        fire: any;
        builder: any;
        temperature: any;
        thieves: any;
        stolen: any;
        buildings: any;
        population: any;
        workers: any;
        city: any;
        world: any;
        spaceShip: any;
        outside: any;
    }>;
    engine: {
        activeSpace?: import("..").GameSpace | undefined;
    };
    income: {
        thieves?: import("..").Income | undefined;
        builder?: import("..").Income | undefined;
        gatherer?: import("..").Income | undefined;
        hunter?: import("..").Income | undefined;
        trapper?: import("..").Income | undefined;
        tanner?: import("..").Income | undefined;
        charcutier?: import("..").Income | undefined;
        iron_miner?: import("..").Income | undefined;
        coal_miner?: import("..").Income | undefined;
        sulphur_miner?: import("..").Income | undefined;
        steelworker?: import("..").Income | undefined;
        armourer?: import("..").Income | undefined;
    };
    character: import("redux").CombinedState<{
        perks: any;
        statistics: any;
    }>;
    events: {
        [key: string]: any;
        eventStack: string[];
        activeScene: string;
        delay: {
            [key: string]: number;
        };
        loot: {
            [key: string]: number;
        };
        enemys: {
            chara: string;
            health: number;
            maxHealth: number;
            stunned: number;
        }[];
        won: boolean;
    };
    notifications: {
        notifyQueue: {
            [key: string]: import("./reducers/notifications").Notification[];
        };
    };
    previous: {
        stores: never[];
        score: number;
    };
    path: import("redux").CombinedState<{
        outfit: any;
    }>;
    delay: {
        [key: string]: any;
    };
    operation: {
        [operationId: string]: import("../operations").OptHistory;
    };
}>, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>> | Middleware<{}, import("redux").CombinedState<{
    room: {
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    };
    marketing: {
        penrose: boolean;
    };
    config: {
        hyperMode: boolean;
        soundOn: boolean;
    };
    features: import("redux").CombinedState<{
        location: any;
    }>;
    stores: {
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
    game: import("redux").CombinedState<{
        fire: any;
        builder: any;
        temperature: any;
        thieves: any;
        stolen: any;
        buildings: any;
        population: any;
        workers: any;
        city: any;
        world: any;
        spaceShip: any;
        outside: any;
    }>;
    engine: {
        activeSpace?: import("..").GameSpace | undefined;
    };
    income: {
        thieves?: import("..").Income | undefined;
        builder?: import("..").Income | undefined;
        gatherer?: import("..").Income | undefined;
        hunter?: import("..").Income | undefined;
        trapper?: import("..").Income | undefined;
        tanner?: import("..").Income | undefined;
        charcutier?: import("..").Income | undefined;
        iron_miner?: import("..").Income | undefined;
        coal_miner?: import("..").Income | undefined;
        sulphur_miner?: import("..").Income | undefined;
        steelworker?: import("..").Income | undefined;
        armourer?: import("..").Income | undefined;
    };
    character: import("redux").CombinedState<{
        perks: any;
        statistics: any;
    }>;
    events: {
        [key: string]: any;
        eventStack: string[];
        activeScene: string;
        delay: {
            [key: string]: number;
        };
        loot: {
            [key: string]: number;
        };
        enemys: {
            chara: string;
            health: number;
            maxHealth: number;
            stunned: number;
        }[];
        won: boolean;
    };
    notifications: {
        notifyQueue: {
            [key: string]: import("./reducers/notifications").Notification[];
        };
    };
    previous: {
        stores: never[];
        score: number;
    };
    path: import("redux").CombinedState<{
        outfit: any;
    }>;
    delay: {
        [key: string]: any;
    };
    operation: {
        [operationId: string]: import("../operations").OptHistory;
    };
}>, import("redux").Dispatch<import("redux").AnyAction>> | import("redux-thunk").ThunkMiddleware<import("redux").CombinedState<{
    room: {
        changed: boolean;
        crafts: {
            [key: string]: boolean;
        };
        buys: {
            [key: string]: boolean;
        };
    };
    marketing: {
        penrose: boolean;
    };
    config: {
        hyperMode: boolean;
        soundOn: boolean;
    };
    features: import("redux").CombinedState<{
        location: any;
    }>;
    stores: {
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
    game: import("redux").CombinedState<{
        fire: any;
        builder: any;
        temperature: any;
        thieves: any;
        stolen: any;
        buildings: any;
        population: any;
        workers: any;
        city: any;
        world: any;
        spaceShip: any;
        outside: any;
    }>;
    engine: {
        activeSpace?: import("..").GameSpace | undefined;
    };
    income: {
        thieves?: import("..").Income | undefined;
        builder?: import("..").Income | undefined;
        gatherer?: import("..").Income | undefined;
        hunter?: import("..").Income | undefined;
        trapper?: import("..").Income | undefined;
        tanner?: import("..").Income | undefined;
        charcutier?: import("..").Income | undefined;
        iron_miner?: import("..").Income | undefined;
        coal_miner?: import("..").Income | undefined;
        sulphur_miner?: import("..").Income | undefined;
        steelworker?: import("..").Income | undefined;
        armourer?: import("..").Income | undefined;
    };
    character: import("redux").CombinedState<{
        perks: any;
        statistics: any;
    }>;
    events: {
        [key: string]: any;
        eventStack: string[];
        activeScene: string;
        delay: {
            [key: string]: number;
        };
        loot: {
            [key: string]: number;
        };
        enemys: {
            chara: string;
            health: number;
            maxHealth: number;
            stunned: number;
        }[];
        won: boolean;
    };
    notifications: {
        notifyQueue: {
            [key: string]: import("./reducers/notifications").Notification[];
        };
    };
    previous: {
        stores: never[];
        score: number;
    };
    path: import("redux").CombinedState<{
        outfit: any;
    }>;
    delay: {
        [key: string]: any;
    };
    operation: {
        [operationId: string]: import("../operations").OptHistory;
    };
}>, import("redux").AnyAction, {
    engine: Engine;
}>>>;
export declare type Store = ReturnType<typeof createState>;
export declare type GameState = ReturnType<typeof reducer>;
export { actions } from './reducers';
export default createState;
