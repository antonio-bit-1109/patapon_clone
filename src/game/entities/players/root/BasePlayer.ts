import {BaseCharacter} from "./BaseCharacter.ts";

export abstract class BasePlayer extends BaseCharacter {

    private attackingFunction: Phaser.Time.TimerEvent | null;
    private initialPosition: { x: number, y: number } | null;


    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.initialPosition = null;
    }
    
    public getAttackingFunction() {
        return this.attackingFunction
    }

    public setAttackingFunction(val: Phaser.Time.TimerEvent | null) {
        this.attackingFunction = val;
    }

    public getInitialPositionX() {
        return this.initialPosition?.x
    }

    public getInitialPositionY() {
        return this.initialPosition?.y
    }


    public setInitialPosition(x: number, y: number) {
        this.initialPosition = {x: x, y: y}
    }
}