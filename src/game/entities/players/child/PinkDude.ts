import {BasePlayer} from "../root/BasePlayer.ts";
import {GeneralWeapon} from "../../weapons/GeneralWeapon.ts";

export class PinkDude extends BasePlayer {

    private readonly _type: string = "pink";
    private weapon: GeneralWeapon | null;
    private readonly fullHp = 50;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, mainPlayer?: boolean) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.weapon = null;
        this.setHp(this.getHp() + 40);
        this.setMaxHp(this.getMaxHp() + 40)
        this.setDamage(this.getDamage() + 2)
        this.setDefense(this.getDefense() + 2)
        mainPlayer && this.setMainChar(mainPlayer)
    }


    // riporta hp ai valori full 10 + 40 per PINK
    public refullHp() {
        this.setHp(this.fullHp);
    }

    public getWeapon() {
        return this.weapon;
    }

    public setWeapon(val: GeneralWeapon) {
        this.weapon = val;
    }

    public getType() {
        return this._type
    }

}