import { StoreCategory, GameItem } from './type';
export declare enum CraftableCategory {
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
    l_armour = "l_armour",
    i_armour = "i_armour",
    s_armour = "s_armour",
    iron_sword = "iron_sword",
    steel_sword = "steel_sword",
    rifle = "rifle"
}
export declare enum TradeCategory {
    scales = "scales",
    teeth = "teeth",
    iron = "iron",
    coal = "coal",
    steel = "steel",
    medicine = "medicine",
    bullets = "bullets",
    energy_cell = "energy_cell",
    bolas = "bolas",
    grenade = "grenade",
    bayonet = "bayonet",
    alien_alloy = "alien_alloy",
    compass = "compass"
}
export declare enum NonCraftableCategory {
    cured_meat = "cured_meat",
    bullets = "bullets",
    grenade = "grenade",
    bolas = "bolas",
    laser_rifle = "laser_rifle",
    energy_cell = "energy_cell",
    bayonet = "bayonet",
    charm = "charm",
    medicine = "medicine"
}
export declare enum WeaponCategory {
    fists = "fists",
    bone_spear = "bone_spear",
    iron_sword = "iron_sword",
    steel_sword = "steel_sword",
    bayonet = "bayonet",
    rifle = "rifle",
    laser_rifle = "laser_rifle",
    grenade = "grenade",
    bolas = "bolas"
}
declare const _default: {
    items: {
        [key: string]: GameItem;
    };
    Engine: {
        VERSION: number;
        MAX_STORE: number;
        SAVE_DISPLAY: number;
    };
    World: {
        name: string;
        RADIUS: number;
        VILLAGE_POS: number[];
        TILE: {
            VILLAGE: string;
            IRON_MINE: string;
            COAL_MINE: string;
            SULPHUR_MINE: string;
            FOREST: string;
            FIELD: string;
            BARRENS: string;
            ROAD: string;
            HOUSE: string;
            CAVE: string;
            TOWN: string;
            CITY: string;
            OUTPOST: string;
            SHIP: string;
            BOREHOLE: string;
            BATTLEFIELD: string;
            SWAMP: string;
            CACHE: string;
        };
        TILE_PROBS: {
            [x: string]: number;
        };
        LANDMARKS: {
            [x: string]: {
                num: number;
                minRadius: number;
                maxRadius: number;
                scene: string;
                label: string;
            };
        };
        STICKINESS: number;
        LIGHT_RADIUS: number;
        BASE_WATER: number;
        MOVES_PER_FOOD: number;
        MOVES_PER_WATER: number;
        DEATH_COOLDOWN: number;
        FIGHT_CHANCE: number;
        BASE_HEALTH: number;
        BASE_HIT_CHANCE: number;
        MEAT_HEAL: number;
        MEDS_HEAL: number;
        FIGHT_DELAY: number;
        NORTH: number[];
        SOUTH: number[];
        WEST: number[];
        EAST: number[];
    };
    Room: {
        name: string;
        FIRE_COOL_DELAY: number;
        ROOM_WARM_DELAY: number;
        BUILDER_STATE_DELAY: number;
        STOKE_COOLDOWN: number;
        NEED_WOOD_DELAY: number;
        MiscItems: string[];
        FireStatus: {
            Dead: {
                status: string;
                value: number;
                text: string;
            };
            Smoldering: {
                status: string;
                value: number;
                text: string;
            };
            Flickering: {
                status: string;
                value: number;
                text: string;
            };
            Burning: {
                status: string;
                value: number;
                text: string;
            };
            Roaring: {
                status: string;
                value: number;
                text: string;
            };
        };
        TemperatureStatus: {
            Freezing: {
                value: number;
                text: string;
            };
            Cold: {
                value: number;
                text: string;
            };
            Mild: {
                value: number;
                text: string;
            };
            Warm: {
                value: number;
                text: string;
            };
            Hot: {
                value: number;
                text: string;
            };
        };
    };
    Event: {
        EVENT_TIME_RANGE: number[];
        PANEL_FADE: number;
        FIGHT_SPEED: number;
        EAT_COOLDOWN: number;
        MEDS_COOLDOWN: number;
        LEAVE_COOLDOWN: number;
        STUN_DURATION: number;
    };
    Outside: {
        name: string;
        STORES_OFFSET: number;
        GATHER_DELAY: number;
        TRAPS_DELAY: number;
        POP_DELAY: number[];
        HUT_ROOM: number;
        INCOME: {
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
        TrapDrops: {
            rollUnder: number;
            name: string;
            message: string;
        }[];
    };
    Path: {
        DEFAULT_BAG_SPACE: number;
        STORES_OFFSET: number;
        Weight: {
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
        };
        name: string;
        Outfit: string[];
    };
    Ship: {
        LIFTOFF_COOLDOWN: number;
        ALLOY_PER_HULL: number;
        ALLOY_PER_THRUSTER: number;
        BASE_HULL: number;
        BASE_THRUSTERS: number;
        name: string;
    };
    Space: {
        SHIP_SPEED: number;
        BASE_ASTEROID_DELAY: number;
        BASE_ASTEROID_SPEED: number;
        FTB_SPEED: number;
        STAR_WIDTH: number;
        STAR_HEIGHT: number;
        NUM_STARS: number;
        STAR_SPEED: number;
        FRAME_DELAY: number;
    };
    Prestige: {
        storesMap: {
            store: StoreCategory;
            type: string;
        }[];
    };
};
export default _default;
