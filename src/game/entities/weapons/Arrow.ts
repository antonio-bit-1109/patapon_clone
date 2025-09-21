import {GeneralWeapon} from "./GeneralWeapon.ts";

export class Arrow extends GeneralWeapon {

    private damage: number = 4;
    private range: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);

    }

    public getRange() {
        return this.range
    }

    public setRange(val: number) {
        this.range = val;
    }

    public getDamage() {
        return this.damage;
    }


}