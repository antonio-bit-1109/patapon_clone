import {Scene} from "phaser";
import {WeaponType} from "../global/global_constant.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {Rock} from "../entities/weapons/Rock.ts";

export class WeaponManager {


    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createPhysicsThrowWeapon(
        texture: string,
        xOrigin: number,
        yOrigin: number,
        initVelX: number,
        initVelY: number,
        weaponType: WeaponType,
        scale?: number | null
    ) {

        let weapon;

        if (weaponType === "arrow") {
            weapon = new Arrow(this.scene, xOrigin, yOrigin, texture)
                .setData("weaponType", weaponType)
                .setVelocityX(initVelX)
                .setVelocityY(initVelY)
                .setRotation(Phaser.Math.DegToRad(-45))
        }

        if (weaponType === "rock") {
            weapon = new Rock(this.scene, xOrigin, yOrigin, texture)
                .setData("weaponType", weaponType)
                .setVelocityX(initVelX)
                .setVelocityY(initVelY)
                .setRotation(Phaser.Math.DegToRad(-45))
        }


        if (scale && weapon) {
            weapon.setScale(scale)
        }

        this.scene.add.tween({
            targets: weapon,
            rotation: Phaser.Math.DegToRad(70),
            duration: 2000
        })

        return weapon;
    }


}