import { GameState } from './state';
import Engine from './engine';
import config from './config';
export declare enum StoreCategory {
    wood = "wood",
    fur = "fur",
    meat = "meat",
    iron = "iron",
    coal = "coal",
    sulphur = "sulphur",
    steel = "steel",
    cured_meat = "cured_meat",
    scales = "scales",
    teeth = "teeth",
    leather = "leather",
    bait = "bait",
    torch = "torch",
    cloth = "cloth",
    bone_spear = "bone_spear",
    iron_sword = "iron_sword",
    steel_sword = "steel_sword",
    bayonet = "bayonet",
    rifle = "rifle",
    laser_rifle = "laser_rifle",
    bullets = "bullets",
    energy_cell = "energy_cell",
    grenade = "grenade",
    bolas = "bolas",
    medicine = "medicine",
    compass = "compass",
    charm = "charm",
    alien_alloy = "alien_alloy",
    waterskin = "waterskin",
    cask = "cask",
    water_tank = "water_tank",
    rucksack = "rucksack",
    wagon = "wagon",
    convoy = "convoy",
    l_armou = "l_armou",
    i_armour = "i_armour",
    s_armour = "s_armour",
    trap = "trap",
    cart = "cart",
    hut = "hut",
    lodge = "lodge",
    trading_post = "trading_post",
    tannery = "tannery",
    smokehouse = "smokehouse",
    workshop = "workshop",
    steelworks = "steelworks",
    armoury = "armoury"
}
export declare type CombatLootItem = {
    min: number;
    max: number;
    chance: number;
};
export declare type SceneButton = {
    text: string;
    cooldown?: number;
    nextScene?: {
        [key: string]: string;
    } | string;
    notification?: string;
    cost?: {
        [key in StoreCategory]?: number;
    };
    reward?: {
        [key in StoreCategory]?: number;
    };
    onClick?: (engine: Engine) => void;
    available?: (state: GameState, engine: Engine) => boolean;
    onChoose?: (engine: Engine) => void;
};
export declare type SceneReward = {
    [key in StoreCategory]?: number;
};
export declare type NormalScene = {
    [key: string]: any;
    text: string[];
    buttons: {
        [key: string]: SceneButton;
    };
    notification?: string;
    blink?: boolean;
    reward?: SceneReward;
    onLoad?: (engine: Engine) => void;
    audio?: any;
};
export declare type CombatScene = {
    [key: string]: any;
    combat: boolean;
    enemy: string;
    chara: string;
    damage: number;
    hit: number;
    attackDelay: number;
    health: number;
    loot: {
        [key in StoreCategory]?: CombatLootItem;
    };
    notification: string;
    plural?: boolean;
    enemyName?: string;
    deathMessage?: string;
    ranged?: boolean;
};
export declare type Scene = NormalScene | CombatScene;
export declare type Event = {
    title: string;
    isAvailable?: (state: GameState, engine: Engine) => boolean;
    scenes: {
        [key: string]: Scene;
    };
    id?: string;
};
export declare type Perk = {
    name: string;
    desc: string;
    notify: string;
};
export declare enum GameSpace {
    Room = "Room",
    Path = "Path",
    Outside = "Outside",
    World = "World",
    Ship = "Ship",
    Space = "Space"
}
export declare enum PerkCategory {
    boxer = "boxer",
    martial_artist = "martial_artist",
    unarmed_master = "unarmed_master",
    barbarian = "barbarian",
    slow_metabolism = "slow_metabolism",
    desert_rat = "desert_rat",
    evasive = "evasive",
    precise = "precise",
    scout = "scout",
    stealthy = "stealthy",
    gastronome = "gastronome"
}
export declare const Perks: {
    [key in PerkCategory]: Perk;
};
export declare enum Building {
    trap = "trap",
    cart = "cart",
    hut = "hut",
    lodge = "lodge",
    trading_post = "trading_post",
    tannery = "tannery",
    smokehouse = "smokehouse",
    workshop = "workshop",
    steelworks = "steelworks",
    armoury = "armoury",
    sulphur_mine = "sulphur_mine",
    iron_mine = "iron_mine",
    coal_mine = "coal_mine"
}
export declare enum Craftable {
    trap = "trap",
    cart = "cart",
    hut = "hut",
    lodge = "lodge",
    trading_post = "trading_post",
    tannery = "tannery",
    smokehouse = "smokehouse",
    workshop = "workshop",
    steelworks = "steelworks",
    armoury = "armoury",
    torch = "torch",
    waterskin = "waterskin",
    cask = "cask",
    water_tank = "water_tank",
    bone_spear = "bone_spear",
    rucksack = "rucksack",
    wagon = "wagon",
    convoy = "convoy",
    l_armou = "l_armou",
    i_armour = "i_armour",
    s_armour = "s_armour",
    iron_sword = "iron_sword",
    steel_sword = "steel_sword",
    rifle = "rifle"
}
declare enum NonCraftable {
    medicine = "medicine",
    charm = "charm",
    bayonet = "bayonet",
    bolas = "bolas",
    grenade = "grenade",
    bullets = "bullets",
    cured_meat = "cured_meat",
    laser_rifle = "laser_rifle",
    energy_cell = "energy_cell"
}
export declare type Carryable = Craftable | NonCraftable;
export declare enum WorkerType {
    sulphur_miner = "sulphur_miner",
    hunter = "hunter",
    trapper = "trapper",
    charcutier = "charcutier",
    iron_miner = "iron_miner",
    coal_miner = "coal_miner",
    armourer = "armourer",
    tanner = "tanner",
    steelworker = "steelworker"
}
export declare const incomes: {
    gatherer: {
        name: string;
        delay: number;
        stores: {
            wood: number;
        };
    };
    hunter: {
        name: string;
        delay: number;
        stores: {
            fur: number;
            meat: number;
        };
    };
    trapper: {
        name: string;
        delay: number;
        stores: {
            meat: number;
            bait: number;
        };
    };
    tanner: {
        name: string;
        delay: number;
        stores: {
            fur: number;
            leather: number;
        };
    };
    charcutier: {
        name: string;
        delay: number;
        stores: {
            meat: number;
            wood: number;
            cured_meat: number;
        };
    };
    iron_miner: {
        name: string;
        delay: number;
        stores: {
            cured_meat: number;
            iron: number;
        };
    };
    coal_miner: {
        name: string;
        delay: number;
        stores: {
            cured_meat: number;
            coal: number;
        };
    };
    sulphur_miner: {
        name: string;
        delay: number;
        stores: {
            cured_meat: number;
            sulphur: number;
        };
    };
    steelworker: {
        name: string;
        delay: number;
        stores: {
            iron: number;
            coal: number;
            steel: number;
        };
    };
    armourer: {
        name: string;
        delay: number;
        stores: {
            steel: number;
            sulphur: number;
            bullets: number;
        };
    };
};
export declare type incomeType = keyof typeof incomes;
export declare type FireStatus = typeof config.Room.FireStatus[keyof typeof config.Room.FireStatus];
export declare type TemperatureStatus = typeof config.Room.TemperatureStatus[keyof typeof config.Room.TemperatureStatus];
export declare type Income = {
    delay: number;
    stores: {
        [key in StoreCategory]: number;
    };
    timeLeft?: number;
};
export declare type GameItem = {
    name: string;
    type?: string;
    desc?: string;
    craft?: {
        maximum?: number;
        availableMsg?: string;
        buildMsg?: string;
        maxMsg?: string;
        type: string;
        cost: (state: any) => {
            [key: string]: number;
        };
    };
    trade?: {
        type: string;
        maximum?: number;
        tradeMsg?: string;
        cost: () => {
            [key: string]: number;
        };
    };
    weapon?: {
        verb: string;
        type: string;
        damage: number | string;
        cooldown: number;
        cost?: {
            [key: string]: number;
        };
    };
};
export {};
