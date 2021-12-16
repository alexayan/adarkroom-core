export declare const reducer: import("redux").Reducer<import("redux").CombinedState<{
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
        activeSpace?: import("../..").GameSpace | undefined;
    };
    income: {
        thieves?: import("../..").Income | undefined;
        builder?: import("../..").Income | undefined;
        gatherer?: import("../..").Income | undefined;
        hunter?: import("../..").Income | undefined;
        trapper?: import("../..").Income | undefined;
        tanner?: import("../..").Income | undefined;
        charcutier?: import("../..").Income | undefined;
        iron_miner?: import("../..").Income | undefined;
        coal_miner?: import("../..").Income | undefined;
        sulphur_miner?: import("../..").Income | undefined;
        steelworker?: import("../..").Income | undefined;
        armourer?: import("../..").Income | undefined;
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
            [key: string]: import("./notifications").Notification[];
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
        [operationId: string]: import("../../operations").OptHistory;
    };
}>, import("redux").AnyAction>;
export declare const actions: {
    config: import("@reduxjs/toolkit").CaseReducerActions<{
        changeHyperMode(state: import("immer/dist/internal").WritableDraft<{
            hyperMode: boolean;
            soundOn: boolean;
        }>, action: {
            payload: boolean;
            type: string;
        }): void;
        changeSound(state: import("immer/dist/internal").WritableDraft<{
            hyperMode: boolean;
            soundOn: boolean;
        }>, action: {
            payload: boolean;
            type: string;
        }): void;
    }>;
    stores: import("@reduxjs/toolkit").CaseReducerActions<{
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
    game: {
        fire: {
            changeFire: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../..").FireStatus, string>;
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
                payload: import("../..").TemperatureStatus;
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
    engine: {
        changeSpace: import("@reduxjs/toolkit").AsyncThunk<import("../..").GameSpace, import("../..").GameSpace, {}>;
    };
    income: import("@reduxjs/toolkit").CaseReducerActions<{
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
    character: {
        perks: {
            addPerk: import("@reduxjs/toolkit").AsyncThunk<import("../..").PerkCategory, import("../..").PerkCategory, {}>;
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
    marketing: import("@reduxjs/toolkit").CaseReducerActions<{
        changePenrose(state: import("immer/dist/internal").WritableDraft<{
            penrose: boolean;
        }>, action: {
            payload: any;
            type: string;
        }): void;
    }>;
    events: {
        end: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
        push: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
        setSceneEnemy: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../..").Scene, string>;
        winFight: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
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
    notifications: {
        notify: import("@reduxjs/toolkit").AsyncThunk<import("./notifications").Notification | null, {
            message: import("./notifications").Notification;
            noQueue?: boolean | undefined;
        }, {}>;
        spaceNotify: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../..").GameSpace, string>;
    };
    previous: {
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
    features: {
        location: import("@reduxjs/toolkit").CaseReducerActions<{
            enableOutside(state: import("immer/dist/internal").WritableDraft<{
                Outside: boolean;
                Room: boolean;
                Ship: boolean;
                World: boolean;
                Path: boolean;
            }>): void;
            enableRoom(state: import("immer/dist/internal").WritableDraft<{
                Outside: boolean;
                Room: boolean;
                Ship: boolean;
                World: boolean;
                Path: boolean;
            }>): void;
            enableSpaceShip(state: import("immer/dist/internal").WritableDraft<{
                Outside: boolean;
                Room: boolean;
                Ship: boolean;
                World: boolean;
                Path: boolean;
            }>): void;
            enableWorld(state: import("immer/dist/internal").WritableDraft<{
                Outside: boolean;
                Room: boolean;
                Ship: boolean;
                World: boolean;
                Path: boolean;
            }>): void;
            enablePath(state: import("immer/dist/internal").WritableDraft<{
                Outside: boolean;
                Room: boolean;
                Ship: boolean;
                World: boolean;
                Path: boolean;
            }>): void;
        }>;
    };
    room: import("@reduxjs/toolkit").CaseReducerActions<{
        setChanged(state: import("immer/dist/internal").WritableDraft<{
            changed: boolean;
            crafts: {
                [key: string]: boolean;
            };
            buys: {
                [key: string]: boolean;
            };
        }>, action: {
            payload: boolean;
            type: string;
        }): void;
        addCraft(state: import("immer/dist/internal").WritableDraft<{
            changed: boolean;
            crafts: {
                [key: string]: boolean;
            };
            buys: {
                [key: string]: boolean;
            };
        }>, action: {
            payload: {
                name: string;
            };
            type: string;
        }): void;
        addBuy(state: import("immer/dist/internal").WritableDraft<{
            changed: boolean;
            crafts: {
                [key: string]: boolean;
            };
            buys: {
                [key: string]: boolean;
            };
        }>, action: {
            payload: {
                name: string;
            };
            type: string;
        }): void;
    }>;
    path: {
        outfit: import("@reduxjs/toolkit").CaseReducerActions<{
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
    };
    delay: {
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
    operation: {
        record: import("@reduxjs/toolkit").AsyncThunk<import("../../operations").OptHistory, import("../../operations").Operation, {
            state: import("redux").CombinedState<{
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
                    activeSpace?: import("../..").GameSpace | undefined;
                };
                income: {
                    thieves?: import("../..").Income | undefined;
                    builder?: import("../..").Income | undefined;
                    gatherer?: import("../..").Income | undefined;
                    hunter?: import("../..").Income | undefined;
                    trapper?: import("../..").Income | undefined;
                    tanner?: import("../..").Income | undefined;
                    charcutier?: import("../..").Income | undefined;
                    iron_miner?: import("../..").Income | undefined;
                    coal_miner?: import("../..").Income | undefined;
                    sulphur_miner?: import("../..").Income | undefined;
                    steelworker?: import("../..").Income | undefined;
                    armourer?: import("../..").Income | undefined;
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
                        [key: string]: import("./notifications").Notification[];
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
                    [operationId: string]: import("../../operations").OptHistory;
                };
            }>;
            extra: {
                engine: import("../../engine").default;
            };
        }>;
        clearCooldown: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    };
};
