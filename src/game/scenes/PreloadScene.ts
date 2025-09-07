import Phaser from "phaser";
import {sceneName} from "../global/global_constant.ts";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super(sceneName.preloadscene);
    }


    preload() {

    }

    create() {
        this.scene.start(sceneName.maintitle)
    }
}