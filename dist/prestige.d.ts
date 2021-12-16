import Engine from './engine';
import GameModule from './module';
export default class Prestige extends GameModule {
    constructor(engine: Engine);
    collectStores(): void;
    save(): void;
    totalScore(): number;
    calculateScore(): number;
    getStores(reduce: boolean): number[];
    randGen(storeType: string): number;
}
