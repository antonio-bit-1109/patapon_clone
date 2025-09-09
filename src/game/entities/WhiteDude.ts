export class WhiteDude extends Phaser.GameObjects.Sprite {

    private _speed: number = 2;
    private _damage: number = 4;
    private _hp: number = 2;
    private _defense: number = 2

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get damage(): number {
        return this._damage;
    }

    set damage(value: number) {
        this._damage = value;
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

    get defense(): number {
        return this._defense;
    }

    set defense(value: number) {
        this._defense = value;
    }
}