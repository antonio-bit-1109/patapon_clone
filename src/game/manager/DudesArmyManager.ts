import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import {PinkDude} from "../entities/PinkDude.ts";
import {WhiteDude} from "../entities/WhiteDude.ts";
import {BlueDude} from "../entities/BlueDude.ts";

export class DudesArmyManager {

    private dudesArmyGameplay_group: Phaser.GameObjects.Group;
    private dudeDataPreviousScene: string[];
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;

    }

    create(dudeDataPreviousScene: string[]) {
        this.dudeDataPreviousScene = dudeDataPreviousScene;
        this.dudesArmyGameplay_group = this.scene.add.group();
        this.createDudesArmy()
    }

    public createDudesArmy() {

        this.dudeDataPreviousScene.forEach(typeDudes => {

            let distance = Math.floor(Math.random() * (250 - 50 + 1) + 50)

            console.log(typeDudes)

            let dudeGameplay: Sprite;

            if (typeDudes === "pink") {
                dudeGameplay = new PinkDude(
                    this.scene,
                    50 + distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else if (typeDudes === "white") {
                dudeGameplay = new WhiteDude(
                    this.scene,
                    50 + distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else if (typeDudes === "blue") {
                dudeGameplay = new BlueDude(
                    this.scene,
                    50 + distance,
                    (this.scene.game.config.height as number) - (90 as number),
                    this.checkAndChangeTexture(typeDudes)
                )
            } else {
                throw new Error("errore durante inizializzazione del dude. tipo passato sconosciuto. --> " + typeDudes)
            }

            dudeGameplay
                .setScale(3)
                .setDepth(1)
                .play(this.addCorrectAnimation(typeDudes))

            this.dudesArmyGameplay_group.add(dudeGameplay);
            
        })
    }

    public getDudesArmy() {
        return this.dudesArmyGameplay_group
    }

    public checkAndChangeTexture(type: string): string {
        if (type.includes("pink")) {
            return "pinkDude_idle_spritesheet";
        }
        if (type.includes("white")) {
            return "whiteDude_idle_spritesheet";
        }
        if (type.includes("blue")) {
            return "blueDude_idle_spritesheet";
        }

        // Se nessuna delle condizioni è vera, significa che c'è un errore nei dati.
        // Lancia un errore chiaro per fermare il gioco e informare lo sviluppatore.
        throw new Error(`Tipo di texture non riconosciuto: "${type}"`);
    }

    public addCorrectAnimation(type: string) {
        if (type.includes("pink")) {
            return "pinkDude_waiting"
        }

        if (type.includes("white")) {
            return "whiteDude_waiting"
        }

        if (type.includes("blue")) {
            return "blueDude_waiting"
        }

        throw new Error(`Tipo di key-animazione non riconosciuto: "${type}"`);
    }
}