import {BasePlayer} from "../root/BasePlayer.ts";
import {GeneralWeapon} from "../../weapons/GeneralWeapon.ts";

export class BlueDude extends BasePlayer {

    private readonly _type: string = "blue";
    private weapon: GeneralWeapon | null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.weapon = null;
        this.setHp(this.getHp() + 20);
        this.setMaxHp(this.getMaxHp() + 20)
        this.setDamage(this.getDamage() + 2)
        this.setDefense(this.getDefense() + 7)
    }

    public getWeapon() {
        return this.weapon;
    }

    public setWeapon(val: GeneralWeapon) {
        this.weapon = val;
    }

    public getType() {
        return this._type;
    }

}