import {Scene} from "phaser";
import {PinkDude} from "../entities/PinkDude.ts";
import {WhiteDude} from "../entities/WhiteDude.ts";
import {BlueDude} from "../entities/BlueDude.ts";
import Group = Phaser.GameObjects.Group;
import {ActionsManager} from "./ActionsManager.ts";
import {WeaponManager} from "./WeaponManager.ts";
import {dudeponTypes, weaponTypes} from "../global/global_constant.ts";
import {EnvironmentManager} from "./EnvironmentManager.ts";


export class DudesArmyManager {

    private dudesArmyGameplay_group: Phaser.GameObjects.Group;
    private dudeDataPreviousScene: string[];
    private readonly scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;

    }

    public getDudesArmy(): Group {
        return this.dudesArmyGameplay_group
    }


    create(dudeDataPreviousScene: string[]) {
        this.dudeDataPreviousScene = dudeDataPreviousScene;
        this.dudesArmyGameplay_group = this.scene.add.group();
        this.createDudesArmy()
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

    public attackDudes(actionsManager: ActionsManager, weaponManager: WeaponManager, environmentManager: EnvironmentManager) {
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
                    const arrow = weaponManager.createPhysicsThrowWeapon(
                        "arrow",
                        currentDude.x + 20,
                        currentDude.y + 20,
                        250,
                        -500,
                        weaponTypes.arrow,
                        null
                    )
                    environmentManager.applyGravityForceToSprite(50, 500, arrow)
                    environmentManager.addColliderWithTerrain(arrow)
                })
            }

            if (type === dudeponTypes.pink) {
                currentDude.setTexture("pinkDude_throw_rock")
                currentDude.play(`${type}_throw_rock`);

                currentDude.once('animationcomplete', () => {
                    currentDude.setTexture(`${type}Dude_idle_spritesheet`)
                    currentDude.play(`${type}Dude_waiting`)
                    actionsManager.setIsActionInProgress(false)
                    const rock = weaponManager.createPhysicsThrowWeapon(
                        "rock",
                        currentDude.x,
                        currentDude.y,
                        250,
                        -500,
                        weaponTypes.rock,
                        2
                    )
                    environmentManager.applyGravityForceToSprite(60, 700, rock)
                    environmentManager.addColliderWithTerrain(rock)
                })
            }

            return true;
        })
    }

    public defendDudes() {
    }

    public jumpDudes() {
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