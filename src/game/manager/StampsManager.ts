import {Scene} from "phaser";
import {CommonMethodsClass} from "../scenes/CommonMethodsClass.ts";
import Image = Phaser.GameObjects.Image;

export class StampsManager {

    private scene: Scene;
    private stamp_w_ref: Phaser.GameObjects.Image;
    private stamp_a_ref: Phaser.GameObjects.Image;


    constructor(scene: Scene) {
        this.scene = scene;
    }

    getStampRefW() {
        return this.stamp_w_ref
    }

    getStampRefA() {
        return this.stamp_a_ref
    }

    public showStamp(ref: Image) {
        ref.setVisible(true)
        this.scene.time.delayedCall(500, () => {
            ref.setVisible(false)
        })
    }


    create() {

        this.stamp_w_ref = this.scene.add
            .image(
                CommonMethodsClass.adjustWidth(2, this.scene),
                CommonMethodsClass.adjustHeight(9.5, this.scene),
                "stamp_w"
            )
            .setDepth(1)
            .setScale(0.5)
            .setRotation(Phaser.Math.DegToRad(26))
            .setVisible(false)

        this.stamp_a_ref = this.scene.add
            .image(
                CommonMethodsClass.adjustWidth(9, this.scene),
                CommonMethodsClass.adjustHeight(2, this.scene),
                "stamp_a"
            )
            .setDepth(1)
            .setScale(0.5)
            .setRotation(Phaser.Math.DegToRad(-26))
            .setVisible(false)
    }
}