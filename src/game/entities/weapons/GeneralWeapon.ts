export abstract class GeneralWeapon extends Phaser.Physics.Arcade.Sprite {

    private haveHittedOnce = false;

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    public getHaveHittedOnce() {
        return this.haveHittedOnce
    }

    public setHaveHittedOnce(val: boolean) {
        this.haveHittedOnce = val;
    }
}