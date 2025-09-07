import {sceneName} from "../global/global_constant.ts";

export class ChooseMainCharacter extends Phaser.Scene {

    private canvasW: number;
    private canvasH: number;

    constructor() {
        super(sceneName.choosemaincharacter);
    }

    init() {
        this.canvasW = this.sys.game.config.width as number;
        this.canvasH = this.sys.game.config.height as number;
    }

    preload() {
    }

    create() {
    }

    update() {
    }
}