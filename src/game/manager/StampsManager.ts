import {Scene} from "phaser";
import {CommonMethodsClass} from "../scenes/CommonMethodsClass.ts";
import Image = Phaser.GameObjects.Image;

export class StampsManager {

    private scene: Scene;
    private stamp_w_ref: Phaser.GameObjects.Image;
    private stamp_a_ref: Phaser.GameObjects.Image;
    private stamp_s_ref: Phaser.GameObjects.Image;
    private stamp_d_ref: Phaser.GameObjects.Image;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    getStampRefW() {
        return this.stamp_w_ref
    }

    getStampRefA() {
        return this.stamp_a_ref
    }


    getStampRefS() {
        return this.stamp_s_ref
    }

    getStampRefD() {
        return this.stamp_d_ref
    }

    public showStamp(ref: Image) {

        this.scene.add.tween({
            targets: ref,
            duration: 80,
            scale: 0.6

        })

        ref.setVisible(true)
        this.scene.time.delayedCall(200, () => {
            ref.setVisible(false)
            ref.setScale(0.9)
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
            .setScale(0.9)
            .setRotation(Phaser.Math.DegToRad(26))
            .setVisible(false)

        this.stamp_a_ref = this.scene.add
            .image(
                CommonMethodsClass.adjustWidth(9, this.scene),
                CommonMethodsClass.adjustHeight(2, this.scene),
                "stamp_a"
            )
            .setDepth(1)
            .setScale(0.9)
            .setRotation(Phaser.Math.DegToRad(-26))
            .setVisible(false)

        this.stamp_s_ref = this.scene.add
            .image(
                CommonMethodsClass.adjustWidth(2, this.scene),
                CommonMethodsClass.adjustHeight(1.2, this.scene),
                "stamp_s"
            )
            .setDepth(1)
            .setScale(0.9)
            .setRotation(Phaser.Math.DegToRad(-26))
            .setVisible(false)


        this.stamp_d_ref = this.scene.add
            .image(
                CommonMethodsClass.adjustWidth(1.2, this.scene),
                CommonMethodsClass.adjustHeight(2, this.scene),
                "stamp_d"
            )
            .setDepth(1)
            .setScale(0.9)
            .setRotation(Phaser.Math.DegToRad(26))
            .setVisible(false)
    }
}