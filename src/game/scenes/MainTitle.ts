import Phaser from "phaser";
import {assetPath, sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {IStyleText} from "../global/interface.ts";


export class MainTitle extends Phaser.Scene {


    private text: Phaser.GameObjects.Text;
    private text2: Phaser.GameObjects.Text;


    private style: IStyleText = {
        color: '#ffffff', // <-- Colore bianco, il più importante!
        stroke: '#ffffff', // Aggiunge un bordo nero per maggiore leggibilità
        strokeThickness: 0.1,
        fontFamily: "pataponFont"
    }

    constructor() {
        super(sceneName.maintitle);
    }

    public init() {
    }

    public preload() {
        this.load.image("main_bg", assetPath + "/dudepon_main.jpeg")

    }

    public create() {
        this.add.image(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(2, this), "main_bg")
            .setScale(0.8)

        this.text = this.add.text(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(1.8, this), "New Game",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)
            .setInteractive({cursor: "pointer"})
            .once("pointerdown", this.startAndStopScene(this.scene.key, sceneName.choosemaincharacter))
            .on("pointerover", () => {
                CommonMethodsClass.addTweens(500, this.text, 6, "Power2", this)
            })
            .on("pointerout", () => {
                CommonMethodsClass.addTweens(500, this.text, 5, "Power2", this)
            })

        this.text2 = this.add.text(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(1.5, this), "Continue",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)
            .setInteractive({cursor: "pointer"})
            .once("pointerdown", () => {
                console.log("stai avviando il continua.")
            })
            .on("pointerover", () => {
                CommonMethodsClass.addTweens(500, this.text2, 6, "Power2", this)
            })
            .on("pointerout", () => {
                CommonMethodsClass.addTweens(500, this.text2, 5, "Power2", this)
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