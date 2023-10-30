import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

const config = {
  // WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins.
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    // Arcade Physics is a light-weight 2D physics engine made for games.
    // It has AABB collision support and a simple separation of velocity and position.
    default: 'arcade',
    // apply gravity to all game objects into the scene
    arcade: {
      debug: true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)],
  // scene: {
  //   preload,
  //   create,
  //   update, // will be called on every frame
  // },
};

// 60 frames per second
// 60 times per second

new Phaser.Game(config);
