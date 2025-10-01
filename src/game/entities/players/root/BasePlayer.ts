import {BaseCharacter} from "./BaseCharacter.ts";

export abstract class BasePlayer extends BaseCharacter {

    private attackingFunction: Phaser.Time.TimerEvent | null;

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }


    public getAttackingFunction() {
        return this.attackingFunction
    }

    public setAttackingFunction(val: Phaser.Time.TimerEvent | null) {
        this.attackingFunction = val;
    }
}