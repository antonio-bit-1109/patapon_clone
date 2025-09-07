import {sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";

export class ChooseMainCharacter extends Phaser.Scene {


    count: number = 0;
    blueDudeRef: Phaser.GameObjects.Sprite;
    pinkDudeRef: Phaser.GameObjects.Sprite;
    whiteDudeRef: Phaser.GameObjects.Sprite;

    constructor() {
        super(sceneName.choosemaincharacter);
    }

    init() {

    }

    preload() {
    }

    create() {

        CommonMethodsClass.addText(
            this,
            CommonMethodsClass.adjustWidth(2, this),
            CommonMethodsClass.adjustHeight(10, this),
            "Choose a combination of 5 For Your Army.",
            {
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            })

        CommonMethodsClass.addText(
            this,
            CommonMethodsClass.adjustWidth(8.5, this),
            CommonMethodsClass.adjustHeight(3.5, this),
            "WHITE",
            {
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            }
        )

        CommonMethodsClass.addText(
            this,
            CommonMethodsClass.adjustWidth(2, this),
            CommonMethodsClass.adjustHeight(3.5, this),
            "PINK",
            {
                color: '#cf6bd7',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            }
        )

        CommonMethodsClass.addText(
            this,
            CommonMethodsClass.adjustWidth(1.1, this),
            CommonMethodsClass.adjustHeight(3.5, this),
            "BLUE",
            {
                color: '#1d8ede',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '50px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            }
        )

        this.whiteDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(8, this), CommonMethodsClass.adjustHeight(2.5, this), "whiteDude_stand")
            .setScale(4)
            .play("whiteWalk")

        this.pinkDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(2.5, this), "pinkDude_stand")
            .setScale(4)
            .play("pinkWalk")
        this.blueDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(1.1, this), CommonMethodsClass.adjustHeight(2.5, this), "blueDude_stand")
            .setScale(4)
            .play("blueWalk")


    }

    update() {
    }
}