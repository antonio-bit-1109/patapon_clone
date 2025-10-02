import {BasePlayer} from "../root/BasePlayer.ts";

export class WhiteDude extends BasePlayer {

    private readonly _type: string = "white";
    // private initialPosition: { x: number, y: number } | null;
    private haveHitted: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        // this.initialPosition = null;
        this.setHp(this.getHp() + 10);
        this.setMaxHp(this.getMaxHp() + 10)
        this.setDamage(this.getDamage() + 12)
        this.setDefense(this.getDefense() + 2)
    }

    public getHaveHitted() {
        return this.haveHitted
    }

    public setHaveHitted(val: boolean) {
        this.haveHitted = val;
    }

    // public getInitialPositionX() {
    //     return this.initialPosition?.x
    // }
    //
    // public getInitialPositionY() {
    //     return this.initialPosition?.y
    // }
    //
    //
    // public setInitialPosition(x: number, y: number) {
    //     this.initialPosition = {x: x, y: y}
    // }


    public getType() {
        return this._type
    }

}