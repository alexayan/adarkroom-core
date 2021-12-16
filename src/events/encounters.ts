import translate from '../translate';
import { Event } from '../type';
import config from '../config';

const events: Event[] = [
  {
    title: translate('A Snarling Beast'),
    isAvailable: function(_, engine) {
      return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config.World.TILE.FOREST;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'snarling beast',
        enemyName: translate('snarling beast'),
        deathMessage: translate('the snarling beast is dead'),
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        loot: {
          fur: {
            min: 1,
            max: 3,
            chance: 1,
          },
          meat: {
            min: 1,
            max: 3,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 3,
            chance: 0.8,
          },
        },
        notification: translate('a snarling beast leaps out of the underbrush'),
      },
    },
  },
  {
    title: translate('A Gaunt Man'),
    isAvailable: function(_, engine) {
      return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config.World.TILE.BARRENS;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'gaunt man',
        enemyName: translate('gaunt man'),
        deathMessage: translate('the gaunt man is dead'),
        chara: 'E',
        damage: 2,
        hit: 0.8,
        attackDelay: 2,
        health: 6,
        loot: {
          cloth: {
            min: 1,
            max: 3,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8,
          },
          leather: {
            min: 1,
            max: 2,
            chance: 0.5,
          },
        },
        notification: translate('a gaunt man approaches, a crazed look in his eye'),
      },
    },
  },
  {
    title: translate('A Strange Bird'),
    isAvailable: function(_, engine) {
      return engine.spaces.World.getDistance() <= 10 && engine.spaces.World.getTerrain() === config.World.TILE.FIELD;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'strange bird',
        enemyName: translate('strange bird'),
        deathMessage: translate('the strange bird is dead'),
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 4,
        loot: {
          scales: {
            min: 1,
            max: 3,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.5,
          },
          meat: {
            min: 1,
            max: 3,
            chance: 0.8,
          },
        },
        notification: translate('a strange looking bird speeds across the plains'),
      },
    },
  },
  {
    title: translate('A Shivering Man'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config.World.TILE.BARRENS;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'shivering man',
        enemyName: translate('shivering man'),
        deathMessage: translate('the shivering man is dead'),
        chara: 'E',
        damage: 5,
        hit: 0.5,
        attackDelay: 1,
        health: 20,
        loot: {
          cloth: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8,
          },
          leather: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.7,
          },
        },
        notification: translate('a shivering man approaches and attacks with surprising strength'),
      },
    },
  },
  { /* Man-eater */
		title: translate('A Man-Eater'),
		isAvailable: function(_, engine) {
			const distance = engine.spaces.World.getDistance();
      return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config.World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'man-eater',
				enemyName: translate('man-eater'),
				deathMessage: translate('the man-eater is dead'),
				chara: 'T',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: translate('a large creature attacks, claws freshly bloodied')
			}
		}
	},
  {
    title: translate('A Scavenger'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config.World.TILE.BARRENS;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'scavenger',
        enemyName: translate('scavenger'),
        deathMessage: translate('the scavenger is dead'),
        chara: 'E',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          iron: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1,
          },
        },
        notification: translate('a scavenger draws close, hoping for an easy score'),
      },
    },
  },
  {
    title: translate('A Huge Lizard'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 10 && distance <= 20 && engine.spaces.World.getTerrain() === config.World.TILE.FIELD;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'lizard',
        enemyName: translate('lizard'),
        deathMessage: translate('the lizard is dead'),
        chara: 'T',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          scales: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
          meat: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
        },
        notification: translate('the grass thrashes wildly as a huge lizard pushes through'),
      },
    },
  },
  {
    title: translate('A Feral Terror'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 20 && engine.spaces.World.getTerrain() === config.World.TILE.FOREST;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'feral terror',
        enemyName: translate('feral terror'),
        deathMessage: translate('the feral terror is dead'),
        chara: 'T',
        damage: 6,
        hit: 0.8,
        attackDelay: 1,
        health: 45,
        loot: {
          fur: {
            min: 5,
            max: 10,
            chance: 1,
          },
          meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
        },
        notification: translate('a beast, wilder than imagining, erupts out of the foliage'),
      },
    },
  },
  {
    title: translate('A Soldier'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 20 && engine.spaces.World.getTerrain() === config.World.TILE.BARRENS;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'soldier',
        enemyName: translate('soldier'),
        deathMessage: translate('the soldier is dead'),
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1,
          },
        },
        notification: translate('a soldier opens fire from across the desert'),
      },
    },
  },
  {
    title: translate('A Sniper'),
    isAvailable: function(_, engine) {
      const distance = engine.spaces.World.getDistance();
      return distance > 20 && engine.spaces.World.getTerrain() === config.World.TILE.FIELD;
    },
    scenes: {
      start: {
        combat: true,
        enemy: 'sniper',
        enemyName: translate('sniper'),
        deathMessage: translate('the sniper is dead'),
        chara: 'D',
        damage: 15,
        hit: 0.8,
        attackDelay: 4,
        health: 30,
        ranged: true,
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1,
          },
        },
        notification: translate('a shot rings out, from somewhere in the long grass'),
      },
    },
  },
];

export default events;
