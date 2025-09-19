export class WhiteDude extends Phaser.Physics.Arcade.Sprite {

    private readonly _type: string = "white";

    private hp: number = 20
    private maxHp: number = 20
    private damage: number = 8
    private defense: number = 3
    private hpLowerBar: Phaser.GameObjects.Graphics | null;
    private hpUpperBar: Phaser.GameObjects.Graphics | null;
    private isDeath: boolean;
    private initialPosition: { x: number, y: number } | null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.hpLowerBar = null;
        this.hpUpperBar = null;
        this.isDeath = false;
        this.initialPosition = null;
    }

    public getInitialPosition(): { x: number, y: number } | null {
        return this.initialPosition
    }

    public setInitialPosition(x: number, y: number) {
        this.initialPosition = {x: x, y: y}
    }

    public getIsDeath() {
        return this.isDeath
    }

    public setIsDeath(val: boolean) {
        this.isDeath = val;
    }

    public getMaxHp() {
        return this.maxHp;
    }

    public getHpLowerBar() {
        return this.hpLowerBar;
    }

    public setHpLowerBar(val: Phaser.GameObjects.Graphics) {
        this.hpLowerBar = val;
    }

    public getHpUpperBar() {
        return this.hpUpperBar;
    }

    public setHpUpperBar(val: Phaser.GameObjects.Graphics) {
        this.hpUpperBar = val;
    }

    public getType() {
        return this._type
    }

    public getDamage(): number {
        return this.damage;
    }

    public setDamage(value: number) {
        this.damage = value;
    }

    public getHp(): number {
        return this.hp;
    }

    public setHp(value: number) {
        this.hp = value;
    }

    public getDefense(): number {
        return this.defense;
    }

    public setDefense(value: number) {
        this.defense = value;
    }
}