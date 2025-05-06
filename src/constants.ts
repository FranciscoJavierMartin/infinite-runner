import srcBackgroundLayer1 from '/background_layer_1.png';
import srcBackgroundLayer2 from '/background_layer_2.png';
import srcBackgroundLayer3 from '/background_layer_3.png';

export const INITIAL_GAME_SPEED = 5;

export const SPAWN_MIN_TIME = 1000;
export const SPAWN_MAX_TIME = 2500;

export const GROUND_HEIGHT = 80;
export const GROUND_COLOR = '#251614';
export const GROUND_TILE_SIZE = 24;

export const BACKGROUND_LAYERS = [
  { src: srcBackgroundLayer1, speed: 0.2 },
  { src: srcBackgroundLayer2, speed: 0.4 },
  { src: srcBackgroundLayer3, speed: 0.6 },
];

export const PLAYER_SPRITE_SIZE = 64;

export const OBSTACLE_SPRITE_WIDTH = 72;
export const OBSTACLE_SPRITE_HEIGHT = 78;

export const DEBUG_MODE = false;
