import {Scene} from "phaser";

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
                this.inputsContainer.length < 4 && this.inputsContainer.push("w");
                console.log(this.inputsContainer)
            }
        );

        this.a?.on('down', () => {
                console.log("hai premuto a")
                this.inputsContainer.length < 4 && this.inputsContainer.push("a");
                console.log(this.inputsContainer)
            }
        );

        this.s?.on('down', () => {
                console.log("hai premuto s")
                this.inputsContainer.length < 4 && this.inputsContainer.push("s");
                console.log(this.inputsContainer)
            }
        );

        this.d?.on('down', () => {
                console.log("hai premuto d")
                this.inputsContainer.length < 4 && this.inputsContainer.push("d");
                console.log(this.inputsContainer)
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