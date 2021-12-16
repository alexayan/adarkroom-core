import { GameState } from '../state';
import _ from 'lodash';

export default function getNumGatherers(state: GameState) {
  let num = state.game.population.value;
  for (let k in state.game.workers) {
    num -= _.get(state.game.workers, k, 0);
  }
  return num;
}
