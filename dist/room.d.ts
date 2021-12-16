import Engine from './engine';
import { StoreCategory, Building, FireStatus } from './type';
import { CraftableCategory } from './config';
import GameModule from './module';
import './operations/room';
export default class Room extends GameModule {
    _fireTimer: any;
    _tempTimer: any;
    _builderTimer: any;
    constructor(engine: Engine);
    coolFire(): void;
    onArrival(): void;
    canTrade(thing: Building | StoreCategory): boolean;
    buyUnlocked(thing: Building | StoreCategory): boolean;
    clean(): void;
    craftUnlocked(thing: CraftableCategory): boolean;
    adjustTemp(): void;
    onFireChange(fireStatus: FireStatus): void;
    updateBuilderState(): void;
    unlockForest(): void;
    startThieves(): void;
}
