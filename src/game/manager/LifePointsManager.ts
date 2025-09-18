import {Scene} from "phaser";
import {PinkDude} from "../entities/players/PinkDude.ts";
import {WhiteDude} from "../entities/players/WhiteDude.ts";
import {BlueDude} from "../entities/players/BlueDude.ts";
import {BaseEnemy} from "../entities/players/BaseEnemy.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {Rock} from "../entities/weapons/Rock.ts";


export class LifePointsManager {

    private scene: Scene;


    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createLifeBars(groupDude: Phaser.GameObjects.Group) {
        this.buildLowerBar(groupDude)
        this.buildUpperBar(groupDude)
    }

    public buildLowerBar(groupDude: Phaser.GameObjects.Group) {
        groupDude.children.iterate(dude => {

            let currentDude = dude as PinkDude | WhiteDude | BlueDude | BaseEnemy;

            const lowerBar = this.scene.add.graphics({
                fillStyle: {color: 0xff0000, alpha: 1},
                lineStyle: {width: 2, color: 0xff0000, alpha: 1},
                x: currentDude.x - 10,
                y: currentDude.y - 50
            })
            lowerBar.fillRect(0, 0, 30, 5);
            currentDude.setHpLowerBar(lowerBar);
            return true;
        })
    }

    public buildUpperBar(groupDude: Phaser.GameObjects.Group) {
        groupDude.children.iterate(dude => {

            let currentDude = dude as PinkDude | WhiteDude | BlueDude | BaseEnemy;

            const upperBar = this.scene.add.graphics({
                fillStyle: {color: 0x008000, alpha: 1},
                lineStyle: {width: 2, color: 0x82f72f, alpha: 1},
                x: currentDude.x - 10,
                y: currentDude.y - 50
            })
            upperBar.fillRect(0, 0, 30, 5);
            currentDude.setHpUpperBar(upperBar);
            return true;
        })
    }

    public updatePositionBar(groupDude: Phaser.GameObjects.Group) {
        groupDude.children.iterate(dude => {

            let currentDude = dude as PinkDude | WhiteDude | BlueDude | BaseEnemy;

            currentDude.getHpLowerBar()?.setPosition(currentDude.x - 10, currentDude.y - 50)
            currentDude.getHpUpperBar()?.setPosition(currentDude.x - 10, currentDude.y - 50)

            return true;
        })

    }

    public takeDamage(
        attackedDude: PinkDude | WhiteDude | BlueDude | BaseEnemy,
        weapon: Arrow | Rock
    ) {

        this.showHurtAnimation(attackedDude);
        this.checkIfDudeIsDeath(attackedDude)

        let upperBar = attackedDude.getHpUpperBar()
        if (upperBar) {
            upperBar.clear()
            upperBar.fillStyle(0x008000, 1)
            upperBar.lineStyle(2, 0x82f72f, 1)

            const weaponDamage = weapon.getDamage();
            const ownerWeaponDamage = weapon.getOwnerBaseDamage();
            const residualHp = attackedDude.getHp() - (weaponDamage + ownerWeaponDamage);
            attackedDude.setHp(residualHp);
            const proportionedLifePoints = 30 * residualHp / attackedDude.getMaxHp()


            console.log(proportionedLifePoints, "proportinated hp on the bar")
            upperBar.fillRect(0, 0, proportionedLifePoints, 5);
            attackedDude.setHpUpperBar(upperBar)
        } else {
            throw new Error("nessuna barra della vita trovata! ERR!")
        }


    }

    public showHurtAnimation(currDude: PinkDude | WhiteDude | BlueDude | BaseEnemy) {
        if (currDude instanceof BaseEnemy) {
            currDude.setTexture("pinkDudeTakeDamage")
            currDude.play("pinkDude_damaged");
        }
    }


    public checkIfDudeIsDeath(currDude: PinkDude | WhiteDude | BlueDude | BaseEnemy) {
        if (currDude.getHp() <= 0) {
            currDude.setTexture("pinkDudeDeath_spritesheet")
                .play("pinkDudeDeath")
                .on("animationcomplete", () => {
                    currDude.setIsDeath(true)
                    currDude.getHpLowerBar()?.destroy(true)
                    currDude.getHpUpperBar()?.destroy(true)
                    currDude.destroy()
                })
        }
    }
}