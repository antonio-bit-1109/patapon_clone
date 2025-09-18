export abstract class GeneralWeapon extends Phaser.Physics.Arcade.Sprite {

    private haveHittedOnce = false;
    private ownerBaseDamage: number | null;

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.ownerBaseDamage = null;
    }

    public getHaveHittedOnce() {
        return this.haveHittedOnce
    }

    public setHaveHittedOnce(val: boolean) {
        this.haveHittedOnce = val;
    }

    public setOwnerBaseDamage(damage: number) {
        this.ownerBaseDamage = damage;
    }

    public getOwnerBaseDamage() {
        if (this.ownerBaseDamage) {
            return this.ownerBaseDamage;
        }
        throw new Error("impossibile reperire il damage del owner della weapon.")
    }
}