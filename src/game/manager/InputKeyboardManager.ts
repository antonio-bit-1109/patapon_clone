import {Scene} from "phaser";
import {SoundsManager} from "./SoundsManager.ts";

export class InputKeyboardManager {

    private w: Phaser.Input.Keyboard.Key | undefined;
    private a: Phaser.Input.Keyboard.Key | undefined;
    private s: Phaser.Input.Keyboard.Key | undefined;
    private d: Phaser.Input.Keyboard.Key | undefined;
    private inputsContainer: string[] = []
    private readonly scene: Scene;

    public constructor(scene: Scene) {
        this.scene = scene;
    }


    public createInputKeys() {
        this.w = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.w?.on('down', () => {
                console.log("hai premuto w")
                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("w");
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("W_sound")
                }
            }
        );

        this.a?.on('down', () => {
                console.log("hai premuto a")
                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("a");
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("A_sound")
                }
            }
        );

        this.s?.on('down', () => {

                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("s");
                    console.log("hai premuto s")
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("S_sound")
                }

            }
        );

        this.d?.on('down', () => {

                if (this.inputsContainer.length < 4) {
                    this.inputsContainer.push("d");
                    console.log("hai premuto d")
                    console.log(this.inputsContainer)
                    SoundsManager.playSound("D_sound")
                }

            }
        );


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