import translate from '../translate';
import { Event, PerkCategory } from '../type';
import config from '../config';

const events: { [key: string]: Event } = {
  outpost: {
    /* Friendly Outpost */
    title: translate('An Outpost'),
    id: 'outpost',
    scenes: {
      start: {
        text: [translate('a safe place in the wilds.')],
        notification: translate('a safe place in the wilds.'),
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        onLoad: function(engine) {
          engine.spaces.World.useOutpost();
        },
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
    },
  },
  swamp: {
    /* Swamp */
    title: translate('A Murky Swamp'),
    id: 'swamp',
    scenes: {
      start: {
        text: [
          translate('rotting reeds rise out of the swampy earth.'),
          translate('a lone frog sits in the muck, silently.'),
        ],
        notification: translate('a swamp festers in the stagnant air.'),
        buttons: {
          enter: {
            text: translate('enter'),
            nextScene: { 1: 'cabin' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      cabin: {
        text: [
          translate('deep in the swamp is a moss-covered cabin.'),
          translate('an old wanderer sits inside, in a seeming trance.'),
        ],
        buttons: {
          talk: {
            cost: { charm: 1 },
            text: translate('talk'),
            nextScene: { 1: 'talk' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      talk: {
        text: [
          translate('the wanderer takes the charm and nods slowly.'),
          translate('he speaks of once leading the great fleets to fresh worlds.'),
          translate('unfathomable destruction to fuel wanderer hungers.'),
          translate('his time here, now, is his penance.'),
        ],
        onLoad: function(engine) {
          const state = engine.store!.getState();
          engine.dispatch(
            engine.actions.character.perks.addPerk(PerkCategory.gastronome)
          );
          engine.spaces.World.markVisited(
            state?.game.world.curPos[0],
            state?.game.world.curPos[1]
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
  cave: {
    /* Cave */
    title: translate('A Damp Cave'),
    id: 'cave',
    scenes: {
      start: {
        text: [
          translate('the mouth of the cave is wide and dark.'),
          translate("can't see what's inside."),
        ],
        notification: translate('the earth here is split, as if bearing an ancient wound'),
        buttons: {
          enter: {
            text: translate('go inside'),
            cost: { torch: 1 },
            nextScene: { 0.3: 'a1', 0.6: 'a2', 1: 'a3' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },

      a1: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: translate('a startled beast defends its home'),
        loot: {
          fur: {
            min: 1,
            max: 10,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'b1', 1: 'b2' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a2: {
        text: [
          translate('the cave narrows a few feet in.'),
          translate('the walls are moist and moss-covered'),
        ],
        buttons: {
          continue: {
            text: translate('squeeze'),
            nextScene: { 0.5: 'b2', 1: 'b3' },
          },
          leave: {
            text: translate('leave cave'),
            nextScene: 'end',
          },
        },
      },
      a3: {
        text: [
          translate('the remains of an old camp sits just inside the cave.'),
          translate('bedrolls, torn and blackened, lay beneath a thin layer of dust.'),
        ],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1,
          },
          torch: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          leather: {
            min: 1,
            max: 5,
            chance: 0.3,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'b3', 1: 'b4' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b1: {
        text: [
          translate('the body of a wanderer lies in a small cavern.'),
          translate("rot's been to work on it, and some of the pieces are missing."),
          /// TRANSLATORS : 'it' is a rotting wanderer's body
          translate("can't tell what left it here."),
        ],
        loot: {
          iron_sword: {
            min: 1,
            max: 1,
            chance: 1,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'c1' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b2: {
        text: [
          translate('the torch sputters and dies in the damp air'),
          translate('the darkness is absolute'),
        ],
        notification: translate('the torch goes out'),
        buttons: {
          continue: {
            text: translate('continue'),
            cost: { torch: 1 },
            nextScene: { 1: 'c1' },
          },
          leave: {
            text: translate('leave cave'),
            nextScene: 'end',
          },
        },
      },
      b3: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: translate('a startled beast defends its home'),
        loot: {
          fur: {
            min: 1,
            max: 3,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'c2' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b4: {
        combat: true,
        enemy: 'cave lizard',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 6,
        notification: translate('a cave lizard attacks'),
        loot: {
          scales: {
            min: 1,
            max: 3,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'c2' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c1: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: translate('a large beast charges out of the dark'),
        loot: {
          fur: {
            min: 1,
            max: 3,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 3,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end1', 1: 'end2' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c2: {
        combat: true,
        enemy: 'lizard',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: translate('a giant lizard shambles forward'),
        loot: {
          scales: {
            min: 1,
            max: 3,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 3,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.7: 'end2', 1: 'end3' },
          },
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end1: {
        text: [
          translate('the nest of a large animal lies at the back of the cave.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1,
          },
          scales: {
            min: 5,
            max: 10,
            chance: 1,
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 1,
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
        },
        buttons: {
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end2: {
        text: [
          translate('a small supply cache is hidden at the back of the cave.'),
        ],
        loot: {
          cloth: {
            min: 5,
            max: 10,
            chance: 1,
          },
          leather: {
            min: 5,
            max: 10,
            chance: 1,
          },
          iron: {
            min: 5,
            max: 10,
            chance: 1,
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          steel: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.3,
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.15,
          },
        },
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end3: {
        text: [
          translate('an old case is wedged behind a rock, covered in a thick layer of dust.'),
        ],
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 1,
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.3,
          },
        },
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: translate('leave cave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
    },
  },
  town: {
    /* Town */
    title: translate('A Deserted Town'),
    id: 'town',
    scenes: {
      start: {
        text: [
          translate('a small suburb lays ahead, empty houses scorched and peeling.'),
          translate("broken streetlights stand, rusting. light hasn't graced this place in a long time."),
        ],
        notification: translate('the town lies abandoned, its citizens long dead'),
        buttons: {
          enter: {
            text: translate('explore'),
            nextScene: { 0.3: 'a1', 0.7: 'a3', 1: 'a2' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },

      a1: {
        text: [
          translate("where the windows of the schoolhouse aren't shattered, they're blackened with soot."),
          translate('the double doors creak endlessly in the wind.'),
        ],
        buttons: {
          enter: {
            text: translate('enter'),
            nextScene: { 0.5: 'b1', 1: 'b2' },
            cost: { torch: 1 },
          },
          leave: {
            text: translate('leave town'),
            nextScene: 'end',
          },
        },
      },

      a2: {
        combat: true,
        enemy: 'thug',
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
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        notification: translate('ambushed on the street.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'b3', 1: 'b4' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a3: {
        text: [
          translate('a squat building up ahead.'),
          translate('a green cross barely visible behind grimy windows.'),
        ],
        buttons: {
          enter: {
            text: translate('enter'),
            nextScene: { 0.5: 'b5', 1: 'end5' },
            cost: { torch: 1 },
          },
          leave: {
            text: translate('leave town'),
            nextScene: 'end',
          },
        },
      },
      b1: {
        text: [
          translate('a small cache of supplies is tucked inside a rusting locker.'),
        ],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1,
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.8,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.3,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.05,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c1', 1: 'c2' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b2: {
        combat: true,
        enemy: 'scavenger',
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
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        notification: translate('a scavenger waits just inside the door.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c2', 1: 'c3' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b3: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1,
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        notification: translate('a beast stands alone in an overgrown park.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c4', 1: 'c5' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b4: {
        text: [
          translate('an overturned caravan is spread across the pockmarked street.'),
          translate("it's been picked over by scavengers, but there's still some things worth taking."),
        ],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.3,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c5', 1: 'c6' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b5: {
        combat: true,
        enemy: 'madman',
        chara: 'E',
        damage: 6,
        hit: 0.3,
        attackDelay: 1,
        health: 10,
        loot: {
          cloth: {
            min: 2,
            max: 4,
            chance: 0.3,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.9,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.4,
          },
        },
        notification: translate('a madman attacks, screeching.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.3: 'end5', 1: 'end6' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c1: {
        combat: true,
        enemy: 'thug',
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
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        notification: translate('a thug moves out of the shadows.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd1' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c2: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1,
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        notification: translate('a beast charges out of a ransacked classroom.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd1' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c3: {
        text: [
          translate('through the large gymnasium doors, footsteps can be heard.'),
          translate('the torchlight casts a flickering glow down the hallway.'),
          translate('the footsteps stop.'),
        ],
        buttons: {
          continue: {
            text: translate('enter'),
            nextScene: { 1: 'd1' },
          },
          leave: {
            text: translate('leave town'),
            nextScene: 'end',
          },
        },
      },
      c4: {
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 4,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          teeth: {
            min: 1,
            max: 5,
            chance: 1,
          },
          fur: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        notification: translate('another beast, draw by the noise, leaps out of a copse of trees.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd2' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c5: {
        text: [
          translate("something's causing a commotion a ways down the road."),
          translate('a fight, maybe.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 1: 'd2' },
          },
          leave: {
            text: translate('leave town'),
            nextScene: 'end',
          },
        },
      },
      c6: {
        text: [
          translate('a small basket of food is hidden under a park bench, with a note attached.'),
          translate("can't read the words."),
        ],
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd2' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      d1: {
        combat: true,
        enemy: 'scavenger',
        chara: 'E',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1,
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
        },
        notification: translate('a panicked scavenger bursts through the door, screaming.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end1', 1: 'end2' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      d2: {
        combat: true,
        enemy: 'vigilante',
        chara: 'D',
        damage: 6,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 1,
          },
          leather: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
        },
        notification: translate("a man stands over a dead wanderer. notices he's not alone."),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end3', 1: 'end4' },
          },
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end1: {
        text: [
          translate('scavenger had a small camp in the school.'),
          translate('collected scraps spread across the floor like they fell from heaven.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 1,
          },
          steel: {
            min: 5,
            max: 10,
            chance: 1,
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.3,
          },
        },
        buttons: {
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end2: {
        text: [
          translate("scavenger'd been looking for supplies in here, it seems."),
          translate("a shame to let what he'd found go to waste."),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          coal: {
            min: 5,
            max: 10,
            chance: 1,
          },
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          leather: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end3: {
        text: [
          translate("beneath the wanderer's rags, clutched in one of its many hands, a glint of steel."),
          translate('worth killing for, it seems.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end4: {
        text: [
          translate('eye for an eye seems fair.'),
          translate('always worked before, at least.'),
          translate('picking the bones finds some useful trinkets.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          iron: {
            min: 5,
            max: 10,
            chance: 1,
          },
          torch: {
            min: 1,
            max: 5,
            chance: 1,
          },
          bolas: {
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
        buttons: {
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end5: {
        text: [translate('some medicine abandoned in the drawers.')],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        loot: {
          medicine: {
            min: 2,
            max: 5,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave town'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      end6: {
        text: [
          translate('the clinic has been ransacked.'),
          translate('only dust and stains remain.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
        },
        buttons: {
          leave: {
            text: translate('leave town'),

            nextScene: 'end',
          },
        },
      },
    },
  },
  city: {
    /* City */
    title: translate('A Ruined City'),
    id: 'city',
    scenes: {
      start: {
        text: [
          translate('a battered highway sign stands guard at the entrance to this once-great city.'),
          translate("the towers that haven't crumbled jut from the landscape like the ribcage of some ancient beast."),
          translate('might be things worth having still inside.'),
        ],
        notification: translate('the towers of a decaying city dominate the skyline'),
        buttons: {
          enter: {
            text: translate('explore'),
            nextScene: { 0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      a1: {
        text: [
          translate('the streets are empty.'),
          translate('the air is filled with dust, driven relentlessly by the hard winds.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 0.5: 'b1', 1: 'b2' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      a2: {
        text: [
          translate('orange traffic cones are set across the street, faded and cracked.'),
          translate('lights flash through the alleys between buildings.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 0.5: 'b3', 1: 'b4' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      a3: {
        text: [
          translate('a large shanty town sprawls across the streets.'),
          translate('faces, darkened by soot and blood, stare out from crooked huts.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 0.5: 'b5', 1: 'b6' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      a4: {
        text: [translate('the shell of an abandoned hospital looms ahead.')],
        buttons: {
          enter: {
            text: translate('enter'),
            cost: { torch: 1 },
            nextScene: { 0.5: 'b7', 1: 'b8' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      b1: {
        text: [
          translate('the old tower seems mostly intact.'),
          translate('the shell of a burned out car blocks the entrance.'),
          translate('most of the windows at ground level are busted anyway.'),
        ],
        buttons: {
          enter: {
            text: translate('enter'),
            nextScene: { 0.5: 'c1', 1: 'c2' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      b2: {
        combat: true,
        notification: translate('a huge lizard scrambles up out of the darkness of an old metro station.'),
        enemy: 'lizard',
        chara: 'R',
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
        buttons: {
          descend: {
            text: translate('descend'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c2', 1: 'c3' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b3: {
        notification: translate('the shot echoes in the empty street.'),
        combat: true,
        enemy: 'sniper',
        chara: 'D',
        damage: 15,
        hit: 0.8,
        attackDelay: 4,
        health: 30,
        ranged: true,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
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
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c4', 1: 'c5' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b4: {
        notification: translate('the soldier steps out from between the buildings, rifle raised.'),
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
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
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c5', 1: 'c6' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b5: {
        notification: translate('a frail man stands defiantly, blocking the path.'),
        combat: true,
        enemy: 'frail man',
        chara: 'E',
        damage: 1,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          leather: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.05,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'c7', 1: 'c8' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      b6: {
        text: [
          translate('nothing but downcast eyes.'),
          translate('the people here were broken a long time ago.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 0.5: 'c8', 1: 'c9' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      b7: {
        text: [
          translate('empty corridors.'),
          translate('the place has been swept clean by scavengers.'),
        ],
        buttons: {
          continue: {
            text: translate('continue'),
            nextScene: { 0.3: 'c12', 0.7: 'c10', 1: 'c11' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },
      b8: {
        notification: translate('an old man bursts through a door, wielding a scalpel.'),
        combat: true,
        enemy: 'old man',
        chara: 'E',
        damage: 3,
        hit: 0.5,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          medicine: {
            min: 1,
            max: 2,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.3: 'c13', 0.7: 'c11', 1: 'end15' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      c1: {
        notification: translate('a thug is waiting on the other side of the wall.'),
        combat: true,
        enemy: 'thug',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'd1', 1: 'd2' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c2: {
        notification: translate('a snarling beast jumps out from behind a car.'),
        combat: true,
        enemy: 'beast',
        chara: 'R',
        damage: 2,
        hit: 0.8,
        attackDelay: 1,
        health: 30,
        loot: {
          meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          fur: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd2' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c3: {
        text: [
          translate('street above the subway platform is blown away.'),
          translate('lets some light down into the dusty haze.'),
          translate('a sound comes from the tunnel, just ahead.'),
        ],
        buttons: {
          enter: {
            text: translate('investigate'),
            cost: { torch: 1 },
            nextScene: { 0.5: 'd2', 1: 'd3' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c4: {
        text: [
          translate('looks like a camp of sorts up ahead.'),
          /// TRANSLATORS : chainlink is a type of metal fence.
          translate('rusted chainlink is pulled across an alleyway.'),
          translate('fires burn in the courtyard beyond.'),
        ],
        buttons: {
          enter: {
            text: translate('continue'),
            nextScene: { 0.5: 'd4', 1: 'd5' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c5: {
        text: [
          translate('more voices can be heard ahead.'),
          translate('they must be here for a reason.'),
        ],
        buttons: {
          enter: {
            text: translate('continue'),
            nextScene: { 1: 'd5' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c6: {
        text: [
          translate('the sound of gunfire carries on the wind.'),
          translate('the street ahead glows with firelight.'),
        ],
        buttons: {
          enter: {
            text: translate('continue'),
            nextScene: { 0.5: 'd5', 1: 'd6' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c7: {
        text: [
          /// TRANSLATORS : squatters occupy abandoned dwellings they don't own.
          translate('more squatters are crowding around now.'),
          translate('someone throws a stone.'),
        ],
        buttons: {
          enter: {
            text: translate('continue'),
            nextScene: { 0.5: 'd7', 1: 'd8' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c8: {
        text: [
          translate('an improvised shop is set up on the sidewalk.'),
          translate('the owner stands by, stoic.'),
        ],
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          rifle: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          bullets: {
            min: 1,
            max: 8,
            chance: 0.25,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.01,
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.5,
          },
        },
        buttons: {
          enter: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'd8' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c9: {
        text: [
          translate('strips of meat hang drying by the side of the street.'),
          translate('the people back away, avoiding eye contact.'),
        ],
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          enter: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'd8', 1: 'd9' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c10: {
        text: [
          translate('someone has locked and barricaded the door to this operating theatre.'),
        ],
        buttons: {
          enter: {
            text: translate('continue'),
            nextScene: { 0.2: 'end12', 0.6: 'd10', 1: 'd11' },
          },
          leave: {
            text: translate('leave city'),
            nextScene: 'end',
          },
        },
      },

      c11: {
        notification: translate('a tribe of elderly squatters is camped out in this ward.'),
        combat: true,
        enemy: 'squatters',
        plural: true,
        chara: 'EEE',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          cured_meat: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          cloth: {
            min: 3,
            max: 8,
            chance: 0.8,
          },
          medicine: {
            min: 1,
            max: 3,
            chance: 0.3,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end10' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c12: {
        notification: translate('a pack of lizards rounds the corner.'),
        combat: true,
        enemy: 'lizards',
        plural: true,
        chara: 'RRR',
        damage: 4,
        hit: 0.7,
        attackDelay: 0.7,
        health: 30,
        loot: {
          meat: {
            min: 3,
            max: 8,
            chance: 1,
          },
          teeth: {
            min: 2,
            max: 4,
            chance: 1,
          },
          scales: {
            min: 3,
            max: 5,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end10' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      c13: {
        text: [translate('strips of meat are hung up to dry in this ward.')],
        loot: {
          cured_meat: {
            min: 3,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end10', 1: 'end11' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d1: {
        notification: translate('a large bird nests at the top of the stairs.'),
        combat: true,
        enemy: 'bird',
        chara: 'R',
        damage: 5,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          meat: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end1', 1: 'end2' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d2: {
        text: [
          translate('the debris is denser here.'),
          translate('maybe some useful stuff in the rubble.'),
        ],
        loot: {
          bullets: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          steel: {
            min: 1,
            max: 10,
            chance: 0.8,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.01,
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end2' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d3: {
        notification: translate('a swarm of rats rushes up the tunnel.'),
        combat: true,
        enemy: 'rats',
        plural: true,
        chara: 'RRR',
        damage: 1,
        hit: 0.8,
        attackDelay: 0.25,
        health: 60,
        loot: {
          fur: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          teeth: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end2', 1: 'end3' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d4: {
        notification: translate('a large man attacks, waving a bayonet.'),
        combat: true,
        enemy: 'veteran',
        chara: 'D',
        damage: 6,
        hit: 0.8,
        attackDelay: 2,
        health: 45,
        loot: {
          bayonet: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end4', 1: 'end5' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d5: {
        notification: translate('a second soldier opens fire.'),
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
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
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end5' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d6: {
        notification: translate('a masked soldier rounds the corner, gun drawn'),
        combat: true,
        enemy: 'commando',
        chara: 'D',
        ranged: true,
        damage: 3,
        hit: 0.9,
        attackDelay: 2,
        health: 55,
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end5', 1: 'end6' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d7: {
        notification: translate('the crowd surges forward.'),
        combat: true,
        enemy: 'squatters',
        plural: true,
        chara: 'EEE',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end7', 1: 'end8' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d8: {
        notification: translate('a youth lashes out with a tree branch.'),
        combat: true,
        enemy: 'youth',
        chara: 'E',
        damage: 2,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end8' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d9: {
        notification: translate('a squatter stands firmly in the doorway of a small hut.'),
        combat: true,
        enemy: 'squatter',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          teeth: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 0.5: 'end8', 1: 'end9' },
          },
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      d10: {
        notification: translate('behind the door, a deformed figure awakes and attacks.'),
        combat: true,
        enemy: 'deformed',
        chara: 'T',
        damage: 8,
        hit: 0.6,
        attackDelay: 2,
        health: 40,
        loot: {
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          teeth: {
            min: 2,
            max: 2,
            chance: 1,
          },
          steel: {
            min: 1,
            max: 3,
            chance: 0.6,
          },
          scales: {
            min: 2,
            max: 3,
            chance: 0.1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end14' },
          },
        },
      },

      d11: {
        notification: translate('as soon as the door is open a little bit, hundreds of tentacles erupt.'),
        combat: true,
        enemy: 'tentacles',
        plural: true,
        chara: 'TTT',
        damage: 2,
        hit: 0.6,
        attackDelay: 0.5,
        health: 60,
        loot: {
          meat: {
            min: 10,
            max: 20,
            chance: 1,
          },
        },
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'end13' },
          },
        },
      },

      end1: {
        text: [
          translate('bird must have liked shiney things.'),
          translate('some good stuff woven into its nest.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          bullets: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end2: {
        text: [
          translate('not much here.'),
          translate('scavengers must have gotten to this place already.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          torch: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end3: {
        text: [
          /// TRANSLATORS : a platform in the subway
          translate('the tunnel opens up at another platform.'),
          translate('the walls are scorched from an old battle.'),
          translate('bodies and supplies from both sides litter the ground.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          laser_rifle: {
            min: 1,
            max: 1,
            chance: 0.3,
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.3,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end4: {
        text: [
          translate('the small military outpost is well supplied.'),
          translate('arms and munitions, relics from the war, are neatly arranged on the store-room floor.'),
          translate('just as deadly now as they were then.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1,
          },
          bullets: {
            min: 1,
            max: 10,
            chance: 1,
          },
          grenade: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end5: {
        text: [
          translate('searching the bodies yields a few supplies.'),
          translate('more soldiers will be on their way.'),
          translate('time to move on.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 1,
          },
          bullets: {
            min: 1,
            max: 10,
            chance: 1,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 0.1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end6: {
        text: [
          translate('the small settlement has clearly been burning a while.'),
          translate('the bodies of the wanderers that lived here are still visible in the flames.'),
          translate('still time to rescue a few supplies.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          laser_rifle: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end7: {
        text: [
          translate('the remaining settlers flee from the violence, their belongings forgotten.'),
          translate("there's not much, but some useful things can still be found."),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          energy_cell: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end8: {
        text: [
          translate('the young settler was carrying a canvas sack.'),
          translate('it contains travelling gear, and a few trinkets.'),
          translate("there's nothing else here."),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 10,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end9: {
        text: [
          translate('inside the hut, a child cries.'),
          translate('a few belongings rest against the walls.'),
          translate("there's nothing else here."),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          rifle: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          bullets: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          bolas: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end10: {
        text: [
          translate('the stench of rot and death fills the operating theatres.'),
          translate('a few items are scattered on the ground.'),
          translate('there is nothing else here.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 1,
            chance: 0.3,
          },
          medicine: {
            min: 1,
            max: 5,
            chance: 0.3,
          },
          teeth: {
            min: 3,
            max: 8,
            chance: 1,
          },
          scales: {
            min: 4,
            max: 7,
            chance: 0.9,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end11: {
        text: [
          translate('a pristine medicine cabinet at the end of a hallway.'),
          translate('the rest of the hospital is empty.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 1,
            chance: 0.2,
          },
          medicine: {
            min: 3,
            max: 10,
            chance: 1,
          },
          teeth: {
            min: 1,
            max: 2,
            chance: 0.2,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end12: {
        text: [translate('someone had been stockpiling loot here.')],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          energy_cell: {
            min: 1,
            max: 3,
            chance: 0.2,
          },
          medicine: {
            min: 3,
            max: 10,
            chance: 0.5,
          },
          bullets: {
            min: 2,
            max: 8,
            chance: 1,
          },
          torch: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          grenade: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          alien_alloy: {
            min: 1,
            max: 2,
            chance: 0.8,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end13: {
        text: [
          translate('the tentacular horror is defeated.'),
          translate('inside, the remains of its victims are everywhere.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          steel_sword: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          rifle: {
            min: 1,
            max: 2,
            chance: 0.3,
          },
          teeth: {
            min: 2,
            max: 8,
            chance: 1,
          },
          cloth: {
            min: 3,
            max: 6,
            chance: 0.5,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end14: {
        text: [
          /// TRANSLATORS : warped means extremely disfigured.
          translate('the warped man lies dead.'),
          translate('the operating theatre has a lot of curious equipment.'),
        ],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          energy_cell: {
            min: 2,
            max: 5,
            chance: 0.8,
          },
          medicine: {
            min: 3,
            max: 12,
            chance: 1,
          },
          cloth: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          steel: {
            min: 2,
            max: 3,
            chance: 0.3,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },

      end15: {
        text: [translate('the old man had a small cache of interesting items.')],
        onLoad: function(engine) {
          engine.spaces.World.clearDungeon();
          engine.dispatch(
            engine.actions.game.city.setM({
              cleared: true,
            })
          );
        },
        loot: {
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.8,
          },
          medicine: {
            min: 1,
            max: 4,
            chance: 1,
          },
          cured_meat: {
            min: 3,
            max: 7,
            chance: 1,
          },
          bolas: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          fur: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        buttons: {
          leave: {
            text: translate('leave city'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
    },
  },
  house: {
    /* Abandoned House */
    title: translate('An Old House'),
    id: 'house',
    scenes: {
      start: {
        text: [
          translate('an old house remains here, once white siding yellowed and peeling.'),
          translate('the door hangs open.'),
        ],
        notification: translate('the remains of an old house stand as a monument to simpler times'),
        buttons: {
          enter: {
            text: translate('go inside'),
            nextScene: { 0.25: 'medicine', 0.5: 'supplies', 1: 'occupied' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      supplies: {
        text: [
          translate('the house is abandoned, but not yet picked over.'),
          translate('still a few drops of water in the old well.'),
        ],
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
          engine.spaces.World.setWater(engine.spaces.World.getMaxWater());
          engine.notify(translate('water replenished'));
        },
        loot: {
          cured_meat: {
            min: 1,
            max: 10,
            chance: 0.8,
          },
          leather: {
            min: 1,
            max: 10,
            chance: 0.2,
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 0.5,
          },
        },
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      medicine: {
        text: [
          translate('the house has been ransacked.'),
          translate('but there is a cache of medicine under the floorboards.'),
        ],
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          medicine: {
            min: 2,
            max: 5,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      occupied: {
        combat: true,
        enemy: 'squatter',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: translate('a man charges down the hall, a rusty blade in his hand'),
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          cured_meat: {
            min: 1,
            max: 10,
            chance: 0.8,
          },
          leather: {
            min: 1,
            max: 10,
            chance: 0.2,
          },
          cloth: {
            min: 1,
            max: 10,
            chance: 0.5,
          },
        },
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
    },
  },
  battlefield: {
    /* Discovering an old battlefield */
    title: translate('A Forgotten Battlefield'),
    id: 'battlefield',
    scenes: {
      start: {
        text: [
          translate('a battle was fought here, long ago.'),
          translate('battered technology from both sides lays dormant on the blasted landscape.'),
        ],
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          rifle: {
            min: 1,
            max: 3,
            chance: 0.5,
          },
          bullets: {
            min: 5,
            max: 20,
            chance: 0.8,
          },
          laser_rifle: {
            min: 1,
            max: 3,
            chance: 0.3,
          },
          energy_cell: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
          grenade: {
            min: 1,
            max: 5,
            chance: 0.5,
          },
          alien_alloy: {
            min: 1,
            max: 1,
            chance: 0.3,
          },
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
  borehole: {
    /* Admiring a huge borehole */
    title: translate('A Huge Borehole'),
    id: 'borehole',
    scenes: {
      start: {
        text: [
          translate('a huge hole is cut deep into the earth, evidence of the past harvest.'),
          translate('they took what they came for, and left.'),
          translate('castoff from the mammoth drills can still be found by the edges of the precipice.'),
        ],
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          engine.spaces.World.markVisited(curPos[0], curPos[1]);
        },
        loot: {
          alien_alloy: {
            min: 1,
            max: 3,
            chance: 1,
          },
        },
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
    },
  },
  ship: {
    /* Finding a way off this rock */
    title: translate('A Crashed Ship'),
    id: 'ship',
    scenes: {
      start: {
        onLoad: async function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;
          await engine.spaces.World.markVisited(curPos[0], curPos[1]);
          await engine.spaces.World.drawRoad();
          await engine.dispatch(
            engine.actions.features.location.enableSpaceShip()
          );
        },
        text: [
          translate('the familiar curves of a wanderer vessel rise up out of the dust and ash. '),
          translate("lucky that the natives can't work the mechanisms."),
          translate('with a little effort, it might fly again.'),
        ],
        buttons: {
          leavel: {
            text: translate('salvage'),
            nextScene: 'end',
          },
        },
      },
    },
  },
  sulphurmine: {
    /* Clearing the Sulphur Mine */
    title: translate('The Sulphur Mine'),
    id: 'sulphurmine',
    scenes: {
      start: {
        text: [
          translate("the military is already set up at the mine's entrance."),
          translate('soldiers patrol the perimeter, rifles slung over their shoulders.'),
        ],
        notification: translate('a military perimeter is set up around the mine.'),
        buttons: {
          attack: {
            text: translate('attack'),
            nextScene: { 1: 'a1' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      a1: {
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
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
        },
        notification: translate('a soldier, alerted, opens fire.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'a2' },
          },
          run: {
            text: translate('run'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a2: {
        combat: true,
        enemy: 'soldier',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
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
        },
        notification: translate('a second soldier joins the fight.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'a3' },
          },
          run: {
            text: translate('run'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a3: {
        combat: true,
        enemy: 'veteran',
        chara: 'D',
        damage: 10,
        hit: 0.8,
        attackDelay: 2,
        health: 65,
        loot: {
          bayonet: {
            min: 1,
            max: 1,
            chance: 0.5,
          },
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        notification: translate('a grizzled soldier attacks, waving a bayonet.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'cleared' },
          },
        },
      },
      cleared: {
        text: [
          translate('the military presence has been cleared.'),
          translate('the mine is now safe for workers.'),
        ],
        notification: translate('the sulphur mine is clear of dangers'),
        onLoad: async function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;

          await engine.spaces.World.drawRoad();
          await engine.dispatch(
            engine.actions.game.world.setM({
              sulphurmine: true,
            })
          );
          await engine.spaces.World.markVisited(curPos[0], curPos[1]);
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
  coalmine: {
    /* Clearing the Coal Mine */
    title: translate('The Coal Mine'),
    id: 'coalmine',
    scenes: {
      start: {
        text: [
          translate('camp fires burn by the entrance to the mine.'),
          translate('men mill about, weapons at the ready.'),
        ],
        notification: translate('this old mine is not abandoned'),
        buttons: {
          attack: {
            text: translate('attack'),
            nextScene: { 1: 'a1' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      a1: {
        combat: true,
        enemy: 'man',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        notification: translate('a man joins the fight'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'a2' },
          },
          run: {
            text: translate('run'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a2: {
        combat: true,
        enemy: 'man',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          cured_meat: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
          cloth: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        notification: translate('a man joins the fight'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'a3' },
          },
          run: {
            text: translate('run'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: 'end',
          },
        },
      },
      a3: {
        combat: true,
        enemy: 'chief',
        chara: 'D',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          cured_meat: {
            min: 5,
            max: 10,
            chance: 1,
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          iron: {
            min: 1,
            max: 5,
            chance: 0.8,
          },
        },
        notification: translate('only the chief remains.'),
        buttons: {
          continue: {
            text: translate('continue'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'cleared' },
          },
        },
      },
      cleared: {
        text: [
          translate('the camp is still, save for the crackling of the fires.'),
          translate('the mine is now safe for workers.'),
        ],
        notification: translate('the coal mine is clear of dangers'),
        onLoad: async function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;

          await engine.spaces.World.drawRoad();
          await engine.dispatch(
            engine.actions.game.world.setM({
              coalmine: true,
            })
          );
          await engine.spaces.World.markVisited(curPos[0], curPos[1]);
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
  ironmine: {
    /* Clearing the Iron Mine */
    title: translate('The Iron Mine'),
    id: 'ironmine',
    scenes: {
      start: {
        text: [
          translate('an old iron mine sits here, tools abandoned and left to rust.'),
          translate('bleached bones are strewn about the entrance. many, deeply scored with jagged grooves.'),
          translate('feral howls echo out of the darkness.'),
        ],
        notification: translate('the path leads to an abandoned mine'),
        buttons: {
          enter: {
            text: translate('go inside'),
            nextScene: { 1: 'enter' },
            cost: { torch: 1 },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      enter: {
        combat: true,
        enemy: 'beastly matriarch',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          teeth: {
            min: 5,
            max: 10,
            chance: 1,
          },
          scales: {
            min: 5,
            max: 10,
            chance: 0.8,
          },
          cloth: {
            min: 5,
            max: 10,
            chance: 0.5,
          },
        },
        notification: translate('a large creature lunges, muscles rippling in the torchlight'),
        buttons: {
          leave: {
            text: translate('leave'),
            cooldown: config.Event.LEAVE_COOLDOWN,
            nextScene: { 1: 'cleared' },
          },
        },
      },
      cleared: {
        text: [
          translate('the beast is dead.'),
          translate('the mine is now safe for workers.'),
        ],
        notification: translate('the iron mine is clear of dangers'),
        onLoad: async function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;

          await engine.spaces.World.drawRoad();
          await engine.dispatch(
            engine.actions.game.world.setM({
              ironmine: true,
            })
          );
          await engine.spaces.World.markVisited(curPos[0], curPos[1]);
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

  cache: {
    /* Cache - contains some of supplies from previous game */
    title: translate('A Destroyed Village'),
    id: 'cache',
    scenes: {
      start: {
        text: [
          translate('a destroyed village lies in the dust.'),
          translate('charred bodies litter the ground.'),
        ],
        /// TRANSLATORS : tang = strong metallic smell, wanderer afterburner = ship's engines
        notification: translate('the metallic tang of wanderer afterburner hangs in the air.'),
        buttons: {
          enter: {
            text: translate('enter'),
            nextScene: { 1: 'underground' },
          },
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      underground: {
        text: [
          translate('a shack stands at the center of the village.'),
          translate('there are still supplies inside.'),
        ],
        buttons: {
          take: {
            text: translate('take'),
            nextScene: { 1: 'exit' },
          },
        },
      },
      exit: {
        text: [
          translate('all the work of a previous generation is here.'),
          translate('ripe for the picking.'),
        ],
        onLoad: function(engine) {
          const state = engine.getState();
          const curPos = state.game.world.curPos;

          engine.spaces.World.markVisited(curPos[0], curPos[1]);
          engine.prestige.collectStores();
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
};

export default events;
