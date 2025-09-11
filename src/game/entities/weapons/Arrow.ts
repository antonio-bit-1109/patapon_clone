export class Arrow extends Phaser.Physics.Arcade.Sprite {

    private damage: number = 4;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    public getDamage() {
        return this.damage;
    }

}