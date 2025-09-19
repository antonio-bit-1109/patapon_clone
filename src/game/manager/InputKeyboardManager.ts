import {Scene} from "phaser";
import {SoundsManager} from "./SoundsManager.ts";
import {StampsManager} from "./StampsManager.ts";
import {CommonMethodsClass} from "../scenes/CommonMethodsClass.ts";
import Group = Phaser.GameObjects.Group;

export class InputKeyboardManager {

    private w: Phaser.Input.Keyboard.Key | undefined;
    private a: Phaser.Input.Keyboard.Key | undefined;
    private s: Phaser.Input.Keyboard.Key | undefined;
    private d: Phaser.Input.Keyboard.Key | undefined;
    private p: Phaser.Input.Keyboard.Key | undefined;
    private inputsContainer: string[] = []
    private readonly positionInputsX = [400, 500, 600, 700]
    private readonly scene: Scene;
    private stampsManager: StampsManager;
    private refInputs_group: Group;


    public constructor(scene: Scene) {
        this.scene = scene;
        this.stampsManager = new StampsManager(scene)

    }

    public create() {
        this.stampsManager.create()
        this.refInputs_group = this.scene.add.group()
        this.createInputKeys()
    }


    public createInputKeys() {
        this.w = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.p = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        this.w?.on('down', () => {
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
        this.inputsContainer.map((s, index) => {

                switch (s) {

                    case "w":
                        // if (this.w_ref) return
                        // this.w_ref =

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
                        // if (this.a_ref) return
                        // this.a_ref =

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
                        // if (this.s_ref) return
                        // this.s_ref =
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
                        // if (this.d_ref) return
                        // this.d_ref =

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

    public updateStatusInputContainer() {
        if (this.inputsContainer.length === 0) {

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

    update() {


    }


}