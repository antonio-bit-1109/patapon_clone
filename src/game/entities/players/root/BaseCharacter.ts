export abstract class BaseCharacter extends Phaser.Physics.Arcade.Sprite {

    protected hpLowerBar: Phaser.GameObjects.Graphics | null = null;
    protected hpUpperBar: Phaser.GameObjects.Graphics | null = null;
    protected isDeath: boolean = false;
    private hp: number = 10
    private maxHp: number = 10;
    private damage: number = 1
    private defense: number = 1;

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    public getDamage(): number {
        return this.damage;
    }

    public setDamage(value: number) {
        this.damage = value;
    }

    public getMaxHp() {
        return this.maxHp;
    }

    public setMaxHp(val: number) {
        this.maxHp = val;
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

    public getIsDeath(): boolean {
        return this.isDeath;
    }

    public setIsDeath(val: boolean): void {
        this.isDeath = val;
    }
}