import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {sceneName} from "../global/global_constant.ts";
import {SoundsManager} from "../manager/SoundsManager.ts";

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

        const w = this.sys.game.config.width as number;
        const h = this.game.config.height as number;
        CommonMethodsClass.addImage(this, w / 2, h / 2, "gameOver", 0.5);

        CommonMethodsClass.addTextInteractive(this, 500, 300, "NEW GAME", {
                color: '#cf6bd7',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            },
            {x: 0.5, y: 0.5},
            "pointerdown",
            "pointer",
            () => {
                this.scene.stop(sceneName.gameover)
                this.scene.start(sceneName.startthegame)
            }
        )

        SoundsManager.stopAllSounds();
        this.time.delayedCall(300, () => {
            SoundsManager.playSound("game_over");
        })
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}