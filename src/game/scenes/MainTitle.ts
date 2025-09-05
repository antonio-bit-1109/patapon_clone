import Phaser from "phaser";
import {IStyleText, sceneName} from "../global/global_constant.ts";


export class MainTitle extends Phaser.Scene {

    private canvasW: number;
    private canvasH: number;
    private text: Phaser.GameObjects.Text;
    private text2: Phaser.GameObjects.Text;


    private style: IStyleText = {
        color: '#ffffff', // <-- Colore bianco, il più importante!
        stroke: '#ffffff', // Aggiunge un bordo nero per maggiore leggibilità
        strokeThickness: 0.5
    }

    constructor() {
        super(sceneName.maintitle);
    }

    public adjustWidth(n: number) {
        return this.canvasW / n
    }

    public adjustHeight(n: number) {
        return this.canvasH / n
    }

    public init() {
        this.canvasW = this.sys.game.config.width as number;
        this.canvasH = this.sys.game.config.height as number;
    }

    public preload() {
        this.load.image("main_bg", "assets/dudepon/dudepon_main.jpeg")

    }

    private addTweens(duration: number, target: any, scale: number, ease: string) {
        this.tweens.add({
            duration: duration,
            targets: target,
            scale: scale,
            ease: ease
        })
    }

    public create() {
        this.add.image(this.adjustWidth(2), this.adjustHeight(2), "main_bg")
            .setScale(0.8)

        this.text = this.add.text(this.adjustWidth(2), this.adjustHeight(1.8), "New Game",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)
            .setInteractive({cursor: "pointer"})
            .once("pointerdown", this.startAndStopScene(this.scene.key, sceneName.choosemaincharacter))
            .on("pointerover", () => {
                this.addTweens(500, this.text, 6, "Power2")
            })
            .on("pointerout", () => {
                this.addTweens(500, this.text, 5, "Power2")
            })

        this.text2 = this.add.text(this.adjustWidth(2), this.adjustHeight(1.5), "Continue",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)
            .setInteractive({cursor: "pointer"})
            .once("pointerdown", () => {
                console.log("stai avviando il continua.")
            })
            .on("pointerover", () => {
                this.addTweens(500, this.text2, 6, "Power2")
            })
            .on("pointerout", () => {
                this.addTweens(500, this.text2, 5, "Power2")
            })
    }
    
    public startAndStopScene(sceneToStop: string, sceneToStart: string) {
        return () => {
            this.scene.stop(sceneToStop);
            this.scene.start(sceneToStart)
        }
    }

    public update() {
    }
}