import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

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
  scene: [PlayScene],
  // scene: {
  //   preload,
  //   create,
  //   update, // will be called on every frame
  // },
};

const PIPES_TO_RENDER = 4;

let bird = null;
let pipes = null;

let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [500, 550];

let flatVelocity = 250;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

// Loading assests, such as images, audio, and other data files is done in the preload() function.
// the this context is the Scene to which the loader belongs.
function preload() {
  this.load.image('sky-bg', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  // Add an image to the scene. and set the origin to the top left corner.
  this.add.image(0, 0, 'sky-bg').setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird')
    .setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

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

  recyclePipes();
}

function placePipe(upperPipe, lowerPipe) {
  const rightMostX = getRightmostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(
    ...pipeVerticalDistanceRange
  );
  const pipeVerticalPosition = Phaser.Math.Between(
    0 + 20,
    config.height - 20 - pipeVerticalDistance
  );
  const pipeHorizontalDistance = Phaser.Math.Between(
    ...pipeHorizontalDistanceRange
  );

  upperPipe.x = rightMostX + pipeHorizontalDistance;
  upperPipe.y = pipeVerticalPosition;

  lowerPipe.x = upperPipe.x;
  lowerPipe.y = upperPipe.y + pipeVerticalDistance;
}

function getRightmostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

function flap() {
  bird.setVelocityY(-flatVelocity);
}

function recyclePipes() {
  const tempPipes = [];
  pipes.getChildren().forEach(function (pipe) {
    if (pipe.getBounds().right <= 0) {
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        placePipe(...tempPipes);
        // increaseScore();
        // changeVelocity();
      }
    }
  });
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

new Phaser.Game(config);
