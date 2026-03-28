import {Scene} from "phaser";
import {CommonMethodsClass} from "../scenes/CommonMethodsClass.ts";

export class LegendaManager {

    private readonly scaleReduction: number = 0.2;
    private readonly scene: Scene;
    private readonly xS = 50;
    private readonly yS = 150;
    private readonly yIncr = 50;
    private readonly gameStyle = {
        color: '#030303',
        stroke: '#000000',
        strokeThickness: 1,
        fontSize: '30px', // Ora puoi aggiungere anche questa
        fontFamily: "pataponFont"
    }

    constructor(scene: Scene) {
        this.scene = scene;
    }


    public showCommands() {
        this.showAttackCommand()
        this.showMoveCommand()
        this.showJumpCommand()
    }

    private showMoveCommand() {
        CommonMethodsClass.addImage(this.scene, this.xS, this.yS, "stamp_a", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 2, this.yS, "stamp_a", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 3, this.yS, "stamp_a", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 4, this.yS, "stamp_d", this.scaleReduction)
        CommonMethodsClass.addText(this.scene, this.xS * 6, this.yS, "MOVE", this.gameStyle, {x: 0.5, y: 0.5})

    }

    private showAttackCommand() {
        CommonMethodsClass.addImage(this.scene, this.xS, this.yS + this.yIncr, "stamp_d", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 2, this.yS + this.yIncr, "stamp_d", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 3, this.yS + this.yIncr, "stamp_a", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 4, this.yS + this.yIncr, "stamp_d", this.scaleReduction)
        CommonMethodsClass.addText(this.scene, this.xS * 6, this.yS + this.yIncr, "ATTACK", this.gameStyle, {
            x: 0.5,
            y: 0.5
        })

    }

    private showJumpCommand() {
        CommonMethodsClass.addImage(this.scene, this.xS, this.yS + (this.yIncr * 2), "stamp_s", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 2, this.yS + (this.yIncr * 2), "stamp_s", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 3, this.yS + (this.yIncr * 2), "stamp_w", this.scaleReduction)
        CommonMethodsClass.addImage(this.scene, this.xS * 4, this.yS + (this.yIncr * 2), "stamp_w", this.scaleReduction)
        CommonMethodsClass.addText(this.scene, this.xS * 6, this.yS + (this.yIncr * 2), "JUMP", this.gameStyle, {
            x: 0.5,
            y: 0.5
        })
    }
}