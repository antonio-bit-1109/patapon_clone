export class BlueDude extends Phaser.Physics.Arcade.Sprite {


    private _damage: number = 1;
    private _hp: number = 3;
    private _defense: number = 2
    private readonly _type: string = "blue";

    private hp: number = 10 * this._hp;
    private damage: number = 2 * this._damage;
    private defense: number = 1.5 * this._defense;


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    getType() {
        return this._type
    }

    getDamage(): number {
        return this.damage;
    }

    setDamage(value: number) {
        this.damage = value;
    }

    getHp(): number {
        return this.hp;
    }

    setHp(value: number) {
        this.hp = value;
    }

    getDefense(): number {
        return this.defense;
    }

    setDefense(value: number) {
        this.defense = value;
    }
}