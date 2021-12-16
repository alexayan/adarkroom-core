import Engine from './engine';
import GameModule from './module';
import './operations/ship';
export default class Ship extends GameModule {
    constructor(engine: Engine);
    onArrival(): void;
    getMaxHull(): number;
    liftOff(): void;
}
