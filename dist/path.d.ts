import Engine from './engine';
import { StoreCategory } from './type';
import GameModule from './module';
import './operations/path';
export default class Path extends GameModule {
    constructor(engine: Engine);
    onArrival(): void;
    openPath(): Promise<void>;
    getWeight(thing: StoreCategory): number;
    getCapacity(): number;
    getFreeSpace(): number;
    updateOutfitting(): void;
    increaseSupply(supply: StoreCategory, count: number): Promise<number>;
    decreaseSupply(supply: StoreCategory, count: number): Promise<void>;
}
