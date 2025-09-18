import {PinkDude} from "./PinkDude.ts";
import {TriggerZoneType} from "../../global/global_constant.ts";

export class BaseEnemy extends PinkDude {

    public readonly tint: number = 0xff0000; //red tint
    private readonly role: string = "baseEnemy";
    private moving: boolean = false;
    private zoneState: TriggerZoneType = 'none';
    private movingFunction: Phaser.Time.TimerEvent | null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setTint(this.tint)
        this.movingFunction = null;


    }

    // getter setter

    
    getHpLowerBar() {
        return this.hpLowerBar;
    }

    setHpLowerBar(val: Phaser.GameObjects.Graphics) {
        this.hpLowerBar = val;
    }

    getHpUpperBar() {
        return this.hpUpperBar;
    }

    setHpUpperBar(val: Phaser.GameObjects.Graphics) {
        this.hpUpperBar = val;
    }

    getMovingFunction() {
        return this.movingFunction
    }

    setMovingFunction(val: Phaser.Time.TimerEvent | null) {
        this.movingFunction = val;
    }

    public getRole() {
        return this.role;
    }

    public getTint() {
        return this.tint;
    }

    public getMoving() {
        return this.moving
    }

    public setMoving(val: boolean) {
        this.moving = val;
    }


    public getZoneState() {
        return this.zoneState
    }

    public setZoneState(val: TriggerZoneType) {
        this.zoneState = val;
    }
}