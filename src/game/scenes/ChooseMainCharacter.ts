import {sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";

export class ChooseMainCharacter extends Phaser.Scene {


    private blueDudeRef: Phaser.GameObjects.Sprite;
    private pinkDudeRef: Phaser.GameObjects.Sprite;
    private whiteDudeRef: Phaser.GameObjects.Sprite;
    private arrayDudes: Phaser.GameObjects.Sprite[] = [];
    private positionXCopy: number = 300;
    private positionYCopy: number = 698;
    private possiblePositionsCopies = [300, 400, 500, 600, 700]

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
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.whiteDudeRef)
            })

        this.pinkDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(2.5, this), "pinkDude_stand")
            .setScale(4)
            .play("pinkWalk")
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.pinkDudeRef)
            })

        this.blueDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(1.1, this), CommonMethodsClass.adjustHeight(2.5, this), "blueDude_stand")
            .setScale(4)
            .play("blueWalk")
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.blueDudeRef)
            })


    }

    addSpriteIntoArray(sprite: Phaser.GameObjects.Sprite) {
        if (this.arrayDudes.length >= 5) {
            console.log("array pieno.")
            return;
        }


        const spriteCopy = this.add
            .sprite(this.findNextAvailablePosition(), this.positionYCopy, sprite.texture)
            .play(sprite.anims.currentAnim?.key)
            .setScale(3)
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.removeSpriteFromArray(spriteCopy)
            })

        this.arrayDudes.push(spriteCopy)

    }


    private findNextAvailablePosition(): number | undefined {
        // 1. Ottieni un array di tutte le posizioni X già occupate
        const occupiedPositions = this.arrayDudes.map(dude => dude.x);

        // 2. Trova la prima posizione in `possiblePositionsCopies` che NON è presente
        //    nell'array delle posizioni occupate.
        return this.possiblePositionsCopies.find(pos => !occupiedPositions.includes(pos));
    }

    removeSpriteFromArray(spriteToRemove: Phaser.GameObjects.Sprite) {
        // Prima distruggi lo sprite per rimuoverlo dalla scena
        spriteToRemove.destroy();

        // Poi crea un nuovo array escludendo lo sprite rimosso
        this.arrayDudes = this.arrayDudes.filter(sprite => sprite !== spriteToRemove);
    }

    update() {
    }
}