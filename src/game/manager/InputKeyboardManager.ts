import {Scene} from "phaser";
import {SoundsManager} from "./SoundsManager.ts";
import {StampsManager} from "./StampsManager.ts";
import {CommonMethodsClass} from "../scenes/CommonMethodsClass.ts";
import Group = Phaser.GameObjects.Group;
import Image = Phaser.GameObjects.Image;

export class InputKeyboardManager {

    private w: Phaser.Input.Keyboard.Key | undefined;
    private a: Phaser.Input.Keyboard.Key | undefined;
    private s: Phaser.Input.Keyboard.Key | undefined;
    private d: Phaser.Input.Keyboard.Key | undefined;
    private p: Phaser.Input.Keyboard.Key | undefined;
    private readonly inputsContainer: string[] = []
    private readonly positionInputsX = [400, 500, 600, 700]
    private readonly scene: Scene;
    private readonly stampsManager: StampsManager;
    private refInputs_group: Group;
    private indexIteration = 0;
    private isKeysLocked = false;

    private centerXCircleCountDown: number = 100;
    private centerYCircleCountDown: number = 100;


    private circleCountDown_lower_ref: Phaser.GameObjects.Arc;
    private circleCountDown_upper_ref: Phaser.GameObjects.Graphics;
    private tween_ref: null | any = null;

    private switch_ref: Image;
    private switchText_ref: Phaser.GameObjects.Text;
    private isRangeLong: boolean = false;

    public getIsRangeLong() {
        return this.isRangeLong
    }

    public setIsRangeLong(val: boolean) {
        this.isRangeLong = val;
    }

    public setIsKeysLocked(val: boolean) {
        this.isKeysLocked = val;
    }

    public getIsKeysLocked() {
        return this.isKeysLocked
    }

    public constructor(scene: Scene) {
        this.scene = scene;
        this.stampsManager = new StampsManager(scene)

    }

    public create() {
        this.stampsManager.create()
        this.refInputs_group = this.scene.add.group()
        this.createInputKeys()
        this.createCircleCountDown()
    }


    public createSwitchArrowRange(arrOldDudeTypes: string[]) {

        if (!arrOldDudeTypes.some(string => string === "blue" || "pink")) {
            return
        }

        this.switchText_ref = this.scene.add.text(
            CommonMethodsClass.adjustWidth(1.2, this.scene),
            CommonMethodsClass.adjustHeight(15, this.scene),
            `Short range`,
            {
                color: '#e30d0d',
                stroke: '#000000',
                strokeThickness: 1,
                fontSize: '20px', // Ora puoi aggiungere anche questa
                fontFamily: "pataponFont"
            }
        )

        this.switch_ref = CommonMethodsClass.addImage(
            this.scene,
            CommonMethodsClass.adjustWidth(1.3, this.scene),
            CommonMethodsClass.adjustHeight(10, this.scene),
            "switch_off_image",
            0.2
        ).setInteractive({cursor: "pointer"})
            .on("pointerdown", () => {
                console.log("sto cliccando")

                if (this.getIsRangeLong()) {
                    this.switch_ref.setTexture("switch_off_image")
                    this.switchText_ref.setPosition(
                        CommonMethodsClass.adjustWidth(1.2, this.scene),
                        CommonMethodsClass.adjustHeight(15, this.scene)
                    ).setStyle({
                        color: '#e30d0d',
                        stroke: '#000000',
                        strokeThickness: 1,
                        fontSize: '20px', // Ora puoi aggiungere anche questa
                        fontFamily: "pataponFont"
                    }).setText(`Short range`)
                    this.setIsRangeLong(false)

                } else {
                    this.switch_ref.setTexture("switch_on_image")
                    this.switchText_ref.setPosition(
                        CommonMethodsClass.adjustWidth(1.2, this.scene),
                        CommonMethodsClass.adjustHeight(10, this.scene)
                    ).setStyle({
                        color: '#c99b28',
                        stroke: '#000000',
                        strokeThickness: 1,
                        fontSize: '20px', // Ora puoi aggiungere anche questa
                        fontFamily: "pataponFont"
                    }).setText(`Long range`)
                    this.setIsRangeLong(true)
                }

            })
    }

    public createInputKeys() {
        this.w = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.p = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        this.w?.on('down', () => {

                this.indexIteration++

                if (this.getIsKeysLocked()) return;

                console.log("hai premuto w")
                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("w");
                    this.stampsManager.showStamp(this.stampsManager.getStampRefW())
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("W_sound")
                }
            }
        );

        this.a?.on('down', () => {

                this.indexIteration++

                if (this.getIsKeysLocked()) return;

                console.log("hai premuto a")
                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("a");
                    this.stampsManager.showStamp(this.stampsManager.getStampRefA())
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("A_sound")
                }
            }
        );

        this.s?.on('down', () => {

                this.indexIteration++

                if (this.getIsKeysLocked()) return;

                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("s");
                    this.stampsManager.showStamp(this.stampsManager.getStampRefS())
                    console.log("hai premuto s")
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("S_sound")
                }

            }
        );

        this.d?.on('down', () => {

                this.indexIteration++

                if (this.getIsKeysLocked()) return;

                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("d");
                    this.stampsManager.showStamp(this.stampsManager.getStampRefD())

                    console.log("hai premuto d")
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("D_sound")
                }

            }
        );

        this.p?.on('down', () => {

                console.log("GIOCO IN PAUSA")

            }
        );
    }

    public showStatusInputContainer() {
        this.inputsContainer.forEach((s, index) => {

                switch (s) {

                    case "w":

                        const wRef = CommonMethodsClass.addImage(
                            this.scene,
                            this.positionInputsX[index],
                            CommonMethodsClass.adjustHeight(11, this.scene),
                            `stamp_${s}`,
                            0.3
                        )
                        this.refInputs_group.add(wRef)
                        break;

                    case "a":

                        const aRef = CommonMethodsClass.addImage(
                            this.scene,
                            this.positionInputsX[index],
                            CommonMethodsClass.adjustHeight(11, this.scene),
                            `stamp_${s}`,
                            0.3
                        )
                        this.refInputs_group.add(aRef)
                        break;

                    case "s":
                        const sRef = CommonMethodsClass.addImage(
                            this.scene,
                            this.positionInputsX[index],
                            CommonMethodsClass.adjustHeight(11, this.scene),
                            `stamp_${s}`,
                            0.3
                        )
                        this.refInputs_group.add(sRef)
                        break;

                    case "d":

                        const dRef = CommonMethodsClass.addImage(
                            this.scene,
                            this.positionInputsX[index],
                            CommonMethodsClass.adjustHeight(11, this.scene),
                            `stamp_${s}`,
                            0.3
                        )
                        this.refInputs_group.add(dRef)
                        break;
                }
            }
        )
    }

    private createCircleCountDown() {
        this.circleCountDown_lower_ref = this.scene.add.circle(
            this.centerXCircleCountDown,
            this.centerYCircleCountDown,
            20,
            0x008000,
            1
        ).setVisible(false)

        this.circleCountDown_upper_ref = this.scene.add.graphics()
            .setVisible(false)
    }

    private startCircleCountDown() {

        let degree = {deg: 270};

        if (this.tween_ref) return;

        this.tween_ref = this.scene.tweens.add({
            targets: degree,
            duration: 2500,
            deg: -90,
            onStart: () => {
                this.circleCountDown_upper_ref.setVisible(true);
                this.circleCountDown_lower_ref.setVisible(true);
            },
            onUpdate: () => {
                this.drawCirclePiece(degree.deg)
            },
            onComplete: () => {
                this.setIsKeysLocked(false)
                this.indexIteration = 0;
                this.tween_ref = null;
                this.circleCountDown_lower_ref.setVisible(false)
                this.circleCountDown_upper_ref.setVisible(false);
            }
        })
    }

    private drawCirclePiece(degreeValue: number) {

        this.circleCountDown_upper_ref.clear();
        this.circleCountDown_upper_ref.fillStyle(0xff0000, 1);
        this.circleCountDown_upper_ref.beginPath();
        this.circleCountDown_upper_ref.moveTo(
            this.centerXCircleCountDown,
            this.centerYCircleCountDown,
        )
        this.circleCountDown_upper_ref.arc(
            this.centerXCircleCountDown,
            this.centerYCircleCountDown,
            20,
            Phaser.Math.DegToRad(-90),
            Phaser.Math.DegToRad(degreeValue),
            false,
        );
        this.circleCountDown_upper_ref.fillPath();
        this.circleCountDown_upper_ref.strokePath();
    }

    public updateStatusInputContainer() {
        if (this.inputsContainer.length === 0) {

            if (this.indexIteration >= 4) {
                this.setIsKeysLocked(true)
                this.startCircleCountDown()
            }

            this.scene.time.delayedCall(500, () => {
                this.refInputs_group.clear(true, true);
            })

        }
    }

    public getInputsContainer() {
        return this.inputsContainer;
    }

    public resetInputsContainer() {
        this.inputsContainer.length = 0;
    }


}