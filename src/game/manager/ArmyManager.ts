import {Scene} from "phaser";
import {PinkDude} from "../entities/players/child/PinkDude.ts";
import {WhiteDude} from "../entities/players/child/WhiteDude.ts";
import {BlueDude} from "../entities/players/child/BlueDude.ts";
import {ActionsManager} from "./ActionsManager.ts";
import {WeaponManager} from "./WeaponManager.ts";
import {dudeponTypes, weaponTypes} from "../global/global_constant.ts";
import {EnvironmentManager} from "./EnvironmentManager.ts";
import {BaseEnemy} from "../entities/players/root/BaseEnemy.ts";
import {Rock} from "../entities/weapons/Rock.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {LifePointsManager} from "./LifePointsManager.ts";
import Group = Phaser.GameObjects.Group;
import {EnemyDude} from "../entities/players/child/EnemyDude.ts";
import {InteractionManager} from "./InteractionManager.ts";
import {InputKeyboardManager} from "./InputKeyboardManager.ts";
import {Shuriken} from "../entities/weapons/Shuriken.ts";


export class ArmyManager {

    private dudesArmyGameplay_group: Group;
    private dudesArmyEnemy_group: Group;
    private dudeDataPreviousScene: string[];
    private readonly scene: Scene;


    constructor(scene: Scene) {
        this.scene = scene;

    }

    public getDudesArmy() {
        return this.dudesArmyGameplay_group
    }

    public getDudesEnemyArmy() {
        return this.dudesArmyEnemy_group;
    }


    public generatePlayerArmy(dudeDataPreviousScene: string[]) {
        this.dudeDataPreviousScene = dudeDataPreviousScene;
        this.dudesArmyGameplay_group = this.scene.add.group();
        this.createDudesArmy()

    }

    public generateEnemyArmy(numberEnemy: number) {
        this.dudesArmyEnemy_group = this.scene.add.group()
        this.createEnemyDudesArmy(numberEnemy)
    }


    public createDudesArmy() {

        let indexDude = 0;
        let distance = 100;

        this.dudeDataPreviousScene.forEach(typeDudes => {


            console.log(typeDudes)

            let dudeGameplay: Phaser.Physics.Arcade.Sprite;

            if (typeDudes === "pink") {
                dudeGameplay = new PinkDude(
                    this.scene,
                    distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else if (typeDudes === "white") {
                dudeGameplay = new WhiteDude(
                    this.scene,
                    distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else if (typeDudes === "blue") {
                dudeGameplay = new BlueDude(
                    this.scene,
                    distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else {
                throw new Error("errore durante inizializzazione del dude. tipo passato sconosciuto. --> " + typeDudes)
            }

            dudeGameplay
                .setScale(3)
                .setDepth(1)
                .setData("indexDude", indexDude)
                .play(this.addCorrectAnimation(typeDudes))

            this.dudesArmyGameplay_group.add(dudeGameplay);
            indexDude++
            distance += 50;
            console.log(dudeGameplay)
        })
    }

    public createEnemyDudesArmy(numberEnemy: number) {
        let index = 0;
        let distance = 2000

        for (let i = 0; i < numberEnemy; i++) {
            let enemy = new EnemyDude(
                this.scene,
                distance,
                (this.scene.game.config.height as number) - (90 as number),
                this.checkAndChangeTexture(dudeponTypes.pink)
            )
            enemy
                .setScale(3)
                .setDepth(1)
                .setData("indexEnemy", index)
                .setFlipX(true)
                .play(this.addCorrectAnimation(dudeponTypes.pink))

            this.dudesArmyEnemy_group.add(enemy);

            console.log(enemy)
            index++
            distance -= 50;
        }

        this.scene.time.delayedCall(3000, () => {
            this.dudesArmyEnemy_group.children.iterate(enemy => {
                const currEnemy = enemy as EnemyDude
                let type = currEnemy.getType()
                currEnemy.setTexture(`${type}Dude_walk`)
                currEnemy.play(`${type}Walk_infinite`)
                currEnemy.setVelocityX(-150)
                currEnemy.setMoving(true);
                return true;
            })
        })

    }


    public moveDudes(actionsManager: ActionsManager) {

        this.dudesArmyGameplay_group.children.iterate((dude) => {
            const currentDude = dude as PinkDude | WhiteDude | BlueDude;
            let type = currentDude.getType();
            currentDude.play(`${type}Walk`)
            currentDude.once("animationcomplete", () => {
                currentDude.setTexture(`${type}Dude_idle_spritesheet`)
                currentDude.play(`${type}Dude_waiting`)
                actionsManager.setIsActionInProgress(false)
            })
            return true;
        })

    }

    public baseEnemyAttack(
        enemy: EnemyDude,
        environmentManager: EnvironmentManager,
        weaponManager: WeaponManager,
        interactionManager: InteractionManager,
        lifePointManager: LifePointsManager,
    ) {

        enemy.setTexture("pinkDude_throw_rock")
        enemy.play("pink_throw_rock")
            .on("animationcomplete", () => {
                const shuriken = weaponManager.createPhysicsThrowWeapon(
                    "shuriken",
                    enemy.x + 20,
                    enemy.y + 20,
                    250,
                    -500,
                    weaponTypes.shuriken,
                    0.022
                )

                this.scene.add.tween({
                    targets: shuriken,
                    duration: 4000,
                    rotation: 270
                })

                enemy.setTexture("pinkDude_idle_spritesheet")
                    .play("pinkDude_waiting")
                if (shuriken instanceof Shuriken) {
                    shuriken && shuriken.setOwnerBaseDamage(enemy.getDamage())
                    shuriken && enemy.setWeapon(shuriken)
                    shuriken && environmentManager.applyVelocityToWeapon(shuriken, -200, 0)
                    shuriken && interactionManager.checkCollisionBetweenShurikenAndPlayerGroup(this.getDudesArmy(), shuriken, lifePointManager)
                }
            })

    }


    public attackDudes(
        enemyGroup: Phaser.GameObjects.Group,
        actionsManager: ActionsManager,
        weaponManager: WeaponManager,
        environmentManager: EnvironmentManager,
        lifePointManager: LifePointsManager,
        interactionManager: InteractionManager,
        inputKeyboardManager: InputKeyboardManager
    ) {
        // @ts-ignore
        this.dudesArmyGameplay_group.children.iterate((dude) => {
            const currentDude = dude as PinkDude | WhiteDude | BlueDude;

            let type = currentDude.getType();

            if (type === dudeponTypes.blue) {

                currentDude.y -= 15;
                currentDude.x += 3;
                currentDude.setTexture(`${type}Dude_idle_attack`)
                currentDude.play(`${type}Dude_waiting_attack`)

                const throwArrowRef = this.scene.add
                    .sprite(currentDude.x - 10, currentDude.y + 10, "blueDude_arm_throw_arrow")
                    .setScale(2.5)
                    .play("blueDude_throw_arrow")
                    .setDepth(currentDude.depth)

                currentDude.once("animationcomplete", () => {
                    currentDude.y += 15;
                    currentDude.x -= 3;
                    currentDude.setTexture(`${type}Dude_idle_spritesheet`)
                    currentDude.play(`${type}Dude_waiting`)
                    throwArrowRef.destroy()
                    actionsManager.setIsActionInProgress(false)
                    const arrow: Arrow | Rock | Shuriken | null = weaponManager.createPhysicsThrowWeapon(
                        "arrow",
                        currentDude.x + 20,
                        currentDude.y + 20,
                        250,
                        -500,
                        weaponTypes.arrow,
                        null
                    )
                    if (currentDude instanceof BlueDude && arrow instanceof Arrow) {
                        arrow && arrow.setOwnerBaseDamage(currentDude.getDamage())
                        arrow && currentDude.setWeapon(arrow)
                        arrow && environmentManager.applyGravityForceToSprite(50, 500, arrow, inputKeyboardManager)
                        arrow && environmentManager.addColliderWithTerrain(arrow)
                        arrow && interactionManager.checkCollisionBetweenAllDudesAndWeapon(this.getDudesEnemyArmy(), arrow, lifePointManager)

                    }
                })
            }

            if (type === dudeponTypes.pink) {
                currentDude.setTexture("pinkDude_throw_rock")
                currentDude.play(`${type}_throw_rock`);

                currentDude.once('animationcomplete', () => {
                    currentDude.setTexture(`${type}Dude_idle_spritesheet`)
                    currentDude.play(`${type}Dude_waiting`)
                    actionsManager.setIsActionInProgress(false)
                    const rock: Arrow | Rock | Shuriken | null = weaponManager.createPhysicsThrowWeapon(
                        "rock",
                        currentDude.x,
                        currentDude.y,
                        250,
                        -500,
                        weaponTypes.rock,
                        2
                    )
                    if (currentDude instanceof PinkDude && rock instanceof Rock) {
                        rock && rock.setOwnerBaseDamage(currentDude.getDamage())
                        rock && currentDude.setWeapon(rock);
                        rock && environmentManager.applyGravityForceToSprite(60, 600, rock, inputKeyboardManager);
                        rock && environmentManager.addColliderWithTerrain(rock);
                        rock && interactionManager.checkCollisionBetweenAllDudesAndWeapon(this.getDudesEnemyArmy(), rock, lifePointManager)
                    }
                })
            }

            if (type === dudeponTypes.white) {

                const currDude = currentDude as WhiteDude
                const closestEnemy = this.scene.physics.closest(currentDude, enemyGroup.getChildren());
                const enemy = closestEnemy as BaseEnemy;

                if (!currDude || !currDude.body || !enemy || !enemy.body) return;


                let absoluteDistance = Math.abs(currDude.x - enemy.x);

                if (absoluteDistance > 800) return

                currDude.setTexture(`${type}Dude_walk`)
                currDude.play(`${type}Walk_infinite`)
                currDude.setInitialPosition(currDude.x, currDude.y)

                this.scene.add.tween({
                    targets: currDude,
                    duration: 1000,
                    x: enemy.x,

                    onComplete: () => {
                        currDude.setTexture(`${type}Dude_punch_attack`)
                        currDude.play(`${type}_attack_punch`)
                        currDude.once("animationcomplete", () => {
                            environmentManager.checkCollisionBetweenWhiteDudeAndEnemy(currDude, this.getDudesEnemyArmy(), lifePointManager)

                            currDude.setTexture(`${type}Dude_idle_spritesheet`)
                            currDude.play(`${type}Dude_waiting`)

                            this.scene.add.tween({
                                targets: currDude,
                                duration: 500,
                                x: currDude.getInitialPositionX(),

                                onComplete: () => {
                                    actionsManager.setIsActionInProgress(false)
                                    currDude.setHaveHitted(false)
                                }
                            })
                        })
                    }
                })
            }
            return true;
        })
    }

    public defendDudes() {
    }

    public jumpDudes(actionManager: ActionsManager) {

        this.dudesArmyGameplay_group.children.iterate(dude => {
            const currentDude = dude as PinkDude | WhiteDude | BlueDude;
            let type = currentDude.getType();
            currentDude.setInitialPosition(currentDude.x, currentDude.y);
            currentDude.setTexture(`${type}DudeJump`)

            // currentDude.setVelocityY(500)
            //
            // this.scene.add.tween({
            //     targets: currentDude,
            //     duration: 500,
            //     y: currentDude.getInitialPositionY(),
            //     onUpdate: () => {
            //         if (currentDude && currentDude.body && currentDude.body?.gravity.y !== 0) {
            //             currentDude.setGravityY(0)
            //
            //         }
            //     },
            //
            // })

            //
            // this.scene.time.delayedCall(300, () => {
            //     currentDude.setGravityY(+1000)
            //     this.scene.add.tween({
            //         targets: currentDude,
            //         duration: 500,
            //         y: currentDude.getInitialPositionY(),
            //         onComplete: () => {
            //             currentDude.setGravityY(0)
            //         }
            //     })
            // })
            currentDude.play(`${type}Dude_Do_Jump`)

            currentDude.on("animationcomplete", () => {
                currentDude.setTexture(`${type}Dude_idle_spritesheet`)
                currentDude.play(`${type}Dude_waiting`)
                actionManager.setIsActionInProgress(false)
            })

            return true;
        })
    }

    public idleDudes(actionsManager: ActionsManager) {
        this.dudesArmyGameplay_group.children.iterate((dude) => {
            const currentDude = dude as PinkDude | WhiteDude | BlueDude;
            let type = currentDude.getType();

            currentDude.setTexture(`${type}Dude_idle_spritesheet`)
            currentDude.play(`${type}Dude_waiting`)
            actionsManager.setIsActionInProgress(false)
            return true;
        })
    }


    public checkAndChangeTexture(type: string): string {
        if (type.includes(dudeponTypes.pink)) {
            return "pinkDude_idle_spritesheet";
        }
        if (type.includes(dudeponTypes.white)) {
            return "whiteDude_idle_spritesheet";
        }
        if (type.includes(dudeponTypes.blue)) {
            return "blueDude_idle_spritesheet";
        }

        // Se nessuna delle condizioni è vera, significa che c'è un errore nei dati.
        // Lancia un errore chiaro per fermare il gioco e informare lo sviluppatore.
        throw new Error(`Tipo di texture non riconosciuto: "${type}"`);
    }

    public addCorrectAnimation(type: string) {
        if (type.includes(dudeponTypes.pink)) {
            return "pinkDude_waiting"
        }

        if (type.includes(dudeponTypes.white)) {
            return "whiteDude_waiting"
        }

        if (type.includes(dudeponTypes.blue)) {
            return "blueDude_waiting"
        }

        throw new Error(`Tipo di key-animazione non riconosciuto: "${type}"`);
    }
}