import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {sceneName} from "../global/global_constant.ts";

export class StartTheGame extends Phaser.Scene {


    constructor() {
        super(sceneName.startthegame);
    }

    init() {
    }

    preload() {
    }

    create() {

        this.add.text(
            CommonMethodsClass.adjustWidth(2, this),
            CommonMethodsClass.adjustHeight(2, this),
            "Press Here To Start The Game", {
                color: '#e70d0d',
                stroke: '#e70d0d',
                fontSize: '60px',
                strokeThickness: 1,
                fontFamily: "pataponFont"
            }
        )
            .setOrigin(0.5, 0.5)
            .setInteractive({cursor: "pointer"})
            .once("pointerdown", () => {
                this.scene.stop()
                this.scene.start(sceneName.maintitle)
            })

    }

    update() {
    }
}