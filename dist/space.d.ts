import Engine from './engine';
import GameModule from './module';
export default class Space extends GameModule {
    constructor(engine: Engine);
    onArrival(): void;
}
