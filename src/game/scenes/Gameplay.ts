import {actions, sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import {EnvironmentManager} from "../manager/EnvironmentManager.ts";
import {DudesArmyManager} from "../manager/DudesArmyManager.ts";
import {InputKeyboardManager} from "../manager/InputKeyboardManager.ts";
import {SoundsManager} from "../manager/SoundsManager.ts";
import {ActionsManager} from "../manager/ActionsManager.ts";


export class Gameplay extends Phaser.Scene {

    private oldDudesTypes: string[] = []
    private environmentManager: EnvironmentManager;
    private dudesArmyManager: DudesArmyManager;
    private inputKeyboardManager: InputKeyboardManager;
    private actionsManager: ActionsManager;


    constructor() {
        super(sceneName.gameplay);
        this.environmentManager = new EnvironmentManager(this);
        this.dudesArmyManager = new DudesArmyManager(this);
        this.inputKeyboardManager = new InputKeyboardManager(this);
        this.actionsManager = new ActionsManager(this);

    }

    init(data: IData) {
        this.oldDudesTypes = data.dudesArmy
    }

    preload() {
    }


    create() {

        SoundsManager.playSound("march_gameplay_1");

        this.environmentManager.create();
        this.dudesArmyManager.create(this.oldDudesTypes)
        this.inputKeyboardManager.create()
    }


    update(time: number, delta: number) {

        this.actionsManager.update(this.inputKeyboardManager.getInputsContainer())

        if (this.actionsManager.getActionToPerform()) {

            let action = this.actionsManager.getActionToPerform()

            switch (action) {
                case actions.move :
                    this.dudesArmyManager.moveDudes(this.actionsManager)
                    this.environmentManager.moveTerrain()
                    this.environmentManager.moveBackground()
                    break;

                case actions.attack :
                    this.dudesArmyManager.attackDudes()
                    break;

                case actions.defend :
                    this.dudesArmyManager.defendDudes()
                    break;

                case actions.jump :
                    this.dudesArmyManager.jumpDudes()
                    break;
                default:
                    this.dudesArmyManager.idleDudes(this.actionsManager)
                    console.log("nessuna azione dudes in idle")
                    break;
            }
            this.actionsManager.resetActionToPerform();
            this.inputKeyboardManager.resetInputsContainer()
        }

    }
}