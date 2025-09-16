import {Scene} from "phaser";
import {PinkDude} from "../entities/players/PinkDude.ts";
import {WhiteDude} from "../entities/players/WhiteDude.ts";
import {BlueDude} from "../entities/players/BlueDude.ts";
import {BaseEnemy} from "../entities/players/BaseEnemy.ts";


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
        attackerDude: PinkDude | WhiteDude | BlueDude | BaseEnemy,
        attackedDude: PinkDude | WhiteDude | BlueDude | BaseEnemy
    ) {

        let upperBar = attackedDude.getHpUpperBar()
        if (upperBar) {
            upperBar.clear()
            upperBar = null;
            upperBar = this.scene.add.graphics({
                fillStyle: {color: 0x008000, alpha: 1},
                lineStyle: {width: 2, color: 0x82f72f, alpha: 1},
                x: attackedDude.x - 10,
                y: attackedDude.y - 50
            })
            upperBar.fillRect(0, 0, 30 - attackerDude.getDamage() + this.checkWhoIsAttacker(attackerDude), 5);
        } else {
            throw new Error("nessuna barra della vita trovata! ERR!")
        }
    }

    private checkWhoIsAttacker(attacker: PinkDude | WhiteDude | BlueDude | BaseEnemy): number {

        if (attacker instanceof BlueDude || attacker instanceof PinkDude) {

            return attacker.getWeaponDamage() ?? 0

        } else {
            return 0
        }
    }

}