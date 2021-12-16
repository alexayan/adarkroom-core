import Engine from './engine';
import { WorkerType } from './type';
import GameModule from './module';
import './operations/outside';
import { Unsubscribe } from '@reduxjs/toolkit';
export default class Outside extends GameModule {
    _popTimeout: any;
    unsubBuilding: Unsubscribe;
    constructor(engine: Engine);
    onArrival(): void;
    increaseWorker(worker: WorkerType, count: number): void;
    getTitle(): string;
    decreaseWorker(worker: WorkerType, count: number): void;
    clean(): void;
    destroyHuts(count: number, allowEmpty?: boolean): Promise<{
        dead: number;
        destroyHut: number;
    }>;
    killVillagers(count: number): Promise<void>;
    getNumGatherers(): number;
    getMaxPopulation(): number;
    schedulePopIncrease(): void;
    increasePopulation(): void;
    enableBuildingWorker(): boolean;
    updateVillageIncome(): void;
}
