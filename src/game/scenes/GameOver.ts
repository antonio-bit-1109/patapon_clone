import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {sceneName} from "../global/global_constant.ts";

export class GameOver extends Phaser.Scene {

    constructor() {
        super(sceneName.gameover);
    }

    init() {
        // non utilizzata
    }

    preload() {
        // non utilizzata
    }

    create() {
        CommonMethodsClass.addText(this, 500, 500, "GAME OVER", {
                color: '#cf6bd7',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            },
            {x: 0.5, y: 0.5})
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}