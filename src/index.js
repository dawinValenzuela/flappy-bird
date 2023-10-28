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
    // apply gravity to all game objects into the scene
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update, // will be called on every frame
  },
};

// Loading assests, such as images, audio, and other data files is done in the preload() function.
// the this context is the Scene to which the loader belongs.
function preload() {
  this.load.image('sky-bg', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

let bird = null;
let pipe = null;
let flatVelocity = 250;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

function create() {
  // Add an image to the scene. and set the origin to the top left corner.
  this.add.image(0, 0, 'sky-bg').setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird')
    .setOrigin(0);
  bird.body.gravity.y = 400;

  pipe = this.physics.add.sprite(300, 100, 'pipe').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

// 60 frames per second
// 60 times per second

// if bird y position is small than 0 or greater than height of the canvas
// then game over alert
function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    // alert('Game Over');
    restartBirdPosition();
  }
}

function flap() {
  bird.setVelocityY(-flatVelocity);
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

new Phaser.Game(config);
