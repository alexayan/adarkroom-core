import Engine from './engine';
import { GameSpace } from './type';
import GameModule from './module';
import './operations/ship';
import translate from './translate';
export default class Ship extends GameModule {
  constructor(engine: Engine) {
    super(engine);
  }

  onArrival() {
    const state = this.engine.getState();
    if (!state.game.spaceShip.seenShip) {
      this.engine.notify(
        translate('somewhere above the debris cloud, the wanderer fleet hovers. been on this rock too long.'),
        GameSpace.Ship
      );
      this.engine.dispatch(
        this.engine.actions.game.spaceShip.setM({
          seenShip: true,
        })
      );
    }
  }


  getMaxHull() {
    return this.engine.getState().game.spaceShip.hull || 0;
  }

  liftOff() {
    this.engine.travelTo(GameSpace.Space);
  }
}
