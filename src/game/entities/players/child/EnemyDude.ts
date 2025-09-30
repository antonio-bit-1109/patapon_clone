import {BaseEnemy} from "../root/BaseEnemy.ts";
import {GeneralWeapon} from "../../weapons/GeneralWeapon.ts";

export class EnemyDude extends BaseEnemy {

    private weapon: GeneralWeapon | null;

    public readonly tint: number = 0xff0000; //red tint
    private readonly _type: string = "pink";

    // private isAttacking: boolean = false;

    public constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setTint(this.tint)
        this.weapon = null;
        this.setHp(this.getHp() + 10);
        this.setMaxHp(this.getMaxHp() + 10)
        this.setDamage(this.getDamage() + 2)
        this.setDefense(this.getDefense() + 3)
    }

    // public setIsAttacking(val: boolean) {
    //     this.isAttacking = val;
    // }
    //
    // public getIsAttacking() {
    //     return this.isAttacking
    // }

    getWeapon(): GeneralWeapon {
        return this.weapon as GeneralWeapon;
    }

    setWeapon(val: GeneralWeapon): void {
        this.weapon = val;
    }

    public getType(): string {
        return this._type
    }
}