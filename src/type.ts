import { GameState } from './state';
import Engine from './engine';
import translate from './translate';
import config from './config';

export enum StoreCategory {
  wood = 'wood',
  fur = 'fur',
  meat = 'meat',
  iron = 'iron',
  coal = 'coal',
  sulphur = 'sulphur',
  steel = 'steel',
  cured_meat = 'cured_meat',
  scales = 'scales',
  teeth = 'teeth',
  leather = 'leather',
  bait = 'bait',
  torch = 'torch',
  cloth = 'cloth',
  bone_spear = 'bone_spear',
  iron_sword = 'iron_sword',
  steel_sword = 'steel_sword',
  bayonet = 'bayonet',
  rifle = 'rifle',
  laser_rifle = 'laser_rifle',
  bullets = 'bullets',
  energy_cell = 'energy_cell',
  grenade = 'grenade',
  bolas = 'bolas',
  medicine = 'medicine',
  compass = 'compass',
  charm = 'charm',
  alien_alloy = 'alien_alloy',
  waterskin = 'waterskin',
  cask = 'cask',
  water_tank = 'water_tank',
  rucksack = 'rucksack',
  wagon = 'wagon',
  convoy = 'convoy',
  l_armou = 'l_armou',
  i_armour = 'i_armour',
  s_armour = 's_armour',
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
}

export type CombatLootItem = {
  min: number;
  max: number;
  chance: number;
};

export type SceneButton = {
  text: string;
  cooldown?: number;
  nextScene?: { [key: string]: string } | string;
  notification?: string;
  cost?: {
    [key in StoreCategory]?: number;
  };
  reward?: {
    [key in StoreCategory]?: number;
  };
  onClick?: (engine: Engine) => void;
  available?: (state: GameState, engine: Engine) => boolean;
  onChoose?: (engine: Engine) => void;
};

export type SceneReward = {
  [key in StoreCategory]?: number;
};

export type NormalScene = {
  [key: string]: any;
  text: string[];
  buttons: {
    [key: string]: SceneButton;
  };
  notification?: string;
  blink?: boolean;
  reward?: SceneReward;
  onLoad?: (engine: Engine) => void;
  audio?: any;
};

export type CombatScene = {
  [key: string]: any;
  combat: boolean;
  enemy: string;
  chara: string;
  damage: number;
  hit: number;
  attackDelay: number;
  health: number;
  loot: {
    [key in StoreCategory]?: CombatLootItem;
  };
  notification: string;
  plural?: boolean;
  enemyName?: string;
  deathMessage?: string;
  ranged?: boolean;
};

export type Scene = NormalScene | CombatScene;

export type Event = {
  title: string;
  isAvailable?: (state: GameState, engine: Engine) => boolean;
  scenes: { [key: string]: Scene };
  id?: string;
};

export type Perk = {
  name: string;
  desc: string;
  notify: string;
};

export enum GameSpace {
  Room = 'Room',
  Path = 'Path',
  Outside = 'Outside',
  World = 'World',
  Ship = 'Ship',
  Space = 'Space',
}

export enum PerkCategory {
  boxer = 'boxer',
  martial_artist = 'martial_artist',
  unarmed_master = 'unarmed_master',
  barbarian = 'barbarian',
  slow_metabolism = 'slow_metabolism',
  desert_rat = 'desert_rat',
  evasive = 'evasive',
  precise = 'precise',
  scout = 'scout',
  stealthy = 'stealthy',
  gastronome = 'gastronome',
}

export const Perks: { [key in PerkCategory]: Perk } = {
  [PerkCategory.boxer]: {
    name: translate('boxer'),
    desc: translate('punches do more damage'),
    notify: translate('learned to throw punches with purpose'),
  },
  [PerkCategory.martial_artist]: {
    name: translate('martial artist'),
    desc: translate('punches do even more damage.'),
    notify: translate('learned to fight quite effectively without weapons'),
  },
  [PerkCategory.unarmed_master]: {
    /// TRANSLATORS : master of unarmed combat
    name: translate('unarmed master'),
    desc: translate('punch twice as fast, and with even more force'),
    notify: translate('learned to strike faster without weapons'),
  },
  [PerkCategory.barbarian]: {
    name: translate('barbarian'),
    desc: translate('melee weapons deal more damage'),
    notify: translate('learned to swing weapons with force'),
  },
  [PerkCategory.slow_metabolism]: {
    name: translate('slow metabolism'),
    desc: translate('go twice as far without eating'),
    notify: translate('learned how to ignore the hunger'),
  },
  [PerkCategory.desert_rat]: {
    name: translate('desert rat'),
    desc: translate('go twice as far without drinking'),
    notify: translate('learned to love the dry air'),
  },
  [PerkCategory.evasive]: {
    name: translate('evasive'),
    desc: translate('dodge attacks more effectively'),
    notify: translate("learned to be where they're not"),
  },
  [PerkCategory.precise]: {
    name: translate('precise'),
    desc: translate('land blows more often'),
    notify: translate('learned to predict their movement'),
  },
  [PerkCategory.scout]: {
    name: translate('scout'),
    desc: translate('see farther'),
    notify: translate('learned to look ahead'),
  },
  [PerkCategory.stealthy]: {
    name: translate('stealthy'),
    desc: translate('better avoid conflict in the wild'),
    notify: translate('learned how not to be seen'),
  },
  [PerkCategory.gastronome]: {
    name: translate('gastronome'),
    desc: translate('restore more health when eating'),
    notify: translate('learned to make the most of food'),
  },
};

export enum Building {
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
  sulphur_mine = 'sulphur_mine',
  iron_mine = 'iron_mine',
  coal_mine = 'coal_mine',
}

export enum Craftable {
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
  l_armou = 'l_armou',
  i_armour = 'i_armour',
  s_armour = 's_armour',
  iron_sword = 'iron_sword',
  steel_sword = 'steel_sword',
  rifle = 'rifle',
}

enum NonCraftable {
  medicine = 'medicine',
  charm = 'charm',
  bayonet = 'bayonet',
  bolas = 'bolas',
  grenade = 'grenade',
  bullets = 'bullets',
  cured_meat = 'cured_meat',
  laser_rifle = 'laser_rifle',
  energy_cell = 'energy_cell',
}

export type Carryable = Craftable | NonCraftable;

export enum WorkerType {
  sulphur_miner = 'sulphur_miner',
  hunter = 'hunter',
  trapper = 'trapper',
  charcutier = 'charcutier',
  iron_miner = 'iron_miner',
  coal_miner = 'coal_miner',
  armourer = 'armourer',
  tanner = 'tanner',
  steelworker = 'steelworker',
}

export const incomes = {
  gatherer: {
    name: translate('gatherer'),
    delay: 10,
    stores: {
      wood: 1,
    },
  },
  hunter: {
    name: translate('hunter'),
    delay: 10,
    stores: {
      fur: 0.5,
      meat: 0.5,
    },
  },
  trapper: {
    name: translate('trapper'),
    delay: 10,
    stores: {
      meat: -1,
      bait: 1,
    },
  },
  tanner: {
    name: translate('tanner'),
    delay: 10,
    stores: {
      fur: -5,
      leather: 1,
    },
  },
  charcutier: {
    name: translate('charcutier'),
    delay: 10,
    stores: {
      meat: -5,
      wood: -5,
      cured_meat: 1,
    },
  },
  iron_miner: {
    name: translate('iron miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      iron: 1,
    },
  },
  coal_miner: {
    name: translate('coal miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      coal: 1,
    },
  },
  sulphur_miner: {
    name: translate('sulphur miner'),
    delay: 10,
    stores: {
      cured_meat: -1,
      sulphur: 1,
    },
  },
  steelworker: {
    name: translate('steelworker'),
    delay: 10,
    stores: {
      iron: -1,
      coal: -1,
      steel: 1,
    },
  },
  armourer: {
    name: translate('armourer'),
    delay: 10,
    stores: {
      steel: -1,
      sulphur: -1,
      bullets: 1,
    },
  },
};

export type incomeType = keyof typeof incomes;

export type FireStatus = typeof config.Room.FireStatus[keyof typeof config.Room.FireStatus];
export type TemperatureStatus = typeof config.Room.TemperatureStatus[keyof typeof config.Room.TemperatureStatus];

export type Income = {
  delay: number;
  stores: {
    [key in StoreCategory]: number;
  };
  timeLeft?: number;
};

export type GameItem = {
  name: string;
  type?: string;
  desc?: string;
  craft?: {
    maximum?: number;
    availableMsg?: string;
    buildMsg?: string;
    maxMsg?: string;
    type: string;
    cost: (state: any) => { [key: string]: number };
  };
  trade?: {
    type: string;
    maximum?: number;
    tradeMsg?: string;
    cost: () => { [key: string]: number };
  };
  weapon?: {
    verb: string;
    type: string;
    damage: number | string;
    cooldown: number;
    cost?: { [key: string]: number };
  };
};