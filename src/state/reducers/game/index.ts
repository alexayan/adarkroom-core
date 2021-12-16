import { combineReducers } from '@reduxjs/toolkit';
import fire, { actions as fireActions } from './fire';
import builder, { actions as builderActions } from './builder';
import temperature, { actions as tempActions } from './temperature';
import thieves, { actions as thievesActions } from './thieves';
import stolen, { actions as stolenActions } from './stolen';
import buildings, { actions as buildingsActions } from './buildings';
import population, { actions as populationActions } from './population';
import workers, { actions as workersActioins } from './workers';
import city, { actions as cityActioins } from './city';
import world, { actions as worldActions } from './world';
import spaceShip, { actions as spaceShipActions } from './space_ship';
import outside, { actions as outsideActions } from './outside';

export default combineReducers({
  fire,
  builder,
  temperature,
  thieves,
  stolen,
  buildings,
  population,
  workers,
  city,
  world,
  spaceShip,
  outside,
});

export const actions = {
  fire: fireActions,
  builder: builderActions,
  temperature: tempActions,
  thieves: thievesActions,
  stolen: stolenActions,
  buildings: buildingsActions,
  population: populationActions,
  workers: workersActioins,
  city: cityActioins,
  world: worldActions,
  spaceShip: spaceShipActions,
  outside: outsideActions,
};
