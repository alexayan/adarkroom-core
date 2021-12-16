import Engine from "./engine";
export default class GameModule {
    engine: Engine;
    constructor(engine: Engine);
    onArrival(): void;
    clean(): void;
}
