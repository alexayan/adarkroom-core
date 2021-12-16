import translate from '../translate';
import { Event, GameSpace, StoreCategory } from '../type';

const events: Event[] = [
  {
    title: translate('A Ruined Trap'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace === GameSpace.Outside &&
        state.game.buildings.trap > 0
      );
    },
    scenes: {
      start: {
        text: [
          translate('some of the traps have been torn apart.'),
          translate('large prints lead away, into the forest.'),
        ],
        onLoad: function(engine) {
          const state = engine.store?.getState();
          const numWrecked =
            Math.floor(Math.random() * state!.game.buildings.trap) + 1;
          engine.store?.dispatch(
            engine.actions.game.buildings.addM({
              trap: -numWrecked,
            })
          );
        },
        notification: translate('some traps have been destroyed'),
        blink: true,
        buttons: {
          track: {
            text: translate('track them'),
            nextScene: { 0.5: 'nothing', 1: 'catch' },
          },
          ignore: {
            text: translate('ignore them'),
            nextScene: 'end',
          },
        },
      },
      nothing: {
        text: [
          translate('the tracks disappear after just a few minutes.'),
          translate('the forest is silent.'),
        ],
        notification: translate('nothing was found'),
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
      catch: {
        text: [
          translate('not far from the village lies a large beast, its fur matted with blood.'),
          translate('it puts up little resistance before the knife.'),
        ],
        notification: translate("there was a beast. it's dead now"),
        reward: {
          fur: 100,
          meat: 100,
          teeth: 10,
        },
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    title: translate('Fire'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace == GameSpace.Outside &&
        state.game.buildings.hut > 0 &&
        state.game.population.value > 50
      );
    },
    scenes: {
      start: {
        text: [
          translate('a fire rampages through one of the huts, destroying it.'),
          translate('all residents in the hut perished in the fire.'),
        ],
        notification: translate('a fire has started'),
        blink: true,
        onLoad: function(engine) {
          engine.spaces.Outside.destroyHuts(1);
        },
        buttons: {
          mourn: {
            text: translate('mourn'),
            notification: translate('some villagers have died'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    title: translate('Sickness'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace == GameSpace.Outside &&
        state.game.population.value > 10 &&
        state.game.population.value < 50 &&
        !!state.stores.medicine
      );
    },
    scenes: {
      start: {
        text: [
          translate('a sickness is spreading through the village.'),
          translate('medicine is needed immediately.'),
        ],
        notification: translate('some villagers are ill'),
        blink: true,
        buttons: {
          heal: {
            text: translate('1 medicine'),
            cost: { medicine: 1 },
            nextScene: { 1: 'healed' },
          },
          ignore: {
            text: translate('ignore it'),
            nextScene: { 1: 'death' },
          },
        },
      },
      healed: {
        text: [translate('the sickness is cured in time.')],
        notification: translate('sufferers are healed'),
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
      death: {
        text: [
          translate('the sickness spreads through the village.'),
          translate('the days are spent with burials.'),
          translate('the nights are rent with screams.'),
        ],
        notification: translate('sufferers are left to die'),
        onLoad: function(engine) {
          const state = engine.store?.getState();
          const numKilled =
            Math.floor(
              Math.random() * Math.floor(state!.game.population.value / 2)
            ) + 1;
          engine.spaces.Outside.killVillagers(numKilled);
        },
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    title: translate('Plague'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace == GameSpace.Outside &&
        state.game.population.value > 50 &&
        !!state.stores.medicine
      );
    },
    scenes: {
      start: {
        text: [
          translate('a terrible plague is fast spreading through the village.'),
          translate('medicine is needed immediately.'),
        ],
        notification: translate('a plague afflicts the village'),
        blink: true,
        buttons: {
          buyMedicine: {
            text: translate('buy medicine'),
            cost: { scales: 70, teeth: 50 },
            reward: { medicine: 1 },
          },
          heal: {
            text: translate('5 medicine'),
            cost: { medicine: 5 },
            nextScene: { 1: 'healed' },
          },
          ignore: {
            text: translate('do nothing'),
            nextScene: { 1: 'death' },
          },
        },
      },
      healed: {
        text: [
          translate('the plague is kept from spreading.'),
          translate('only a few die.'),
          translate('the rest bury them.'),
        ],
        notification: translate('epidemic is eradicated eventually'),
        onLoad: function(engine) {
          const numKilled = Math.floor(Math.random() * 5) + 2;
          engine.spaces.Outside.killVillagers(numKilled);
        },
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
      death: {
        text: [
          translate('the plague rips through the village.'),
          translate('the nights are rent with screams.'),
          translate('the only hope is a quick death.'),
        ],
        notification: translate('population is almost exterminated'),
        onLoad: function(engine) {
          const numKilled = Math.floor(Math.random() * 80) + 10;
          engine.spaces.Outside.killVillagers(numKilled);
        },
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    title: translate('A Beast Attack'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace == GameSpace.Outside &&
        state.game.population.value > 0
      );
    },
    scenes: {
      start: {
        text: [
          translate('a pack of snarling beasts pours out of the trees.'),
          translate('the fight is short and bloody, but the beasts are repelled.'),
          translate('the villagers retreat to mourn the dead.'),
        ],
        notification: translate('wild beasts attack the villagers'),
        onLoad: function(engine) {
          const numKilled = Math.floor(Math.random() * 10) + 1;
          engine.spaces.Outside.killVillagers(numKilled);
        },
        reward: {
          fur: 100,
          meat: 100,
          teeth: 10,
        },
        blink: true,
        buttons: {
          end: {
            text: translate('go home'),
            notification: translate('predators become prey. price is unfair'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    title: translate('A Military Raid'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace == GameSpace.Outside &&
        state.game.population.value > 0 &&
        state.game.city.cleared
      );
    },
    scenes: {
      start: {
        text: [
          translate('a gunshot rings through the trees.'),
          translate('well armed men charge out of the forest, firing into the crowd.'),
          translate('after a skirmish they are driven away, but not without losses.'),
        ],
        notification: translate('troops storm the village'),
        onLoad: function(engine) {
          const numKilled = Math.floor(Math.random() * 40) + 1;
          engine.spaces.Outside.killVillagers(numKilled);
        },
        reward: {
          [StoreCategory.bullets]: 10,
          [StoreCategory.cured_meat]: 50,
        },

        blink: true,
        buttons: {
          end: {
            text: translate('go home'),
            notification: translate('warfare is bloodthirsty'),
            nextScene: 'end',
          },
        },
      },
    },
  },
];

export default events;
