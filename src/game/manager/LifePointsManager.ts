import {Scene} from "phaser";
import {PinkDude} from "../entities/players/child/PinkDude.ts";
import {WhiteDude} from "../entities/players/child/WhiteDude.ts";
import {BlueDude} from "../entities/players/child/BlueDude.ts";
import {BaseEnemy} from "../entities/players/root/BaseEnemy.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {Rock} from "../entities/weapons/Rock.ts";
import {BasePlayer} from "../entities/players/root/BasePlayer.ts";
import {EnemyDude} from "../entities/players/child/EnemyDude.ts";


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
        attackedDude: PinkDude | WhiteDude | BlueDude | EnemyDude,
        weapon?: Arrow | Rock | null,
        attackerDude?: BasePlayer | null
    ) {

        this.showHurtAnimation(attackedDude);
        this.checkIfDudeIsDeath(attackedDude)

        let upperBar = attackedDude.getHpUpperBar()
        if (upperBar) {
            upperBar.clear()
            upperBar.fillStyle(0x008000, 1)
            upperBar.lineStyle(2, 0x82f72f, 1)

            let proportionedLifePoints;
            let residualHp = 50;
            if (weapon && !attackerDude) {
                const weaponDamage = weapon.getDamage();
                const ownerWeaponDamage = weapon.getOwnerBaseDamage();
                residualHp = attackedDude.getHp() - (weaponDamage + ownerWeaponDamage);

            }

            if (!weapon && attackerDude) {
                const damage = attackedDude.getDamage()
                residualHp = attackedDude.getHp() - damage;

            }

            attackedDude.setHp(residualHp);
            proportionedLifePoints = 30 * residualHp / attackedDude.getMaxHp()

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
            currDude.setIsDeath(true)
            currDude.setTexture("pinkDudeDeath_spritesheet")
                .play("pinkDudeDeath")
                .on("animationcomplete", () => {
                    currDude.getHpLowerBar()?.destroy(true)
                    currDude.getHpUpperBar()?.destroy(true)
                    currDude.destroy(true)
                })
        }
    }
}