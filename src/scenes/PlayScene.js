import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
    this.initialBirdPosition = { x: 80, y: 300 };
    this.bird = null;
  }

  preload() {
    this.load.image('sky-bg', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
  }

  create() {
    // Add an image to the scene. and set the origin to the top left corner.
    this.add.image(0, 0, 'sky-bg').setOrigin(0);
    this.bird = this.physics.add
      .sprite(this.initialBirdPosition.x, this.initialBirdPosition.y, 'bird')
      .setOrigin(0);
    this.bird.body.gravity.y = 400;
  }

  update() {}
}

export default PlayScene;
