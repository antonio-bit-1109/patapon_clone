import Phaser from "phaser";
import {assetPath, assetPathSound, sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {SoundsManager} from "./SoundsManager.ts";


export class PreloadScene extends Phaser.Scene {

    constructor() {
        super(sceneName.preloadscene);
    }


    addFrameWidthHeight(h: number, w: number) {
        return {frameHeight: h, frameWidth: w}
    }

    preload() {
        this.load.spritesheet("pinkDude_walk", assetPath + "/pinkDude/Pink_Monster_Walk_6.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("blueDude_walk", assetPath + "/blueDude/Dude_Monster_Walk_6.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("whiteDude_walk", assetPath + "/whiteDude/Owlet_Monster_Walk_6.png", this.addFrameWidthHeight(32, 32))

        this.load.spritesheet("pinkDude_stand", assetPath + "/pinkDude/Pink_Monster.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("blueDude_stand", assetPath + "/blueDude/Dude_Monster.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("whiteDude_stand", assetPath + "/whiteDude/Owlet_Monster.png", this.addFrameWidthHeight(32, 32))

        this.load.spritesheet("pinkDude_idle_spritesheet", assetPath + "/pinkDude/Pink_Monster_Idle_4.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("blueDude_idle_spritesheet", assetPath + "/blueDude/Dude_Monster_Idle_4.png", this.addFrameWidthHeight(32, 32))
        this.load.spritesheet("whiteDude_idle_spritesheet", assetPath + "/whiteDude/Owlet_Monster_Idle_4.png", this.addFrameWidthHeight(32, 32))


        this.load.spritesheet("arrow_pulsing_spritesheet", assetPath + "/arrow_pulsing.png", this.addFrameWidthHeight(21, 28))

        this.load.image("background_looping", assetPath + "/background_seamless.jpeg")
        this.load.image("terrain_looping", assetPath + "/terrain_seamless.png")

        this.load.audio("intro_sound", assetPathSound + "/intros/Beat_of_the_Drums_0.mp3")

    }

    create() {

        // load all the animations a need in the game
        CommonMethodsClass.createAnimation(this, "pinkWalk", "pinkDude_walk", 0, 5, -1)
        CommonMethodsClass.createAnimation(this, "blueWalk", "blueDude_walk", 0, 5, -1)
        CommonMethodsClass.createAnimation(this, "whiteWalk", "whiteDude_walk", 0, 5, -1)
        CommonMethodsClass.createAnimation(this, "arrow_pulsing", "arrow_pulsing_spritesheet", 0, 19, -1)

        CommonMethodsClass.createAnimation(this, "pinkDude_waiting", "pinkDude_idle_spritesheet", 0, 3, -1)
        CommonMethodsClass.createAnimation(this, "blueDude_waiting", "blueDude_idle_spritesheet", 0, 3, -1)
        CommonMethodsClass.createAnimation(this, "whiteDude_waiting", "whiteDude_idle_spritesheet", 0, 3, -1)

        SoundsManager.addAudio("intro_sound", {volume: 1, loop: true}, this)

        this.scene.start(sceneName.maintitle)


    }
}