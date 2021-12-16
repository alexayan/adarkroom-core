import { Event, Scene, StoreCategory, CombatLootItem } from '../type';
import GlobalEvents from './global';
import RoomEvents from './room';
import OutsideEvents from './outside';
import MarketEvents from './marketing';
import Engine from '../engine';
import GameModule from '../module';
import '../operations/combat';
import '../operations/events';
export default class Events extends GameModule {
    eventPool: {
        [key: string]: Event[];
    };
    eventMap: {
        Global: typeof GlobalEvents;
        Room: typeof RoomEvents;
        Outside: typeof OutsideEvents;
        Market: typeof MarketEvents;
    };
    private _enemyAttackTimer;
    constructor(engine: Engine);
    winFight(): void;
    getHitChance(): number;
    doHeal(cost: StoreCategory, heal: number): Promise<boolean>;
    getCurrentSpaceEventsPool(): Event[];
    triggerEvent(): void;
    startEvent(event: Event): Promise<void>;
    loadScene(sceneName: string): Promise<void>;
    addEvent(space: string, event: Event): void;
    startCombat(scene: Scene): void;
    startStory(scene: Scene): void;
    enemyAttack(): Promise<void>;
    damageEnemy(dmg: any, weapon: any): Promise<void>;
    damageAdventurer(_: any, dmg: any): void;
    setRandomLoots(lootList?: {
        [key in StoreCategory]?: CombatLootItem;
    }): void;
    triggerFight(): void;
    scheduleNextEvent(scale?: number): void;
    saveDelay(action: (engine: Engine) => any, stateName: string, delay?: number): void;
    clean(): void;
    recallDelay(stateName: string, target: any): void;
    initDelay(): void;
    getActiveScene(): import("../type").NormalScene | import("../type").CombatScene | null;
    getActiveEvent(): Event | null;
    endEvent(): void;
}
