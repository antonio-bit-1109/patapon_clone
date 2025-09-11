import {Scene} from "phaser";
import {actions} from "../global/global_constant.ts";

export class ActionsManager {

    // @ts-ignore
    private scene: Scene;
    private isActionInProgress: boolean = false;
    private actionToPerform: string | null = null;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    // getter setter
    public getIsActionInProgress() {
        return this.isActionInProgress
    }

    public setIsActionInProgress(value: boolean) {
        this.isActionInProgress = value;
    }

    public getActionToPerform() {
        return this.actionToPerform
    }

    public resetActionToPerform() {
        this.actionToPerform = null;
    }

    //----------------------

    public update(arrayKeyboard: string[]) {

        if (this.isActionInProgress) return;

        if (this.isActionDoable(arrayKeyboard)) {
            this.performAction(arrayKeyboard)
        } else {
            console.log("nessun azione performabile.  ---> pienezza array: " + arrayKeyboard.length)
        }
    }


    public isActionDoable(arrayKeyboard: string[]) {
        return arrayKeyboard.length === 4;
    }

    public performAction(arrayKeyboard: string[]) {
        this.isActionInProgress = true;

        let action: string = "";

        arrayKeyboard.forEach(key => {
            action += key
        })


        switch (action) {
            case "aaad":
                console.log("i dudes si muovono")
                this.actionToPerform = actions.move
                break;
            case "ddad":
                console.log("i dudes attaccano")
                this.actionToPerform = actions.attack
                break;
            case "wwad":
                console.log("i dudes difendono")
                this.actionToPerform = actions.defend
                break;
            case "wwss":
                console.log("i dudes saltano")
                this.actionToPerform = actions.jump
                break;
            default:
                console.log("i dudes stanno in idle")
                this.actionToPerform = actions.idle
                break;
        }

    }
}