import Engine from './engine';
import GameModule from './module';

export default class Space extends GameModule {
  constructor(engine: Engine) {
    super(engine);
  }

  onArrival() {
    this.engine.endGame();
  }
}
