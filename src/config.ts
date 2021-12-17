import translate from './translate';
import { StoreCategory, GameItem } from './type';

const MEDS_HEAL = 20;
const MEAT_HEAL = 8;

const items = {
  trap: {
    name: translate('trap'),
    type: 'building',
    craft: {
      maximum: 10,
      availableMsg: translate('builder says she can make traps to catch any creatures might still be alive out there'),
      buildMsg: translate('more traps to catch more creatures'),
      maxMsg: translate("more traps won't help now"),
      type: 'building',
      cost: function(state: any) {
        const n = state.game.buildings.trap || 0;
        return {
          wood: 10 + n * 10,
        };
      },
    },
  },
  cart: {
    name: translate('cart'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('builder says she can make a cart for carrying wood'),
      buildMsg: translate('the rickety cart will carry more wood from the forest'),
      type: 'building',
      cost: function() {
        return {
          wood: 30,
        };
      },
    },
  },
  hut: {
    name: translate('hut'),
    type: 'building',
    craft: {
      maximum: 20,
      availableMsg: translate("builder says there are more wanderers. says they'll work, too."),
      buildMsg: translate('builder puts up a hut, out in the forest. says word will get around.'),
      maxMsg: translate('no more room for huts.'),
      type: 'building',
      cost: function(state: any) {
        const n = state.game.buildings.hut || 0;
        return {
          wood: 100 + n * 50,
        };
      },
    },
  },
  lodge: {
    name: translate('lodge'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('villagers could help hunt, given the means'),
      buildMsg: translate('the hunting lodge stands in the forest, a ways out of town'),
      type: 'building',
      cost: function() {
        return {
          wood: 200,
          fur: 10,
          meat: 5,
        };
      },
    },
  },
  trading_post: {
    name: translate('trading post'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('a trading post would make commerce easier'),
      buildMsg: translate('now the nomads have a place to set up shop, they might stick around a while'),
      type: 'building',
      cost: function() {
        return {
          wood: 400,
          fur: 100,
        };
      },
    },
  },
  tannery: {
    name: translate('tannery'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('builder says leather could be useful. says the villagers could make it.'),
      buildMsg: translate('tannery goes up quick, on the edge of the village'),
      type: 'building',
      cost: function() {
        return {
          wood: 500,
          fur: 50,
        };
      },
    },
  },
  smokehouse: {
    name: translate('smokehouse'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate("should cure the meat, or it'll spoil. builder says she can fix something up."),
      buildMsg: translate('builder finishes the smokehouse. she looks hungry.'),
      type: 'building',
      cost: function() {
        return {
          wood: 600,
          meat: 50,
        };
      },
    },
  },
  workshop: {
    name: translate('workshop'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('builder says she could make finer things, if she had the tools'),
      buildMsg: translate("workshop's finally ready. builder's excited to get to it"),
      type: 'building',
      cost: function() {
        return {
          wood: 800,
          leather: 100,
          scales: 10,
        };
      },
    },
  },
  steelworks: {
    name: translate('steelworks'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate('builder says the villagers could make steel, given the tools'),
      buildMsg: translate('a haze falls over the village as the steelworks fires up'),
      type: 'building',
      cost: function() {
        return {
          wood: 1500,
          iron: 100,
          coal: 100,
        };
      },
    },
  },
  armoury: {
    name: translate('armoury'),
    type: 'building',
    craft: {
      maximum: 1,
      availableMsg: translate("builder says it'd be useful to have a steady source of bullets"),
      buildMsg: translate("armoury's done, welcoming back the weapons of the past."),
      type: 'building',
      cost: function() {
        return {
          wood: 3000,
          steel: 100,
          sulphur: 50,
        };
      },
    },
  },
  torch: {
    name: translate('torch'),
    type: 'tool',
    craft: {
      type: 'tool',
      buildMsg: translate('a torch to keep the dark away'),
      cost: function() {
        return {
          wood: 1,
          cloth: 1,
        };
      },
    },
  },
  waterskin: {
    name: translate('waterskin'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate("this waterskin'll hold a bit of water, at least"),
      cost: function() {
        return {
          leather: 50,
        };
      },
    },
  },
  cask: {
    name: translate('cask'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate('the cask holds enough water for longer expeditions'),
      cost: function() {
        return {
          leather: 100,
          iron: 20,
        };
      },
    },
  },
  water_tank: {
    name: translate('water tank'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate('never go thirsty again'),
      cost: function() {
        return {
          iron: 100,
          steel: 50,
        };
      },
    },
  },
  bone_spear: {
    name: translate('bone spear'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: translate("this spear's not elegant, but it's pretty good at stabbing"),
      cost: function() {
        return {
          wood: 100,
          teeth: 5,
        };
      },
    },
    weapon: {
      verb: translate('stab'),
      type: 'melee',
      damage: 2,
      cooldown: 2,
    },
  },
  rucksack: {
    name: translate('rucksack'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate('carrying more means longer expeditions to the wilds'),
      cost: function() {
        return {
          leather: 200,
        };
      },
    },
  },
  wagon: {
    name: translate('wagon'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate('the wagon can carry a lot of supplies'),
      cost: function() {
        return {
          wood: 500,
          iron: 100,
        };
      },
    },
  },
  convoy: {
    name: translate('convoy'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate('the convoy can haul mostly everything'),
      cost: function() {
        return {
          wood: 1000,
          iron: 200,
          steel: 100,
        };
      },
    },
  },
  l_armour: {
    name: translate('l armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate("leather's not strong. better than rags, though."),
      cost: function() {
        return {
          leather: 200,
          scales: 20,
        };
      },
    },
  },
  i_armour: {
    name: translate('i armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate("iron's stronger than leather"),
      cost: function() {
        return {
          leather: 200,
          iron: 100,
        };
      },
    },
  },
  s_armour: {
    name: translate('s armour'),
    type: 'upgrade',
    craft: {
      type: 'upgrade',
      maximum: 1,
      buildMsg: translate("steel's stronger than iron"),
      cost: function() {
        return {
          leather: 200,
          steel: 100,
        };
      },
    },
  },
  iron_sword: {
    name: translate('iron sword'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: translate('sword is sharp. good protection out in the wilds.'),
      cost: function() {
        return {
          wood: 200,
          leather: 50,
          iron: 20,
        };
      },
    },
    weapon: {
      verb: translate('swing'),
      type: 'melee',
      damage: 4,
      cooldown: 2,
    },
  },
  steel_sword: {
    name: translate('steel sword'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: translate('the steel is strong, and the blade true.'),
      cost: function() {
        return {
          wood: 500,
          leather: 100,
          steel: 20,
        };
      },
    },
    weapon: {
      verb: translate('slash'),
      type: 'melee',
      damage: 6,
      cooldown: 2,
    },
  },
  rifle: {
    name: translate('rifle'),
    type: 'weapon',
    craft: {
      type: 'weapon',
      buildMsg: translate('black powder and bullets, like the old days.'),
      cost: function() {
        return {
          wood: 200,
          steel: 50,
          sulphur: 50,
        };
      },
    },
    weapon: {
      verb: translate('shoot'),
      type: 'ranged',
      damage: 5,
      cooldown: 1,
      cost: { bullets: 1 },
    },
  },
  cured_meat: {
    name: translate('cured meat'),
    type: 'tool',
    desc:
      translate('restores') +
      ' ' +
      MEAT_HEAL +
      ' ' +
      translate('hp'),
  },
  bullets: {
    name: translate('bullets'),
    type: 'tool',
    desc: translate('use with rifle'),
    trade: {
      type: 'good',
      cost: function() {
        return {
          scales: 10,
        };
      },
    },
  },
  grenade: {
    name: translate('grenade'),
    type: 'weapon',
    weapon: {
      verb: translate('lob'),
      type: 'ranged',
      damage: 15,
      cooldown: 5,
      cost: { grenade: 1 },
    },
    trade: {
      type: 'weapon',
      cost: function() {
        return {
          scales: 100,
          teeth: 50,
        };
      },
    },
  },
  bolas: {
    name: translate('bolas'),
    type: 'weapon',
    weapon: {
      verb: translate('tangle'),
      type: 'ranged',
      damage: 'stun',
      cooldown: 15,
      cost: { bolas: 1 },
    },
    trade: {
      type: 'weapon',
      cost: function() {
        return {
          teeth: 10,
        };
      },
    },
  },
  laser_rifle: {
    name: translate('laser rifle'),
    type: 'weapon',
    weapon: {
      verb: translate('blast'),
      type: 'ranged',
      damage: 8,
      cooldown: 1,
      cost: { energy_cell: 1 },
    },
  },
  energy_cell: {
    name: translate('energy cell'),
    type: 'tool',
    desc: translate('emits a soft red glow'),
    trade: {
      type: 'good',
      cost: function() {
        return {
          scales: 10,
          teeth: 10,
        };
      },
    },
  },
  bayonet: {
    name: translate('bayonet'),
    type: 'weapon',
    weapon: {
      verb: translate('thrust'),
      type: 'melee',
      damage: 8,
      cooldown: 2,
    },
    trade: {
      type: 'weapon',
      cost: function() {
        return {
          scales: 500,
          teeth: 250,
        };
      },
    },
  },
  charm: { name: translate('charm'), type: 'tool' },
  medicine: {
    name: translate('medicine'),
    type: 'tool',
    desc:
      translate('restores') +
      ' ' +
      MEDS_HEAL +
      ' ' +
      translate('hp'),
    trade: {
      type: 'good',
      cost: function() {
        return {
          scales: 50,
          teeth: 30,
        };
      },
    },
  },
  wood: {
    name: translate('wood'),
    type: 'resouce',
  },
  fur: {
    name: translate('fur'),
    type: 'resouce',
  },
  meat: {
    name: translate('meat'),
    type: 'resouce',
  },
  iron: {
    name: translate('iron'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return {
          fur: 150,
          scales: 50,
        };
      },
    },
  },
  coal: {
    name: translate('coal'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return {
          fur: 200,
          teeth: 50,
        };
      },
    },
  },
  sulphur: {
    name: translate('sulphur'),
    type: 'resouce',
  },
  steel: {
    name: translate('steel'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return {
          fur: 300,
          scales: 50,
          teeth: 50,
        };
      },
    },
  },
  scales: {
    name: translate('scales'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return { fur: 150 };
      },
    },
  },
  teeth: {
    name: translate('teeth'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return { fur: 300 };
      },
    },
  },
  leather: {
    name: translate('leather'),
    type: 'resouce',
  },
  bait: {
    name: translate('bait'),
    type: 'resouce',
  },
  cloth: {
    name: translate('cloth'),
    type: 'resouce',
  },
  alien_alloy: {
    name: translate('alien alloy'),
    type: 'resouce',
    trade: {
      type: 'good',
      cost: function() {
        return {
          fur: 1500,
          scales: 750,
          teeth: 300,
        };
      },
    },
  },
  compass: {
    name: translate('compass'),
    type: 'prop',
    trade: {
      type: 'special',
      maximum: 1,
      cost: function() {
        return {
          fur: 400,
          scales: 20,
          teeth: 10,
        };
      },
    },
  },
  fists: {
    name: translate('fists'),
    type: 'weapon',
    weapon: {
      verb: translate('punch'),
      type: 'unarmed',
      damage: 1,
      cooldown: 2
    }
  }
} as { [key: string]: GameItem };

export enum CraftableCategory {
  trap = 'trap',
  cart = 'cart',
  hut = 'hut',
  lodge = 'lodge',
  trading_post = 'trading_post',
  tannery = 'tannery',
  smokehouse = 'smokehouse',
  workshop = 'workshop',
  steelworks = 'steelworks',
  armoury = 'armoury',
  torch = 'torch',
  waterskin = 'waterskin',
  cask = 'cask',
  water_tank = 'water_tank',
  bone_spear = 'bone_spear',
  rucksack = 'rucksack',
  wagon = 'wagon',
  convoy = 'convoy',
  l_armour = 'l_armour',
  i_armour = 'i_armour',
  s_armour = 's_armour',
  iron_sword = 'iron_sword',
  steel_sword = 'steel_sword',
  rifle = 'rifle',
}
export enum TradeCategory {
  scales = 'scales',
  teeth = 'teeth',
  iron = 'iron',
  coal = 'coal',
  steel = 'steel',
  medicine = 'medicine',
  bullets = 'bullets',
  energy_cell = 'energy_cell',
  bolas = 'bolas',
  grenade = 'grenade',
  bayonet = 'bayonet',
  alien_alloy = 'alien_alloy',
  compass = 'compass',
}
export enum NonCraftableCategory {
  cured_meat = 'cured_meat',
  bullets = 'bullets',
  grenade = 'grenade',
  bolas = 'bolas',
  laser_rifle = 'laser_rifle',
  energy_cell = 'energy_cell',
  bayonet = 'bayonet',
  charm = 'charm',
  medicine = 'medicine',
}
export enum WeaponCategory {
  fists = 'fists',
  bone_spear = 'bone_spear',
  iron_sword = 'iron_sword',
  steel_sword = 'steel_sword',
  bayonet = 'bayonet',
  rifle = 'rifle',
  laser_rifle = 'laser_rifle',
  grenade = 'grenade',
  bolas = 'bolas',
}

const Outfits = Object.keys({ ...NonCraftableCategory, ...CraftableCategory }).filter((key) => {
  const item = items[key];
  return item.type === 'tool' || item.type === 'weapon';
});

const World_RADIUS = 30;


const WorldTile = {
  VILLAGE: 'A',
  IRON_MINE: 'I',
  COAL_MINE: 'C',
  SULPHUR_MINE: 'S',
  FOREST: ';',
  FIELD: ',',
  BARRENS: '.',
  ROAD: '#',
  HOUSE: 'H',
  CAVE: 'V',
  TOWN: 'O',
  CITY: 'Y',
  OUTPOST: 'P',
  SHIP: 'W',
  BOREHOLE: 'B',
  BATTLEFIELD: 'F',
  SWAMP: 'M',
  CACHE: 'U',
};


export default {
  items,
  Engine: {
    VERSION: 1.3,
    MAX_STORE: 99999999999999,
    SAVE_DISPLAY: 30 * 1000,
    MAX_MESSAGE_COUNT: 200
  },
  World: {
    name: 'World',
    RADIUS: World_RADIUS,
    VILLAGE_POS: [30, 30],
    TILE: WorldTile,
    TILE_PROBS: {
      [WorldTile.FOREST]: 0.15,
      [WorldTile.FIELD]: 0.35,
      [WorldTile.BARRENS]: 0.5,
    },
    LANDMARKS: {
      [WorldTile.OUTPOST]: {
        num: 0,
        minRadius: 0,
        maxRadius: 0,
        scene: 'outpost',
        label: translate('An&nbsp;Outpost'),
      },
      [WorldTile.IRON_MINE]: {
        num: 1,
        minRadius: 5,
        maxRadius: 5,
        scene: 'ironmine',
        label: translate('Iron&nbsp;Mine'),
      },
      [WorldTile.COAL_MINE]: {
        num: 1,
        minRadius: 10,
        maxRadius: 10,
        scene: 'coalmine',
        label: translate('Coal&nbsp;Mine'),
      },
      [WorldTile.SULPHUR_MINE]: {
        num: 1,
        minRadius: 20,
        maxRadius: 20,
        scene: 'sulphurmine',
        label: translate('Sulphur&nbsp;Mine'),
      },
      [WorldTile.HOUSE]: {
        num: 10,
        minRadius: 0,
        maxRadius: World_RADIUS * 1.5,
        scene: 'house',
        label: translate('An&nbsp;Old&nbsp;House'),
      },
      [WorldTile.CAVE]: {
        num: 5,
        minRadius: 3,
        maxRadius: 10,
        scene: 'cave',
        label: translate('A&nbsp;Damp&nbsp;Cave'),
      },
      [WorldTile.TOWN]: {
        num: 10,
        minRadius: 10,
        maxRadius: 20,
        scene: 'town',
        label: translate('An&nbsp;Abandoned&nbsp;Town'),
      },
      [WorldTile.CITY]: {
        num: 20,
        minRadius: 20,
        maxRadius: World_RADIUS * 1.5,
        scene: 'city',
        label: translate('A&nbsp;Ruined&nbsp;City'),
      },
      [WorldTile.SHIP]: {
        num: 1,
        minRadius: 28,
        maxRadius: 28,
        scene: 'ship',
        label: translate('A&nbsp;Crashed&nbsp;Starship'),
      },
      [WorldTile.BOREHOLE]: {
        num: 10,
        minRadius: 15,
        maxRadius: World_RADIUS * 1.5,
        scene: 'borehole',
        label: translate('A&nbsp;Borehole'),
      },
      [WorldTile.BATTLEFIELD]: {
        num: 5,
        minRadius: 18,
        maxRadius: World_RADIUS * 1.5,
        scene: 'battlefield',
        label: translate('A&nbsp;Battlefield'),
      },
      [WorldTile.SWAMP]: {
        num: 1,
        minRadius: 15,
        maxRadius: World_RADIUS * 1.5,
        scene: 'swamp',
        label: translate('A&nbsp;Murky&nbsp;Swamp'),
      },
    },
    STICKINESS: 0.5, // 0 <= x <= 1
    LIGHT_RADIUS: 2,
    BASE_WATER: 10,
    MOVES_PER_FOOD: 2,
    MOVES_PER_WATER: 1,
    DEATH_COOLDOWN: 120,
    FIGHT_CHANCE: 0.2,
    BASE_HEALTH: 10,
    BASE_HIT_CHANCE: 0.8,
    MEAT_HEAL: MEAT_HEAL,
    MEDS_HEAL: MEDS_HEAL,
    FIGHT_DELAY: 3, // At least three moves between fights
    NORTH: [0, -1],
    SOUTH: [0, 1],
    WEST: [-1, 0],
    EAST: [1, 0],
  },
  Room: {
    name: "Room",
    FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
    ROOM_WARM_DELAY: 30 * 1000, // time between room temperature updates
    BUILDER_STATE_DELAY: 0.5 * 60 * 1000, // time between builder state updates
    STOKE_COOLDOWN: 10, // cooldown to stoke the fire
    NEED_WOOD_DELAY: 15 * 1000, // from when the stranger shows up, to when you need wood,
    MiscItems: ['laser_rifle'],
    FireStatus: {
      Dead: {
        status: 'Dead',
        value: 0,
        text: translate('dead'),
      },
      Smoldering: {
        status: 'Smoldering',
        value: 1,
        text: translate('smoldering'),
      },
      Flickering: {
        status: 'Flickering',
        value: 2,
        text: translate('flickering'),
      },
      Burning: {
        status: 'Burning',
        value: 3,
        text: translate('burning'),
      },
      Roaring: {
        status: 'Roaring',
        value: 4,
        text: translate('roaring'),
      },
    },
    TemperatureStatus: {
      Freezing: {
        value: 0,
        text: translate('freezing'),
      },
      Cold: {
        value: 1,
        text: translate('cold'),
      },
      Mild: {
        value: 2,
        text: translate('mild'),
      },
      Warm: {
        value: 3,
        text: translate('warm'),
      },
      Hot: {
        value: 4,
        text: translate('hot'),
      },
    },
  },
  Event: {
    EVENT_TIME_RANGE: [3, 6], // range, in minutes
    PANEL_FADE: 200,
    FIGHT_SPEED: 100,
    EAT_COOLDOWN: 5,
    MEDS_COOLDOWN: 7,
    LEAVE_COOLDOWN: 1,
    STUN_DURATION: 4000,
  },
  Outside: {
    name: translate('Outside'),
    STORES_OFFSET: 0,
    GATHER_DELAY: 60,
    TRAPS_DELAY: 90,
    POP_DELAY: [0.5, 3],
    HUT_ROOM: 4,
    INCOME: {
      gatherer: {
        name: translate('gatherer'),
        delay: 10,
        stores: {
          [StoreCategory.wood]: 1,
        },
      },
      hunter: {
        name: translate('hunter'),
        delay: 10,
        stores: {
          [StoreCategory.fur]: 0.5,
          [StoreCategory.meat]: 0.5,
        },
      },
      trapper: {
        name: translate('trapper'),
        delay: 10,
        stores: {
          [StoreCategory.meat]: -1,
          [StoreCategory.bait]: 1,
        },
      },
      tanner: {
        name: translate('tanner'),
        delay: 10,
        stores: {
          [StoreCategory.fur]: -5,
          [StoreCategory.leather]: 1,
        },
      },
      charcutier: {
        name: translate('charcutier'),
        delay: 10,
        stores: {
          [StoreCategory.meat]: -5,
          [StoreCategory.wood]: -5,
          [StoreCategory.cured_meat]: 1,
        },
      },
      iron_miner: {
        name: translate('iron miner'),
        delay: 10,
        stores: {
          [StoreCategory.cured_meat]: -1,
          [StoreCategory.iron]: 1,
        },
      },
      coal_miner: {
        name: translate('coal miner'),
        delay: 10,
        stores: {
          [StoreCategory.cured_meat]: -1,
          [StoreCategory.coal]: 1,
        },
      },
      sulphur_miner: {
        name: translate('sulphur miner'),
        delay: 10,
        stores: {
          [StoreCategory.cured_meat]: -1,
          [StoreCategory.sulphur]: 1,
        },
      },
      steelworker: {
        name: translate('steelworker'),
        delay: 10,
        stores: {
          [StoreCategory.iron]: -1,
          [StoreCategory.coal]: -1,
          [StoreCategory.steel]: 1,
        },
      },
      armourer: {
        name: translate('armourer'),
        delay: 10,
        stores: {
          [StoreCategory.steel]: -1,
          [StoreCategory.sulphur]: -1,
          [StoreCategory.bullets]: 1,
        },
      },
    },
    TrapDrops: [
      {
        rollUnder: 0.5,
        name: 'fur',
        message: translate('scraps of fur'),
      },
      {
        rollUnder: 0.75,
        name: 'meat',
        message: translate('bits of meat'),
      },
      {
        rollUnder: 0.85,
        name: 'scales',
        message: translate('strange scales'),
      },
      {
        rollUnder: 0.93,
        name: 'teeth',
        message: translate('scattered teeth'),
      },
      {
        rollUnder: 0.995,
        name: 'cloth',
        message: translate('tattered cloth'),
      },
      {
        rollUnder: 1.0,
        name: 'charm',
        message: translate('a crudely made charm'),
      },
    ],
  },
  Path: {
    DEFAULT_BAG_SPACE: 10,
    STORES_OFFSET: 0,
    // Everything not in this list weighs 1
    Weight: {
      bone_spear: 2,
      iron_sword: 3,
      steel_sword: 5,
      rifle: 5,
      bullets: 0.1,
      energy_cell: 0.2,
      laser_rifle: 5,
      bolas: 0.5,
    } as { [key in StoreCategory]?: number },
    name: translate('A Dusty Path'),
    Outfit: Outfits,
  },
  Ship: {
    LIFTOFF_COOLDOWN: 120,
    ALLOY_PER_HULL: 1,
    ALLOY_PER_THRUSTER: 1,
    BASE_HULL: 0,
    BASE_THRUSTERS: 1,
    name: translate('Ship'),
  },
  Space: {
    SHIP_SPEED: 3,
    BASE_ASTEROID_DELAY: 500,
    BASE_ASTEROID_SPEED: 1500,
    FTB_SPEED: 60000,
    STAR_WIDTH: 3000,
    STAR_HEIGHT: 3000,
    NUM_STARS: 200,
    STAR_SPEED: 60000,
    FRAME_DELAY: 100,
  },
  Prestige: {
    storesMap: [
      { store: StoreCategory.wood, type: 'g' },
      { store: StoreCategory.fur, type: 'g' },
      { store: StoreCategory.meat, type: 'g' },
      { store: StoreCategory.iron, type: 'g' },
      { store: StoreCategory.coal, type: 'g' },
      { store: StoreCategory.sulphur, type: 'g' },
      { store: StoreCategory.steel, type: 'g' },
      { store: StoreCategory.cured_meat, type: 'g' },
      { store: StoreCategory.scales, type: 'g' },
      { store: StoreCategory.teeth, type: 'g' },
      { store: StoreCategory.leather, type: 'g' },
      { store: StoreCategory.bait, type: 'g' },
      { store: StoreCategory.torch, type: 'g' },
      { store: StoreCategory.cloth, type: 'g' },
      { store: StoreCategory.bone_spear, type: 'w' },
      { store: StoreCategory.iron_sword, type: 'w' },
      { store: StoreCategory.steel_sword, type: 'w' },
      { store: StoreCategory.bayonet, type: 'w' },
      { store: StoreCategory.rifle, type: 'w' },
      { store: StoreCategory.laser_rifle, type: 'w' },
      { store: StoreCategory.bullets, type: 'a' },
      { store: StoreCategory.energy_cell, type: 'a' },
      { store: StoreCategory.grenade, type: 'a' },
      { store: StoreCategory.bolas, type: 'a' },
    ],
  },
};
