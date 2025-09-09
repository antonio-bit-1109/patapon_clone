import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;

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

            const dudeGameplay: Sprite = this.scene.physics.add.sprite(
                50 + distance,
                (this.scene.game.config.height as number) - (90 as number),
                this.checkAndChangeTexture(typeDudes)
            )
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