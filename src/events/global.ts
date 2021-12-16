import translate from '../translate';
import { Event, GameSpace, PerkCategory } from '../type';

const events: Event[] = [
  {
    title: translate('The Thief'),
    isAvailable: function(state) {
      return (
        (state.engine.activeSpace === GameSpace.Room ||
          state.engine.activeSpace === GameSpace.Outside) &&
        state.game.thieves === 1
      );
    },
    scenes: {
      start: {
        text: [
          translate('the villagers haul a filthy man out of the store room.'),
          translate('say his folk have been skimming the supplies.'),
          translate('say he should be strung up as an example.'),
        ],
        notification: translate('a thief is caught'),
        blink: true,
        buttons: {
          kill: {
            text: translate('hang him'),
            nextScene: { 1: 'hang' },
          },
          spare: {
            text: translate('spare him'),
            nextScene: { 1: 'spare' },
          },
        },
      },
      hang: {
        text: [
          translate('the villagers hang the thief high in front of the store room.'),
          translate('the point is made. in the next few days, the missing supplies are returned.'),
        ],
        onLoad: function(engine) {
          engine.store?.dispatch(engine.actions.game.thieves.set(2));
          engine.store?.dispatch(
            engine.actions.income.setM({
              thieves: 0,
            })
          );
          engine.store?.dispatch(
            engine.actions.stores.addM(engine.store?.getState().game.stolen)
          );
        },
        buttons: {
          leave: {
            text: translate('leave'),
            nextScene: 'end',
          },
        },
      },
      spare: {
        text: [
          translate("the man says he's grateful. says he won't come around any more."),
          translate('shares what he knows about sneaking before he goes.'),
        ],
        onLoad: function(engine) {
          engine.store?.dispatch(engine.actions.game.thieves.set(2));
          engine.store?.dispatch(
            engine.actions.income.setM({
              thieves: 0,
            })
          );
          engine.store?.dispatch(
            engine.actions.character.perks.addPerk(PerkCategory.stealthy)
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
];

export default events;
