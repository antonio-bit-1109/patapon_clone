import {GeneralWeapon} from "./GeneralWeapon.ts";

export class Shuriken extends GeneralWeapon {

    private damage: number = 3;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    public getDamage() {
        return this.damage;
    }

}