export class BlueDude extends Phaser.Physics.Arcade.Sprite {

    private _speed: number = 2;
    private _damage: number = 4;
    private _hp: number = 2;
    private _defense: number = 2
    private readonly _type: string = "blue";

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    getType() {
        return this._type
    }

    getSpeed(): number {
        return this._speed;
    }

    setSpeed(value: number) {
        this._speed = value;
    }

    getDamage(): number {
        return this._damage;
    }

    setDamage(value: number) {
        this._damage = value;
    }

    getHp(): number {
        return this._hp;
    }

    setHp(value: number) {
        this._hp = value;
    }

    getDefense(): number {
        return this._defense;
    }

    setDefense(value: number) {
        this._defense = value;
    }
}