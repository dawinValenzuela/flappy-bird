import Phaser from 'phaser';

const config = {
  // WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins.
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade Physics is a light-weight 2D physics engine made for games.
    // It has AABB collision support and a simple separation of velocity and position.
    default: 'arcade',
    // arcade: {
    //   gravity: { y: 200 },
    // },
  },
  scene: {
    preload,
    create,
  },
};

// Loading assests, such as images, audio, and other data files is done in the preload() function.
// the this context is the Scene to which the loader belongs.
function preload() {
  this.load.image('sky', 'assets/sky.png');
}

function create() {
  this.add.image(400, 300, 'sky');
}

new Phaser.Game(config);
