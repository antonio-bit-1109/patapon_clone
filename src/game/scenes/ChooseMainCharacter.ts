import {sceneName} from "../global/global_constant.ts";
import {CommonMethodsClass} from "./CommonMethodsClass.ts";
import Sprite = Phaser.GameObjects.Sprite;
import {SoundsManager} from "../manager/SoundsManager.ts";


export class ChooseMainCharacter extends Phaser.Scene {


    private goNextRef: Phaser.GameObjects.Image;
    // @ts-ignore
    private goBackRef: Phaser.GameObjects.Image;
    private blueDudeRef: Phaser.GameObjects.Sprite;
    private pinkDudeRef: Phaser.GameObjects.Sprite;
    private whiteDudeRef: Phaser.GameObjects.Sprite;
    private arrayDudes: Phaser.GameObjects.Sprite[] = [];
    private positionYCopy: number = 698;
    private possiblePositionsCopies = [300, 400, 500, 600, 700]
    private notificationOnDelete: Phaser.GameObjects.Text;

    constructor() {
        super(sceneName.choosemaincharacter);
    }

    init() {

    }

    preload() {
    }

    create() {

        SoundsManager.playSound("choosing_player")

        CommonMethodsClass.addText(
            this,
            CommonMethodsClass.adjustWidth(2, this),
            CommonMethodsClass.adjustHeight(10, this),
            "Choose a combination of 5 For Your Army.",
            {
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '45px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            },
            {x: 0.5, y: 0.5})

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
            },
            {x: 0.5, y: 0.5}
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
            },
            {x: 0.5, y: 0.5}
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
            },
            {x: 0.5, y: 0.5}
        )

        this.notificationOnDelete = this.add
            .text(
                CommonMethodsClass.adjustWidth(2, this),
                CommonMethodsClass.adjustHeight(1.3, this),
                "click on the dude down here to remove it from the army.", {
                    color: '#e70d0d',
                    stroke: '#e70d0d',
                    fontSize: '18px',
                    strokeThickness: 1,
                    fontFamily: "pataponFont"
                }
            )
            .setOrigin(0.5, 0.5)
            .setVisible(false)

        this.whiteDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(8, this), CommonMethodsClass.adjustHeight(2.5, this), "whiteDude_idle_spritesheet")
            .setScale(4)
            .play("whiteDude_waiting")
            .setData("type", "white")
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.whiteDudeRef)
            })

        this.pinkDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(2, this), CommonMethodsClass.adjustHeight(2.5, this), "pinkDude_idle_spritesheet")
            .setScale(4)
            .play("pinkDude_waiting")
            .setData("type", "pink")
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.pinkDudeRef)
            })

        this.blueDudeRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(1.1, this), CommonMethodsClass.adjustHeight(2.5, this), "blueDude_idle_spritesheet")
            .setScale(4)
            .play("blueDude_waiting")
            .setData("type", "blue")
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.addSpriteIntoArray(this.blueDudeRef)
            })

        this.goNextRef = this.add
            .sprite(CommonMethodsClass.adjustWidth(1.1, this), CommonMethodsClass.adjustHeight(1.1, this), "arrow_pulsing_spritesheet")
            .play("arrow_pulsing")
            .setScale(4)
            .setVisible(false)
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {

                SoundsManager.stopSound("choosing_player")

                this.scene.start(sceneName.gameplay, {
                    dudesArmy: this.arrayDudes.map(dude => dude.getData("type"))
                })
            })

        this.goBackRef = this.add
            .sprite(
                CommonMethodsClass.adjustWidth(8, this),
                CommonMethodsClass.adjustHeight(1.1, this),
                "arrow_pulsing_spritesheet"
            ).play("arrow_pulsing")
            .setScale(4)
            .setRotation(Phaser.Math.DegToRad(180))
            .setVisible(true)
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {

                SoundsManager.stopSound("choosing_player")
                this.arrayDudes.length = 0;
                this.scene.stop(sceneName.choosemaincharacter)
                this.scene.start(sceneName.maintitle)
            })
    }

    addSpriteIntoArray(sprite: Phaser.GameObjects.Sprite) {
        if (this.arrayDudes.length >= 5) {
            console.log("array pieno.")
            return;
        }


        const spriteCopy: Sprite = this.add
            .sprite(this.findNextAvailablePosition(), this.positionYCopy, sprite.texture)
            .play(sprite.anims.currentAnim?.key as string)
            .setScale(3)
            .setData("type", sprite.getData("type"))
            .setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                this.removeSpriteFromArray(spriteCopy)
            })

        this.arrayDudes.push(spriteCopy)

    }


    private findNextAvailablePosition(): number {
        // 1. Ottieni un array di tutte le posizioni X già occupate
        const occupiedPositions = this.arrayDudes.map(dude => dude.x);

        // 2. Trova la prima posizione in `possiblePositionsCopies` che NON è presente
        //    nell'array delle posizioni occupate.

        let notOccupatedPosition = this.possiblePositionsCopies.find(pos => !occupiedPositions.includes(pos))
        return notOccupatedPosition ?? 500;
    }

    removeSpriteFromArray(spriteToRemove: Phaser.GameObjects.Sprite) {
        // Prima distruggi lo sprite per rimuoverlo dalla scena
        spriteToRemove.destroy();

        // Poi crea un nuovo array escludendo lo sprite rimosso
        this.arrayDudes = this.arrayDudes.filter(sprite => sprite !== spriteToRemove);
    }

    canShowNextBtn() {
        if (this.arrayDudes.length === 5) {
            this.goNextRef.setVisible(true)
        } else {
            this.goNextRef.setVisible(false)
        }
    }

    private showNotificationDeleteArmyDudes() {
        if (this.arrayDudes.length > 0) {
            this.notificationOnDelete.setVisible(true)
        } else {
            this.notificationOnDelete.setVisible(false)
        }
    }

    update() {
        this.canShowNextBtn()
        this.showNotificationDeleteArmyDudes()
    }

}