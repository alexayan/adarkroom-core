import Engine from '../engine';
import translate from '../translate';
import { Event, GameSpace, PerkCategory, StoreCategory } from '../type';

const events: Event[] = [
  {
    /* The Nomad  --  Merchant */
    title: translate('The Nomad'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
    },
    scenes: {
      start: {
        text: [
          translate('a nomad shuffles into view, laden with makeshift bags bound with rough twine.'),
          translate("won't say from where he came, but it's clear that he's not staying."),
        ],
        notification: translate('a nomad arrives, looking to trade'),
        blink: true,
        buttons: {
          buyScales: {
            text: translate('buy scales'),
            cost: { fur: 100 },
            reward: { scales: 1 },
          },
          buyTeeth: {
            text: translate('buy teeth'),
            cost: { fur: 200 },
            reward: { teeth: 1 },
          },
          buyBait: {
            text: translate('buy bait'),
            cost: { fur: 5 },
            reward: { bait: 1 },
            notification: translate('traps are more effective with bait.'),
          },
          buyCompass: {
            available: function(state) {
              return !!state.stores.compass;
            },
            text: translate('buy compass'),
            cost: { fur: 300, scales: 15, teeth: 5 },
            reward: { compass: 1 },
            notification: translate('the old compass is dented and dusty, but it looks to work.'),
          },
          goodbye: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    /* Noises Outside  --  gain wood/fur */
    title: translate('Noises'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
    },
    scenes: {
      start: {
        text: [
          translate('through the walls, shuffling noises can be heard.'),
          translate("can't tell what they're up to."),
        ],
        notification: translate('strange noises can be heard through the walls'),
        blink: true,
        buttons: {
          investigate: {
            text: translate('investigate'),
            nextScene: { 0.3: 'stuff', 1: 'nothing' },
          },
          ignore: {
            text: translate('ignore them'),
            nextScene: 'end',
          },
        },
      },
      nothing: {
        text: [
          translate('vague shapes move, just out of sight.'),
          translate('the sounds stop.'),
        ],
        buttons: {
          backinside: {
            text: translate('go back inside'),
            nextScene: 'end',
          },
        },
      },
      stuff: {
        reward: { wood: 100, fur: 10 },
        text: [
          translate('a bundle of sticks lies just beyond the threshold, wrapped in coarse furs.'),
          translate('the night is silent.'),
        ],
        buttons: {
          backinside: {
            text: translate('go back inside'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    /* Noises Inside  --  trade wood for better good */
    title: translate('Noises'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
    },
    scenes: {
      start: {
        text: [
          translate('scratching noises can be heard from the store room.'),
          translate("something's in there."),
        ],
        notification: translate("something's in the store room"),
        blink: true,
        buttons: {
          investigate: {
            text: translate('investigate'),
            nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' },
          },
          ignore: {
            text: translate('ignore them'),
            nextScene: 'end',
          },
        },
      },
      scales: {
        text: [
          translate('some wood is missing.'),
          translate('the ground is littered with small scales'),
        ],
        onLoad: function(engine) {
          const state = engine.store?.getState();
          let numWood = state?.stores.wood || 0;
          numWood = Math.floor(numWood * 0.1);
          if (numWood === 0) numWood = 1;
          let numScales = Math.floor(numWood / 5);
          if (numScales === 0) numScales = 1;
          engine.store?.dispatch(
            engine.actions.stores.addM({
              wood: -numWood,
              scales: numScales,
            })
          );
        },
        buttons: {
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      teeth: {
        text: [
          translate('some wood is missing.'),
          translate('the ground is littered with small teeth'),
        ],
        onLoad: function(engine) {
          const state = engine.store?.getState();
          let numWood = state?.stores.wood || 0;
          numWood = Math.floor(numWood * 0.1);
          if (numWood === 0) numWood = 1;
          let numTeeth = Math.floor(numWood / 5);
          if (numTeeth === 0) numTeeth = 1;
          engine.store?.dispatch(
            engine.actions.stores.addM({
              wood: -numWood,
              teeth: numTeeth,
            })
          );
        },
        buttons: {
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      cloth: {
        text: [
          translate('some wood is missing.'),
          translate('the ground is littered with scraps of cloth'),
        ],
        onLoad: function(engine) {
          const state = engine.store?.getState();
          var numWood = state?.stores.wood || 0;
          numWood = Math.floor(numWood * 0.1);
          if (numWood === 0) numWood = 1;
          let numCloth = Math.floor(numWood / 5);
          if (numCloth === 0) numCloth = 1;
          engine.store?.dispatch(
            engine.actions.stores.addM({
              wood: -numWood,
              cloth: numCloth,
            })
          );
        },
        buttons: {
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    /* The Beggar  --  trade fur for better good */
    title: translate('The Beggar'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
    },
    scenes: {
      start: {
        text: [
          translate('a beggar arrives.'),
          translate('asks for any spare furs to keep him warm at night.'),
        ],
        notification: translate('a beggar arrives'),
        blink: true,
        buttons: {
          '50furs': {
            text: translate('give 50'),
            cost: { fur: 50 },
            nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' },
          },
          '100furs': {
            text: translate('give 100'),
            cost: { fur: 100 },
            nextScene: { 0.5: 'teeth', 0.8: 'scales', 1: 'cloth' },
          },
          deny: {
            text: translate('turn him away'),
            nextScene: 'end',
          },
        },
      },
      scales: {
        reward: { scales: 20 },
        text: [
          translate('the beggar expresses his thanks.'),
          translate('leaves a pile of small scales behind.'),
        ],
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      teeth: {
        reward: { teeth: 20 },
        text: [
          translate('the beggar expresses his thanks.'),
          translate('leaves a pile of small teeth behind.'),
        ],
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      cloth: {
        reward: { cloth: 20 },
        text: [
          translate('the beggar expresses his thanks.'),
          translate('leaves some scraps of cloth behind.'),
        ],
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  {
    /* The Shady Builder */
    title: translate('The Shady Builder'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace === GameSpace.Room &&
        state.game.buildings.hut >= 5 &&
        state.game.buildings.hut < 20
      );
    },
    scenes: {
      start: {
        text: [
          translate('a shady builder passes through'),
          translate('says he can build you a hut for less wood'),
        ],
        notification: translate('a shady builder passes through'),
        buttons: {
          build: {
            text: translate('300 wood'),
            cost: { wood: 300 },
            nextScene: { 0.6: 'steal', 1: 'build' },
          },
          deny: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      steal: {
        text: [translate('the shady builder has made off with your wood')],
        notification: translate('the shady builder has made off with your wood'),
        buttons: {
          end: {
            text: translate('go home'),
            nextScene: 'end',
          },
        },
      },
      build: {
        text: [translate('the shady builder builds a hut')],
        notification: translate('the shady builder builds a hut'),
        onLoad: function(engine) {
          const state = engine.store?.getState();
          var n = state!.game.buildings.hut;
          if (n < 20) {
            engine.store?.dispatch(
              engine.actions.game.buildings.setM({
                hut: n + 1,
              })
            );
          }
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
    /* Mysterious Wanderer  --  wood gambling */
    title: translate('The Mysterious Wanderer'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.wood;
    },
    scenes: {
      start: {
        text: [
          translate("a wanderer arrives with an empty cart. says if he leaves with wood, he'll be back with more."),
          translate("builder's not sure he's to be trusted."),
        ],
        notification: translate('a mysterious wanderer arrives'),
        blink: true,
        buttons: {
          wood100: {
            text: translate('give 100'),
            cost: { wood: 100 },
            nextScene: { 1: 'wood100' },
          },
          wood500: {
            text: translate('give 500'),
            cost: { wood: 500 },
            nextScene: { 1: 'wood500' },
          },
          deny: {
            text: translate('turn him away'),
            nextScene: 'end',
          },
        },
      },
      wood100: {
        text: [translate('the wanderer leaves, cart loaded with wood')],
        action: function(inputDelay: number, engine: Engine) {
          engine.events.saveDelay(
            function(engine: Engine) {
              engine.store?.dispatch(
                engine.actions.stores.addM({
                  wood: 300,
                })
              );
              engine.notify(
                translate('the mysterious wanderer returns, cart piled high with wood.'),
                GameSpace.Room
              );
            },
            `${GameSpace.Room}[4].scenes.wood100.action`,
            inputDelay
          );
        },
        onLoad: function(engine) {
          if (Math.random() < 0.5) {
            this.action(60, engine);
          }
        },
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      wood500: {
        text: [translate('the wanderer leaves, cart loaded with wood')],
        action: function(inputDelay: number, engine: Engine) {
          engine.events.saveDelay(
            function(engine: Engine) {
              engine.store?.dispatch(
                engine.actions.stores.addM({
                  wood: 1500,
                })
              );
              engine.notify(
                translate('the mysterious wanderer returns, cart piled high with wood.'),
                GameSpace.Room
              );
            },
            `${GameSpace.Room}[4].scenes.wood500.action`,
            inputDelay
          );
        },
        onLoad: function(engine) {
          if (Math.random() < 0.3) {
            this.action(60, engine);
          }
        },
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    /* Mysterious Wanderer  --  fur gambling */
    title: translate('The Mysterious Wanderer'),
    isAvailable: function(state) {
      return state.engine.activeSpace === GameSpace.Room && !!state.stores.fur;
    },
    scenes: {
      start: {
        text: [
          translate("a wanderer arrives with an empty cart. says if she leaves with furs, she'll be back with more."),
          translate("builder's not sure she's to be trusted."),
        ],
        notification: translate('a mysterious wanderer arrives'),
        blink: true,
        buttons: {
          fur100: {
            text: translate('give 100'),
            cost: { fur: 100 },
            nextScene: { 1: 'fur100' },
          },
          fur500: {
            text: translate('give 500'),
            cost: { fur: 500 },
            nextScene: { 1: 'fur500' },
          },
          deny: {
            text: translate('turn her away'),
            nextScene: 'end',
          },
        },
      },
      fur100: {
        text: [translate('the wanderer leaves, cart loaded with furs')],
        action: function(inputDelay: number, engine: Engine) {
          engine.events.saveDelay(
            function(engine: Engine) {
              engine.store?.dispatch(
                engine.actions.stores.addM({
                  fur: 300,
                })
              );
              engine.notify(
                translate('the mysterious wanderer returns, cart piled high with furs.'),
                GameSpace.Room
              );
            },
            `${GameSpace.Room}[5].scenes.fur100.action`,
            inputDelay
          );
        },
        onLoad: function(engine) {
          if (Math.random() < 0.5) {
            this.action(60, engine);
          }
        },
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      fur500: {
        text: [translate('the wanderer leaves, cart loaded with furs')],
        action: function(inputDelay: number, engine: Engine) {
          engine.events.saveDelay(
            function(engine: Engine) {
              engine.store?.dispatch(
                engine.actions.stores.addM({
                  fur: 1500,
                })
              );
              engine.notify(
                translate('the mysterious wanderer returns, cart piled high with furs.'),
                GameSpace.Room
              );
            },
            `${GameSpace.Room}[5].scenes.fur500.action`,
            inputDelay
          );
        },
        onLoad: function(engine) {
          if (Math.random() < 0.3) {
            this.action(60, engine);
          }
        },
        buttons: {
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    /* The Scout  --  Map Merchant */
    title: translate('The Scout'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace === GameSpace.Room &&
        state.features.location.World
      );
    },
    scenes: {
      start: {
        text: [
          translate("the scout says she's been all over."),
          translate('willing to talk about it, for a price.'),
        ],
        notification: translate('a scout stops for the night'),
        blink: true,
        buttons: {
          buyMap: {
            text: translate('buy map'),
            cost: { fur: 200, scales: 10 },
            available: function(state) {
              return !state.game.world.seenAll;
            },
            notification: translate('the map uncovers a bit of the world'),
            onChoose: engine => {
              engine.spaces[GameSpace.World].applyMap();
            },
          },
          learn: {
            text: translate('learn scouting'),
            cost: { fur: 1000, scales: 50, teeth: 20 },
            available: function(state) {
              return !state.character.perks.scout;
            },
            onChoose: function(engine) {
              engine.store?.dispatch(
                engine.actions.character.perks.addPerk(PerkCategory.scout)
              );
            },
          },
          leave: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    /* The Wandering Master */
    title: translate('The Master'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace === GameSpace.Room &&
        state.features.location.World
      );
    },
    scenes: {
      start: {
        text: [
          translate('an old wanderer arrives.'),
          translate('he smiles warmly and asks for lodgings for the night.'),
        ],
        notification: translate('an old wanderer arrives'),
        blink: true,
        buttons: {
          agree: {
            text: translate('agree'),
            cost: {
              cured_meat: 100,
              fur: 100,
              torch: 1,
            },
            nextScene: { 1: 'agree' },
          },
          deny: {
            text: translate('turn him away'),
            nextScene: 'end',
          },
        },
      },
      agree: {
        text: [translate('in exchange, the wanderer offers his wisdom.')],
        buttons: {
          evasion: {
            text: translate('evasion'),
            available: function(state) {
              return !state.character.perks.evasive;
            },
            onChoose: function(engine) {
              engine.store?.dispatch(
                engine.actions.character.perks.addPerk(PerkCategory.evasive)
              );
            },
            nextScene: 'end',
          },
          precision: {
            text: translate('precision'),
            available: function(state) {
              return !state.character.perks.precise;
            },
            onChoose: function(engine) {
              engine.store?.dispatch(
                engine.actions.character.perks.addPerk(PerkCategory.precise)
              );
            },
            nextScene: 'end',
          },
          force: {
            text: translate('force'),
            available: function(state) {
              return !state.character.perks.barbarian;
            },
            onChoose: function(engine) {
              engine.store?.dispatch(
                engine.actions.character.perks.addPerk(PerkCategory.barbarian)
              );
            },
            nextScene: 'end',
          },
          nothing: {
            text: translate('nothing'),
            nextScene: 'end',
          },
        },
      },
    },
  },

  {
    /* The Sick Man */
    title: translate('The Sick Man'),
    isAvailable: function(state) {
      return (
        state.engine.activeSpace === GameSpace.Room && !!state.stores.medicine
      );
    },
    scenes: {
      start: {
        text: [
          translate('a man hobbles up, coughing.'),
          translate('he begs for medicine.'),
        ],
        notification: translate('a sick man hobbles up'),
        blink: true,
        buttons: {
          help: {
            text: translate('give 1 medicine'),
            cost: { medicine: 1 },
            notification: translate('the man swallows the medicine eagerly'),
            nextScene: {
              0.1: 'alloy',
              0.3: 'cells',
              0.5: 'scales',
              1.0: 'nothing',
            },
          },
          ignore: {
            text: translate('tell him to leave'),
            nextScene: 'end',
          },
        },
      },
      alloy: {
        text: [
          translate('the man is thankful.'),
          translate('he leaves a reward.'),
          translate('some weird metal he picked up on his travels.'),
        ],
        onLoad: function(engine) {
          engine.store?.dispatch(
            engine.actions.stores.addM({
              [StoreCategory.alien_alloy]: 1,
            })
          );
        },
        buttons: {
          bye: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      cells: {
        text: [
          translate('the man is thankful.'),
          translate('he leaves a reward.'),
          translate('some weird glowing boxes he picked up on his travels.'),
        ],
        onLoad: function(engine) {
          engine.store?.dispatch(
            engine.actions.stores.addM({
              [StoreCategory.energy_cell]: 3,
            })
          );
        },
        buttons: {
          bye: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      scales: {
        text: [
          translate('the man is thankful.'),
          translate('he leaves a reward.'),
          translate('all he has are some scales.'),
        ],
        onLoad: function(engine) {
          engine.store?.dispatch(
            engine.actions.stores.addM({
              [StoreCategory.scales]: 5,
            })
          );
        },
        buttons: {
          bye: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
      nothing: {
        text: [translate('the man expresses his thanks and hobbles off.')],
        buttons: {
          bye: {
            text: translate('say goodbye'),
            nextScene: 'end',
          },
        },
      },
    },
  },
];

export default events;
