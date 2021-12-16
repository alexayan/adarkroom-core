/// <reference types="node" />
import { GameSpace, StoreCategory } from './type';
import { GameState, Store } from './state';
import Events from './events';
import World from './world';
import Room from './room';
import Path from './path';
import Ship from './ship';
import Space from './space';
import Outside from './outside';
import Prestige from './prestige';
import { OperationExecutor } from './operations';
import './operations/engine';
export declare type EngineOptions = {
    state?: GameState;
    debug?: boolean;
    doubleTime?: boolean;
};
declare class Engine {
    GAME_OVER: boolean;
    options: EngineOptions;
    actions: {
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
                changeFire: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("./type").FireStatus, string>;
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
                    payload: import("./type").TemperatureStatus;
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
            changeSpace: import("@reduxjs/toolkit").AsyncThunk<GameSpace, GameSpace, {}>;
            changeSubSpace: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
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
                addPerk: import("@reduxjs/toolkit").AsyncThunk<import("./type").PerkCategory, import("./type").PerkCategory, {}>;
            };
            statistics: {
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
            cleanEnemys: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
            logFight: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
                time: number;
                target: string;
                type: string;
                meta?: any;
                id?: string | undefined;
            }, string>;
            push: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
            setSceneEnemy: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("./type").Scene, string>;
            winFight: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
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
        notifications: {
            notify: import("@reduxjs/toolkit").AsyncThunk<import("./state/reducers/notifications").Notification | null, {
                message: import("./state/reducers/notifications").Notification;
                noQueue?: boolean | undefined;
            }, {}>;
            spaceNotify: import("@reduxjs/toolkit").ActionCreatorWithPayload<GameSpace, string>;
        };
        previous: {
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
            setM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
                [key: string]: any;
            }, string>;
            addM: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
                [key: string]: any;
            }, string>;
        };
        operation: {
            record: import("@reduxjs/toolkit").AsyncThunk<import("./operations").OptHistory, import("./operations").Operation, {
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
                        activeSpace?: GameSpace | undefined;
                        activeSubSpace: string;
                    };
                    income: {
                        thieves?: import("./type").Income | undefined;
                        builder?: import("./type").Income | undefined;
                        gatherer?: import("./type").Income | undefined;
                        hunter?: import("./type").Income | undefined;
                        trapper?: import("./type").Income | undefined;
                        tanner?: import("./type").Income | undefined;
                        charcutier?: import("./type").Income | undefined;
                        iron_miner?: import("./type").Income | undefined;
                        coal_miner?: import("./type").Income | undefined;
                        sulphur_miner?: import("./type").Income | undefined;
                        steelworker?: import("./type").Income | undefined;
                        armourer?: import("./type").Income | undefined;
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
                        fightEvents: {
                            time: number;
                            target: string;
                            type: string;
                            meta?: any;
                            id?: string | undefined;
                        }[];
                    };
                    notifications: {
                        notifyQueue: {
                            [key: string]: import("./state/reducers/notifications").Notification[];
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
                        [operationId: string]: import("./operations").OptHistory;
                    };
                }>;
                extra: {
                    engine: Engine;
                };
            }>;
            clearCooldown: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
        };
    };
    store?: Store;
    spaces: {
        [GameSpace.World]: World;
        [GameSpace.Room]: Room;
        [GameSpace.Outside]: Outside;
        [GameSpace.Path]: Path;
        [GameSpace.Ship]: Ship;
        [GameSpace.Space]: Space;
    };
    events: Events;
    prestige: Prestige;
    operationExecutor: OperationExecutor;
    paused: boolean;
    constructor(options?: EngineOptions);
    notify(text: string, space?: GameSpace, noQueue?: boolean): void;
    dispatch(action: any): Promise<any>;
    operation(operationId: string, data: any): Promise<any>;
    operations(): {
        name: string;
        desc?: string | undefined;
        id: string;
        help?: {
            [key: string]: any;
            desc: string;
            parms?: string[][] | undefined;
        } | undefined;
        history?: import("./operations").OptHistory | undefined;
        cooldown: number;
        meta?: any;
    }[];
    startGame(state?: GameState): void;
    clean(): void;
    endGame(): void;
    addToStore(toAdd: {
        [key in StoreCategory]?: number;
    }): void;
    setToStore(toSet: {
        [key in StoreCategory]?: number;
    }): void;
    observer<T>(select: (state: GameState) => T, onChange: (arg0: T) => any): import("redux").Unsubscribe;
    getIncome(source: string): any;
    setIncome(source: string, options: any): void;
    pauseGame(): void;
    continueGame(): void;
    saveGame(): void;
    getActionSpace(): GameSpace | undefined;
    getState(): import("redux").CombinedState<{
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
            activeSpace?: GameSpace | undefined;
            activeSubSpace: string;
        };
        income: {
            thieves?: import("./type").Income | undefined;
            builder?: import("./type").Income | undefined;
            gatherer?: import("./type").Income | undefined;
            hunter?: import("./type").Income | undefined;
            trapper?: import("./type").Income | undefined;
            tanner?: import("./type").Income | undefined;
            charcutier?: import("./type").Income | undefined;
            iron_miner?: import("./type").Income | undefined;
            coal_miner?: import("./type").Income | undefined;
            sulphur_miner?: import("./type").Income | undefined;
            steelworker?: import("./type").Income | undefined;
            armourer?: import("./type").Income | undefined;
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
            fightEvents: {
                time: number;
                target: string;
                type: string;
                meta?: any;
                id?: string | undefined;
            }[];
        };
        notifications: {
            notifyQueue: {
                [key: string]: import("./state/reducers/notifications").Notification[];
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
            [operationId: string]: import("./operations").OptHistory;
        };
    }>;
    switchLanguage(): void;
    travelTo(space: GameSpace, force?: boolean): Promise<void>;
    travelToSubSpace(space: string): Promise<void>;
    getGuid(): string;
    setTimeout(callback: () => any, timeout: number, skipDouble?: boolean): NodeJS.Timeout;
    setInterval(callback: () => any, interval: number, skipDouble?: boolean): NodeJS.Timer;
    loadGame(state?: GameState): void;
    _incomeTimeout: any;
    collectIncome(): void;
    addStolen(stores: any): void;
}
export default Engine;
