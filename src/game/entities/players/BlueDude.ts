import {Arrow} from "../weapons/Arrow.ts";

export class BlueDude extends Phaser.Physics.Arcade.Sprite {


    private _damage: number = 1;
    private _hp: number = 3;
    private _defense: number = 4
    private readonly _type: string = "blue";

    private hp: number = 10 * this._hp;
    private damage: number = 2 * this._damage;
    private defense: number = 1.5 * this._defense;
    private hpLowerBar: Phaser.GameObjects.Graphics | null;
    private hpUpperBar: Phaser.GameObjects.Graphics | null;
    private weapon: Arrow | null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.hpLowerBar = null;
        this.hpUpperBar = null;
        this.weapon = null;
    }

    public getWeapon() {
        return this.weapon;
    }

    public getWeaponDamage() {
        return this.getWeapon()?.getDamage()
    }

    public setWeapon(val: Arrow) {
        this.weapon = val;
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