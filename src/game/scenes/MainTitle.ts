import Phaser from "phaser";
import {assetPath, sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {IStyleText} from "../global/interface.ts";
import {SoundsManager} from "./SoundsManager.ts";


export class MainTitle extends Phaser.Scene {


    private text: Phaser.GameObjects.Text;
    private text2: Phaser.GameObjects.Text;
    private logo: Phaser.GameObjects.Image;


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

        SoundsManager.playSound("intro_sound");

        this.logo = this.add.image(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(2, this), "main_bg")
            .setScale(0.8)

        CommonMethodsClass.chainTweens(
            this,
            this.logo,
            -1,
            [
                {
                    delay: 500,
                    angle: 10,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 900,
                    angle: -10,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 900,
                    angle: 0,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 1800,
                    duration: 200,
                    scale: 2,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 200,
                    scale: 0.7,
                    ease: 'Bounce.easeOut'
                },

                {
                    delay: 4000,
                    duration: 200,
                    scale: 2,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 200,
                    scale: 0.7,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 4200,
                    duration: 200,
                    scale: 2,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 200,
                    scale: 0.7,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 4000,
                    duration: 200,
                    scale: 2,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 200,
                    scale: 0.7,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 4200,
                    scale: 1,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 400,
                    scale: 1.2,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 400,
                    scale: 1.4,
                    duration: 200,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 300,
                    scale: 1,
                    duration: 100,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 100,
                    scale: 0.9,
                    duration: 100,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 100,
                    scale: 0.7,
                    duration: 100,
                    ease: 'Bounce.easeOut'
                },
                {
                    delay: 2200,
                    duration: 200,
                    scale: 2,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 200,
                    scale: 0.7,
                    ease: 'Bounce.easeOut'
                },
                {
                    duration: 7300,
                    scale: 0.7,
                }
            ]
        )

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
            SoundsManager.stopSound("intro_sound")
            this.scene.stop(sceneToStop);
            this.scene.start(sceneToStart)
        }
    }

    public update() {
    }
}