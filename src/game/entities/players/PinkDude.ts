import {Rock} from "../weapons/Rock.ts";

export class PinkDude extends Phaser.Physics.Arcade.Sprite {

    private readonly _type: string = "pink";

    private hp: number = 50;
    private maxHp: number = 50;
    private damage: number = 2
    private defense: number = 3
    protected hpLowerBar: Phaser.GameObjects.Graphics | null;
    protected hpUpperBar: Phaser.GameObjects.Graphics | null;
    private weapon: Rock | null;
    private isDeath: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.hpLowerBar = null;
        this.hpUpperBar = null;
        this.weapon = null;
        this.isDeath = false;
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

    public getWeapon() {
        return this.weapon;
    }

    public getWeaponDamage() {
        this.getWeapon()?.getDamage()
    }

    public setWeapon(val: Rock) {
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