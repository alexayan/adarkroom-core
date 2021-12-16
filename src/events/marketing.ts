import { Event } from '../type';

const events: Event[] = [
  // {
  //   title: translate('Penrose'),
  //   isAvailable: state => {
  //     return !state.marketing.penrose;
  //   },
  //   scenes: {
  //     start: {
  //       text: [
  //         translate(
  //           'a strange thrumming, pounding and crashing. visions of people and places, of a huge machine and twisting curves.'
  //         ),
  //         translate('inviting. it would be so easy to give in, completely.'),
  //       ],
  //       notification: translate('a strange thrumming, pounding and crashing. and then gone.'),
  //       blink: true,
  //       buttons: {
  //         'give in': {
  //           text: translate('give in'),
  //           onClick: engine => {
  //             engine.store?.dispatch(
  //               engine.actions.marketing.changePenrose(true)
  //             );
  //           },
  //           nextScene: 'end',
  //         },
  //         ignore: {
  //           text: translate('ignore it'),
  //           nextScene: 'end',
  //         },
  //       },
  //     },
  //   },
  // },
];

export default events;
