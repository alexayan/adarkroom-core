import Engine from './engine';
import translate from './translate';
import config from './config';
import { GameSpace, PerkCategory, StoreCategory } from './type';
import _ from 'lodash';
import GameModule from './module';
import './operations/world'
export default class World extends GameModule {
  constructor(engine: Engine) {
    super(engine);

    const state = engine.store!.getState();

    if (state.previous.stores) {
      config.World.LANDMARKS[config.World.TILE.CACHE] = {
        num: 1,
        minRadius: 10,
        maxRadius: config.World.RADIUS * 1.5,
        scene: 'cache',
        label: translate('A&nbsp;Destroyed&nbsp;Village'),
      };
    }

    if (!state.features.location.Path) {
      const map = this.generateMap();
      const mask = this.newMask();
      const ship = this.mapSearch(config.World.TILE.SHIP, map, 1);
      let dir;
      if (ship) {
        dir = this.compassDir(ship[0]);
      }
      engine.dispatch(
        engine.actions.game.world.setM({
          map,
          mask,
          ship,
          dir,
        })
      );
      this.testMap();
    }
  }

  newMask() {
    const RADIUS = config.World.RADIUS;
    var mask = new Array(RADIUS * 2 + 1);
    for (var i = 0; i <= RADIUS * 2; i++) {
      mask[i] = new Array(RADIUS * 2 + 1);
    }
    this.lightMap(RADIUS, RADIUS, mask);
    return mask;
  }

  lightMap(x: number, y: number, mask: boolean[][]) {
    const state = this.engine.store?.getState();
    var r = config.World.LIGHT_RADIUS;
    r *= state?.character.perks.scout ? 2 : 1;
    this.uncoverMap(x, y, r, mask);
    return mask;
  }

  uncoverMap(x: number, y: number, r: number, mask: boolean[][]) {
    mask[x][y] = true;
    for (var i = -r; i <= r; i++) {
      for (var j = -r + Math.abs(i); j <= r - Math.abs(i); j++) {
        if (
          y + j >= 0 &&
          y + j <= config.World.RADIUS * 2 &&
          x + i <= config.World.RADIUS * 2 &&
          x + i >= 0
        ) {
          mask[x + i][y + j] = true;
        }
      }
    }
  }

  getTerrain() {
    const state = this.engine.getState();
    const curPos = state.game.world.curPos;
		return state.game.world.map[curPos[0]][curPos[1]];
	}

  markVisited(x: number, y: number) {
    this.engine.dispatch(this.engine.actions.game.world.visit({ x, y }));
  }

  clearDungeon() {
    const state = this.engine.getState();
    const curPos = state.game.world.curPos;
    this.engine.dispatch(
      this.engine.actions.game.world.setMap({
        pos: curPos,
        value: config.World.TILE.OUTPOST,
      })
    );
    this.drawRoad();
  }

  findClosestRoad(startPos: number[]) {
    const state = this.engine.getState();
    var searchX,
      searchY,
      dtmp,
      x = 0,
      y = 0,
      dx = 1,
      dy = -1;
    for (
      var i = 0;
      i < Math.pow(this.getDistance(startPos, config.World.VILLAGE_POS) + 2, 2);
      i++
    ) {
      searchX = startPos[0] + x;
      searchY = startPos[1] + y;
      if (
        0 < searchX &&
        searchX < config.World.RADIUS * 2 &&
        0 < searchY &&
        searchY < config.World.RADIUS * 2
      ) {
        // check for road
        var tile = state.game.world.map[searchX][searchY];
        if (
          tile === config.World.TILE.ROAD ||
          (tile === config.World.TILE.OUTPOST && !(x === 0 && y === 0)) || // outposts are connected to roads
          tile === config.World.TILE.VILLAGE // all roads lead home
        ) {
          return [searchX, searchY];
        }
      }
      if (x === 0 || y === 0) {
        // Turn the corner
        dtmp = dx;
        dx = -dy;
        dy = dtmp;
      }
      if (x === 0 && y <= 0) {
        x++;
      } else {
        x += dx;
        y += dy;
      }
    }
    return config.World.VILLAGE_POS;
  }

  drawRoad() {
    let { curPos, map } = this.engine.getState().game.world;
    map = _.cloneDeep(map);
    var closestRoad = this.findClosestRoad(curPos);
    var xDist = curPos[0] - closestRoad[0];
    var yDist = curPos[1] - closestRoad[1];
    var xDir = Math.abs(xDist) / xDist;
    var yDir = Math.abs(yDist) / yDist;
    var xIntersect, yIntersect;
    if (Math.abs(xDist) > Math.abs(yDist)) {
      xIntersect = closestRoad[0];
      yIntersect = closestRoad[1] + yDist;
    } else {
      xIntersect = closestRoad[0] + xDist;
      yIntersect = closestRoad[1];
    }

    for (var x = 0; x < Math.abs(xDist); x++) {
      if (this.isTerrain(map[closestRoad[0] + xDir * x][yIntersect])) {
        map[closestRoad[0] + xDir * x][yIntersect] = config.World.TILE.ROAD;
      }
    }
    for (var y = 0; y < Math.abs(yDist); y++) {
      if (this.isTerrain(map[xIntersect][closestRoad[1] + yDir * y])) {
        map[xIntersect][closestRoad[1] + yDir * y] = config.World.TILE.ROAD;
      }
    }
    this.engine.dispatch(
      this.engine.actions.game.world.setM({
        map,
      })
    );
  }

  getMaxHealth() {
    const state = this.engine.store!.getState();
    if (!!state.stores.s_armour) {
      return config.World.BASE_HEALTH + 35;
    } else if (!!state.stores.i_armour) {
      return config.World.BASE_HEALTH + 15;
    } else if (!!state.stores.l_armou) {
      return config.World.BASE_HEALTH + 5;
    }
    return config.World.BASE_HEALTH;
  }

  async applyMap() {
    const state = this.engine.store?.getState();
    if (!state?.game.world.seenAll) {
      var x,
        y,
        mask = state!.game.world.mask;
      do {
        x = Math.floor(Math.random() * (config.World.RADIUS * 2 + 1));
        y = Math.floor(Math.random() * (config.World.RADIUS * 2 + 1));
      } while (mask[x][y]);
      this.uncoverMap(x, y, 5, mask);
      await this.engine.dispatch(
        this.engine.actions.game.world.setM({
          mask,
        })
      );
    }
    this.testMap();
  }

  async testMap() {
    const state = this.engine.store?.getState();
    if (!state?.game.world.seenAll) {
      var dark;
      var mask = state!.game.world.mask;
      loop: for (var i = 0; i < mask.length; i++) {
        for (var j = 0; j < mask[i].length; j++) {
          if (!mask[i][j]) {
            dark = true;
            break loop;
          }
        }
      }
      await this.engine.store?.dispatch(
        this.engine.actions.game.world.seeAll(!dark)
      );
    }
  }

  onArrival() {
    this.engine.dispatch(
      this.engine.actions.game.world.setM({
        water: this.getMaxWater(),
        health: this.getMaxHealth(),
        foodMove: 0,
        waterMove: 0,
        starvation: false,
        thirst: false,
        usedOutposts: {},
        curPos: _.cloneDeep(config.World.VILLAGE_POS),
        dead: false,
      })
    );
  }

  setHp(hp: number) {
    this.engine.dispatch(
      this.engine.actions.game.world.setM({
        health: Math.min(hp, this.getMaxHealth()),
      })
    );
  }

  setWater(w: number) {
    let water = w;
    const maxWater = this.getMaxWater();
    if (water > maxWater) {
      water = maxWater;
    }
    this.engine.dispatch(
      this.engine.actions.game.world.setM({
        water,
      })
    );
  }

  moveSouth() {
    const curPos = this.engine.getState().game.world.curPos;
    if (curPos[1] < config.World.RADIUS * 2) {
      this.move(config.World.SOUTH);
    }
  }

  moveWest() {
    const curPos = this.engine.getState().game.world.curPos;
    if (curPos[0] > 0) {
      this.move(config.World.WEST);
    }
  }
  moveEast() {
    const curPos = this.engine.getState().game.world.curPos;
    if (curPos[0] < config.World.RADIUS * 2) {
      this.move(config.World.EAST);
    }
  }

  moveNorth() {
    const curPos = this.engine.getState().game.world.curPos;
    if (curPos[1] > 0) {
      this.move(config.World.NORTH);
    }
  }

  async move(direction: number[]) {
    let { map, mask, curPos, danger } = this.engine.getState().game.world;
    mask = _.cloneDeep(mask);
    curPos = _.cloneDeep(curPos);
    const oldTile = map[curPos[0]][curPos[1]];
    curPos[0] += direction[0];
    curPos[1] += direction[1];
    this.narrateMove(oldTile, map[curPos[0]][curPos[1]]);
    this.lightMap(curPos[0], curPos[1], mask);
    await this.engine.dispatch(
      this.engine.actions.game.world.setM({
        mask,
        curPos,
      })
    );
    await this.doSpace();

    // play random footstep
    if (this.checkDanger()) {
      if (danger) {
        this.engine.notify(
          translate('dangerous to be this far from the village without proper protection'),
          GameSpace.World
        );
      } else {
        this.engine.notify(translate('safer here'), GameSpace.World);
      }
    }
  }

  useOutpost() {
    this.engine.dispatch(this.engine.actions.game.world.useOutpost());
    this.setWater(this.getMaxWater());
    this.engine.notify(translate('water replenished'));
  }

  getMaxWater() {
    const state = this.engine.store!.getState();
    if (!!state.stores.water_tank) {
      return config.World.BASE_WATER + 50;
    } else if (!!state.stores.cask) {
      return config.World.BASE_WATER + 20;
    } else if (!!state.stores.waterskin) {
      return config.World.BASE_WATER + 10;
    }
    return config.World.BASE_WATER;
  }

  generateMap() {
    const RADIUS = config.World.RADIUS;
    var map = new Array(RADIUS * 2 + 1);
    for (var i = 0; i <= RADIUS * 2; i++) {
      map[i] = new Array(RADIUS * 2 + 1);
    }
    // The Village is always at the exact center
    // Spiral out from there
    map[RADIUS][RADIUS] = config.World.TILE.VILLAGE;
    for (var r = 1; r <= RADIUS; r++) {
      for (var t = 0; t < r * 8; t++) {
        var x, y;
        if (t < 2 * r) {
          x = RADIUS - r + t;
          y = RADIUS - r;
        } else if (t < 4 * r) {
          x = RADIUS + r;
          y = RADIUS - 3 * r + t;
        } else if (t < 6 * r) {
          x = RADIUS + 5 * r - t;
          y = RADIUS + r;
        } else {
          x = RADIUS - r;
          y = RADIUS + 7 * r - t;
        }

        map[x][y] = this.chooseTile(x, y, map);
      }
    }

    // Place landmarks
    for (var k in config.World.LANDMARKS) {
      var landmark = config.World.LANDMARKS[k];
      for (var l = 0; l < landmark.num; l++) {
        this.placeLandmark(landmark.minRadius, landmark.maxRadius, k, map);
      }
    }

    return map;
  }

  chooseTile(x: number, y: number, map: string[][]) {
    var adjacent = [
      y > 0 ? map[x][y - 1] : null,
      y < config.World.RADIUS * 2 ? map[x][y + 1] : null,
      x < config.World.RADIUS * 2 ? map[x + 1][y] : null,
      x > 0 ? map[x - 1][y] : null,
    ] as any[];

    var chances = {} as any;
    var nonSticky = 1;
    var cur;
    for (var i in adjacent) {
      if (adjacent[i] == config.World.TILE.VILLAGE) {
        // Village must be in a forest to maintain thematic consistency, yo.
        return config.World.TILE.FOREST;
      } else if (typeof adjacent[i] === 'string') {
        cur = chances[adjacent[i]];
        cur = typeof cur == 'number' ? cur : 0;
        chances[adjacent[i]] = cur + config.World.STICKINESS;
        nonSticky -= config.World.STICKINESS;
      }
    }
    for (var t in config.World.TILE) {
      var tile = (config.World.TILE as any)[t];
      if (this.isTerrain(tile)) {
        cur = chances[tile];
        cur = typeof cur == 'number' ? cur : 0;
        cur += config.World.TILE_PROBS[tile] * nonSticky;
        chances[tile] = cur;
      }
    }

    var list = [];
    for (var j in chances) {
      list.push(chances[j] + '' + j);
    }
    list.sort(function (a, b) {
      var n1 = parseFloat(a.substring(0, a.length - 1));
      var n2 = parseFloat(b.substring(0, b.length - 1));
      return n2 - n1;
    });

    var c = 0;
    var r = Math.random();
    for (var l in list) {
      var prob = list[l];
      c += parseFloat(prob.substring(0, prob.length - 1));
      if (r < c) {
        return prob.charAt(prob.length - 1);
      }
    }

    return config.World.TILE.BARRENS;
  }

  placeLandmark(
    minRadius: number,
    maxRadius: number,
    landmark: string,
    map: string[][]
  ) {
    var x = config.World.RADIUS,
      y = config.World.RADIUS;
    while (!this.isTerrain(map[x][y])) {
      var r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
      var xDist = Math.floor(Math.random() * r);
      var yDist = r - xDist;
      if (Math.random() < 0.5) xDist = -xDist;
      if (Math.random() < 0.5) yDist = -yDist;
      x = config.World.RADIUS + xDist;
      if (x < 0) x = 0;
      if (x > config.World.RADIUS * 2) x = config.World.RADIUS * 2;
      y = config.World.RADIUS + yDist;
      if (y < 0) y = 0;
      if (y > config.World.RADIUS * 2) y = config.World.RADIUS * 2;
    }
    map[x][y] = landmark;
    return [x, y];
  }

  isTerrain(tile: string) {
    return (
      tile == config.World.TILE.FOREST ||
      tile == config.World.TILE.FIELD ||
      tile == config.World.TILE.BARRENS
    );
  }

  mapSearch(target: string, map: any[][], required: number) {
    var max = config.World.LANDMARKS[target].num;
    if (!max) {
      // this restrict the research to numerable landmarks
      return null;
    }
    // restrict research if only a fixed number (usually 1) is required
    max = required ? Math.min(required, max) : max;
    var index = 0;
    var targets = [];
    const RADIUS = config.World.RADIUS;
    // label for coordinate research
    search: for (var i = 0; i <= RADIUS * 2; i++) {
      for (var j = 0; j <= RADIUS * 2; j++) {
        if (map[i][j].charAt(0) === target) {
          // search result is stored as an object;
          // items are listed as they appear in the map, tl-br
          // each item has relative coordinates and a compass-type direction
          targets[index] = {
            x: i - RADIUS,
            y: j - RADIUS,
          };
          index++;
          if (index === max) {
            // optimisation: stop the research if maximum number of items has been reached
            break search;
          }
        }
      }
    }
    return targets;
  }

  compassDir(pos: { x: number; y: number }) {
    let dir = '';
    const horz = pos.x < 0 ? 'west' : 'east';
    const vert = pos.y < 0 ? 'north' : 'south';
    if (Math.abs(pos.x) / 2 > Math.abs(pos.y)) {
      dir = horz;
    } else if (Math.abs(pos.y) / 2 > Math.abs(pos.x)) {
      dir = vert;
    } else {
      dir = vert + horz;
    }
    return dir;
  }

  async goHome() {
    const state = this.engine.getState();
    if (state.game.world.sulphurmine && !state.game.buildings.sulphur_mine) {
      this.engine.dispatch(
        this.engine.actions.game.buildings.addM({
          sulphur_mine: 1,
        })
      );
    }
    if (state.game.world.ironmine && !state.game.buildings.iron_mine) {
      this.engine.dispatch(
        this.engine.actions.game.buildings.addM({
          iron_mine: 1,
        })
      );
    }
    if (state.game.world.coalmine && !state.game.buildings.coal_mine) {
      this.engine.dispatch(
        this.engine.actions.game.buildings.addM({
          coal_mine: 1,
        })
      );
    }
    // if (state.game.world.ship && !state.features.location.Ship) {
    //   this.engine.dispatch(
    //     this.engine.actions.features.location.enableSpaceShip()
    //   );
    // }

    this.engine.dispatch(
      this.engine.actions.stores.addM(state.game.world.outfit)
    );

    this.engine.travelTo(GameSpace.Path);
  }

  getFreeSpace() {
    const state = this.engine.getState();
    let num = 0;
    for (let k in state.game.world.outfit) {
      const n = state.game.world.outfit[k] || 0;
      num += n * this.engine.spaces.Path.getWeight(k as StoreCategory);
    }
    return this.engine.spaces.Path.getCapacity() - num;
  }

  die() {
    const state = this.engine.getState();
    if (!state.game.world.dead) {
      this.engine.dispatch(
        this.engine.actions.game.world.setM({
          dead: true,
        })
      );
      // Dead! Discard any world changes and go home
      this.engine.notify(translate('the world fades'), GameSpace.World);
      this.engine.dispatch(this.engine.actions.path.outfit.empty());
      this.engine.travelTo(GameSpace.Room);
    }
  }

  checkFight() {
    const state = this.engine.getState();
    let fightMove = state.game.world.fightMove + 1;
    if (fightMove > config.World.FIGHT_DELAY) {
      var chance = config.World.FIGHT_CHANCE;
      chance *= state.character.perks.stealthy ? 0.5 : 1;
      if (Math.random() < chance) {
        fightMove = 0;
        this.engine.events.triggerFight();
      }
    }
    this.engine.dispatch(
      this.engine.actions.game.world.setM({
        fightMove,
      })
    );
  }

  narrateMove(oldTile: string, newTile: string) {
    var msg = null;
    switch (oldTile) {
      case config.World.TILE.FOREST:
        switch (newTile) {
          case config.World.TILE.FIELD:
            msg = translate('the trees yield to dry grass. the yellowed brush rustles in the wind.');
            break;
          case config.World.TILE.BARRENS:
            msg = translate('the trees are gone. parched earth and blowing dust are poor replacements.');
            break;
        }
        break;
      case config.World.TILE.FIELD:
        switch (newTile) {
          case config.World.TILE.FOREST:
            msg = translate('trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.');
            break;
          case config.World.TILE.BARRENS:
            msg = translate('the grasses thin. soon, only dust remains.');
            break;
        }
        break;
      case config.World.TILE.BARRENS:
        switch (newTile) {
          case config.World.TILE.FIELD:
            msg = translate('the barrens break at a sea of dying grass, swaying in the arid breeze.');
            break;
          case config.World.TILE.FOREST:
            msg = translate('a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.');
            break;
        }
        break;
    }
    if (msg != null) {
      this.engine.notify(msg, GameSpace.World);
    }
  }

  getDistance(from?: number[], to?: number[]) {
    if (!from) {
      from = this.engine.getState().game.world.curPos;
    }
    to = to || config.World.VILLAGE_POS;
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  }

  outpostUsed(x?: number, y?: number) {
    const { curPos, usedOutposts } = this.engine.getState().game.world;
    x = typeof x == 'number' ? x : curPos[0];
    y = typeof y == 'number' ? y : curPos[1];
    const used = usedOutposts[x + ',' + y];
    return used === true;
  }

  async useSupplies() {
    const state = this.engine.getState();
    let foodMove = state.game.world.foodMove + 1;
    let waterMove = state.game.world.waterMove + 1;
    const changed = {
      foodMove,
      waterMove,
    } as any;
    // Food
    let movesPerFood = config.World.MOVES_PER_FOOD;
    movesPerFood *= state.character.perks.slow_metabolism ? 2 : 1;
    if (foodMove >= movesPerFood) {
      foodMove = 0;
      changed.foodMove = 0;
      let num = state.game.world.outfit.cured_meat || 0;
      num--;
      if (num === 0) {
        this.engine.notify(translate('the meat has run out'), GameSpace.World);
      } else if (num < 0) {
        // Starvation! Hooray!
        num = 0;
        if (!state.game.world.starvation) {
          this.engine.notify(translate('starvation sets in'), GameSpace.World);
          changed.starvation = true;
        } else {
          const starvedCount = state.character.statistics.starved + 1;
          this.engine.dispatch(
            this.engine.actions.character.statistics.setM({
              starved: starvedCount,
            })
          );
          if (starvedCount >= 10 && !state.character.perks.slow_metabolism) {
            this.engine.dispatch(
              this.engine.actions.character.perks.addPerk(
                PerkCategory.slow_metabolism
              )
            );
          }
          this.engine.dispatch(this.engine.actions.game.world.setM(changed));
          this.die();
          return false;
        }
      } else {
        changed.starvation = false;
        changed.health = Math.min(state.game.world.health + this.meatHeal(), this.getMaxHealth());
      }
      changed['outfit.cured_meat'] = num;
    }
    // Water
    let movesPerWater = config.World.MOVES_PER_WATER;
    movesPerWater *= state.character.perks.desert_rat ? 2 : 1;
    if (waterMove >= movesPerWater) {
      waterMove = 0;
      changed.waterMove = 0;
      let water = state.game.world.water;
      water--;
      if (water === 0) {
        this.engine.notify(translate('there is no more water'), GameSpace.World);
      } else if (water < 0) {
        water = 0;
        if (!state.game.world.thirst) {
          this.engine.notify(translate('the thirst becomes unbearable'), GameSpace.World);
          changed.thirst = true;
        } else {
          const dehydratedCount = state.character.statistics.dehydrated + 1;
          this.engine.dispatch(
            this.engine.actions.character.statistics.setM({
              dehydrated: dehydratedCount,
            })
          );
          if (dehydratedCount >= 10 && !state.character.perks.desert_rat) {
            this.engine.dispatch(
              this.engine.actions.character.perks.addPerk(
                PerkCategory.desert_rat
              )
            );
          }
          this.engine.dispatch(this.engine.actions.game.world.setM(changed));
          this.die();
          return false;
        }
      } else {
        changed.thirst = false;
      }
      changed.water = water;
    }
    await this.engine.dispatch(this.engine.actions.game.world.setM(changed));
    return true;
  }

  meatHeal() {
    const state = this.engine.getState();
    return config.World.MEAT_HEAL * (state.character.perks.gastronome ? 2 : 1);
  }

  medsHeal() {
    return config.World.MEDS_HEAL;
  }

  checkDanger() {
    const state = this.engine.getState();
    if (!state.game.world.danger) {
      if (!state.stores.i_armour && this.getDistance() >= 8) {
        this.engine.dispatch(
          this.engine.actions.game.world.setM({
            danger: true,
          })
        );
        return true;
      }
      if (!state.stores.s_armour && this.getDistance() >= 18) {
        this.engine.dispatch(
          this.engine.actions.game.world.setM({
            danger: true,
          })
        );
        return true;
      }
    } else {
      if (this.getDistance() < 8) {
        this.engine.dispatch(
          this.engine.actions.game.world.setM({
            danger: false,
          })
        );
        return true;
      }
      if (this.getDistance() < 18 && (state.stores.i_armour || 0) > 0) {
        this.engine.dispatch(
          this.engine.actions.game.world.setM({
            danger: false,
          })
        );
        return true;
      }
    }
    return false;
  }

  async doSpace() {
    const { map, curPos } = this.engine.getState().game.world;
    const curTile = map[curPos[0]][curPos[1]];
    if (curTile === config.World.TILE.VILLAGE) {
      this.goHome();
    } else if (typeof config.World.LANDMARKS[curTile] !== 'undefined') {
      if (curTile !== config.World.TILE.OUTPOST || !this.outpostUsed()) {
        const event = this.engine.events.eventPool.World.find((event) => {
          return event.id === config.World.LANDMARKS[curTile].scene;
        })
        if (event) {
          this.engine.events.startEvent(
            event
          );
        }
      }
    } else {
      const res = await this.useSupplies();
      if (res) {
        this.checkFight();
      }
    }
  }
}
