import {Scene} from "phaser";
import {WeaponType} from "../global/global_constant.ts";

export class WeaponManager {

    private ARROW_VELOCITY_X = 250
    private ARROW_VELOCITY_Y = 500

    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createPhysicsWeapon(
        texture: string,
        xOrigin: number,
        yOrigin: number,
        weaponType: WeaponType
    ) {
        let arrow = this.scene.physics.add.sprite(xOrigin, yOrigin, texture)
            .setData("weaponType", weaponType)
            .setVelocityX(this.ARROW_VELOCITY_X)
            .setVelocityY(-this.ARROW_VELOCITY_Y)
            .setRotation(Phaser.Math.DegToRad(-45))

        this.scene.add.tween({
            targets: arrow,
            rotation: Phaser.Math.DegToRad(70),
            duration: 2000
        })

        return arrow;
    }


}