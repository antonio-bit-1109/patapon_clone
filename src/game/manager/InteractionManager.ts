import {Scene} from "phaser";
import Zone = Phaser.GameObjects.Zone;
import {EnemyDude} from "../entities/players/child/EnemyDude.ts";
import {EnumPositionTriggerZone, TriggerZoneState} from "../global/global_constant.ts";
import Group = Phaser.GameObjects.Group;
import {BaseEnemy} from "../entities/players/root/BaseEnemy.ts";
import {GeneralWeapon} from "../entities/weapons/GeneralWeapon.ts";
import {LifePointsManager} from "./LifePointsManager.ts";
import {PinkDude} from "../entities/players/child/PinkDude.ts";
import {WhiteDude} from "../entities/players/child/WhiteDude.ts";
import {BlueDude} from "../entities/players/child/BlueDude.ts";
import {Rock} from "../entities/weapons/Rock.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {ArmyManager} from "./ArmyManager.ts";

export class InteractionManager {

    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    checkCollisionBetweenAllDudesAndWeapon(dudeGroup: Group, weapon: GeneralWeapon, lifePointsManager: LifePointsManager) {

        this.scene.physics.add.overlap(
            dudeGroup,
            weapon,
            (dude, weapon) => {
                let currDude = dude as EnemyDude | PinkDude | WhiteDude | BlueDude;
                let wep = weapon as Rock | Arrow;
                !wep.getHaveHittedOnce() && lifePointsManager.takeDamage(currDude, wep)
                wep.setHaveHittedOnce(true)
            }, () => {
                return true
            }, this)
    }


    public checkOverlapWithEnemyStoppingZone(armyManager: ArmyManager, enemyStoppingZone: Zone) {

        const enemyGroup = armyManager.getDudesEnemyArmy();

        // @ts-ignore
        this.scene.physics.add.overlap(
            enemyStoppingZone,
            enemyGroup,
            (zone, enemy) => {

                console.log(zone)
                let currEnemy = enemy as EnemyDude;
                const type = currEnemy.getType()

                switch (currEnemy.getZoneState()) {

                    case TriggerZoneState.none:

                        currEnemy && currEnemy.setZoneState(TriggerZoneState.stopping)

                        this.scene.time.delayedCall(
                            this.calculateDelay(currEnemy.getData("indexEnemy"))
                            //   1000
                            , () => {

                                if (!currEnemy || !currEnemy.active) return;

                                currEnemy && currEnemy.setMoving(false); //enemy arrived into trigger zone
                                currEnemy && currEnemy.setVelocity(0)
                                currEnemy && currEnemy.setTexture(`${type}Dude_idle_spritesheet`)
                                currEnemy && currEnemy.play(`${type}Dude_waiting`)
                                currEnemy && currEnemy.setZoneState(TriggerZoneState.stopped)
                            })
                        break;

                    case TriggerZoneState.stopped:

                        if (currEnemy.getMovingFunction() !== null) return;

                        // the enemy throw an attack (a rock probably)
                        this.scene.time.delayedCall(100, () => {

                            // utilizza la classe army manager per chiamare il metodo per far attacc
                            armyManager.baseEnemyAttack()
                        })

                        const call = this.scene.time.delayedCall(1500, () => {

                            if (!currEnemy || !currEnemy.active) return;

                            if (this.isEnemyIntoTriggerZone(currEnemy, enemyStoppingZone)) {
                                const enemyPosition = this.checkWhereEnemyIsIntoTriggerZone(currEnemy, enemyStoppingZone);
                                currEnemy && currEnemy.setMoving(true)


                                if (enemyPosition === EnumPositionTriggerZone.moreRight) {

                                    if (!currEnemy || !currEnemy.active) return;
                                    // currEnemy.flipX = true;
                                    currEnemy && currEnemy.setTexture(`${type}Dude_walk_reverse`);
                                    currEnemy && currEnemy.play(`${type}Walk_infinite_reverse`);
                                    currEnemy && currEnemy.setVelocityX(-150);
                                    if (currEnemy) currEnemy.flipX = true;
                                    currEnemy && currEnemy.setZoneState(TriggerZoneState.repositioning);
                                }
                                if (enemyPosition === EnumPositionTriggerZone.moreLeft) {

                                    if (!currEnemy || !currEnemy.active) return;
                                    //  currEnemy.flipX = true;
                                    currEnemy && currEnemy.setTexture(`${type}Dude_walk`);
                                    currEnemy && currEnemy.play(`${type}Walk_infinite`);
                                    currEnemy && currEnemy.setVelocityX(150);
                                    currEnemy && currEnemy.setZoneState(TriggerZoneState.repositioning);
                                }

                                // Dopo un certo periodo di riposizionamento, torna allo stato di arresto
                                this.scene.time.delayedCall(100, () => {
                                    if (!currEnemy || !currEnemy.active) return;

                                    currEnemy && currEnemy.setZoneState(TriggerZoneState.none);
                                    currEnemy && currEnemy.setMovingFunction(null)
                                });
                            }
                        });
                        currEnemy && currEnemy.setMovingFunction(call)
                        break;

                    case TriggerZoneState.repositioning :
                        break;
                    case TriggerZoneState.repositioned:
                        break;
                    case TriggerZoneState.stopping:
                        break;
                }
            },
            (zone, enemy) => {
                console.log(zone)
                let currEnemy = enemy as BaseEnemy;
                if (currEnemy.getIsDeath()) {
                    return false
                } else
                    return true;
            },
            this
        )
    }


    private calculateDelay(indexEnemy: number) {
        if (indexEnemy === 0) return 1000
        if (indexEnemy === 1) return 1200
        if (indexEnemy === 2) return 1400
        if (indexEnemy === 3) return 1600
        if (indexEnemy === 4) return 1700
        if (indexEnemy === 5) return 1800
        return 100
    }


    // prende i bounds della trigger zone e confrontarli con lo coord x e y del nemico
    private isEnemyIntoTriggerZone(enemy: BaseEnemy, stoppingZone: Zone) {

        if (enemy && enemy.body) {
            console.log("sono dentro isEnemyIntoTriggerZone")
            let triggerZoneBounds = stoppingZone.getBounds();
            console.log("è il nemico dentro la zone trigger ?? --->", triggerZoneBounds.contains(enemy.body.x, enemy.body.y))
            return triggerZoneBounds.contains(enemy.body.x, enemy.body.y)
        }


        console.error("impossibile trovare il body del nemico per vedere se si trova dentro la trigger zone. Potrebbe essere appena morto")
    }


    private checkWhereEnemyIsIntoTriggerZone(enemy: BaseEnemy, enemyStoppingZone: Zone) {

        let triggerZoneBounds = enemyStoppingZone.getBounds();
        const centerXZone = triggerZoneBounds.centerX


        if (enemy && enemy.body && enemy.body?.x > centerXZone) {
            return EnumPositionTriggerZone.moreRight
        }

        if (enemy && enemy.body && enemy.body?.x < centerXZone) {
            return EnumPositionTriggerZone.moreLeft
        }

        if (enemy && enemy.body && enemy.body?.x === centerXZone) {
            let r = Math.random();
            return r <= 0.5 ? EnumPositionTriggerZone.moreLeft : EnumPositionTriggerZone.moreRight
        }

        throw new Error("impossibile stabilire dove si trova il nemico. dentro o fuori la trigger zone ??")
    }
}