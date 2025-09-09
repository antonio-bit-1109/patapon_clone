import Phaser from "phaser";
import {assetPath, assetPathSound, assetPathStamp, sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import {SoundsManager} from "../manager/SoundsManager.ts";


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
        this.load.image("stamp_w", assetPathStamp + "/timbro_w.png")
        this.load.image("stamp_a", assetPathStamp + "/timbro_a.png")

        this.load.audio("intro_sound", assetPathSound + "/intros/Beat_of_the_Drums_0_cut.mp3")
        this.load.audio("choosing_player", assetPathSound + "/intros/Beat_of_the_drums_1.mp3")
        this.load.audio("march_gameplay_1", assetPathSound + "/march/Groovy_March_1.mp3")

        this.load.audio("W_sound", assetPathSound + "/letters/W_letter.mp3")
        this.load.audio("A_sound", assetPathSound + "/letters/A_letter.mp3")
        this.load.audio("S_sound", assetPathSound + "/letters/S_letter.mp3")
        this.load.audio("D_sound", assetPathSound + "/letters/D_letter.mp3")

    }

    create() {

        // load all the animations a need in the game
        CommonMethodsClass.createAnimation(this, "pinkWalk", "pinkDude_walk", 0, 5, 2)
        CommonMethodsClass.createAnimation(this, "blueWalk", "blueDude_walk", 0, 5, 2)
        CommonMethodsClass.createAnimation(this, "whiteWalk", "whiteDude_walk", 0, 5, 2)
        CommonMethodsClass.createAnimation(this, "arrow_pulsing", "arrow_pulsing_spritesheet", 0, 19, -1)

        CommonMethodsClass.createAnimation(this, "pinkDude_waiting", "pinkDude_idle_spritesheet", 0, 3, -1)
        CommonMethodsClass.createAnimation(this, "blueDude_waiting", "blueDude_idle_spritesheet", 0, 3, -1)
        CommonMethodsClass.createAnimation(this, "whiteDude_waiting", "whiteDude_idle_spritesheet", 0, 3, -1)

        SoundsManager.addAudio("intro_sound", {volume: 1, loop: true}, this)
        SoundsManager.addAudio("choosing_player", {volume: 1, loop: true}, this)
        SoundsManager.addAudio("march_gameplay_1", {volume: 1, loop: false}, this)

        SoundsManager.addAudio("W_sound", {volume: 2, loop: false}, this)
        SoundsManager.addAudio("A_sound", {volume: 2, loop: false}, this)
        SoundsManager.addAudio("S_sound", {volume: 2, loop: false}, this)
        SoundsManager.addAudio("D_sound", {volume: 2, loop: false}, this)

        this.scene.start(sceneName.maintitle)


    }
}