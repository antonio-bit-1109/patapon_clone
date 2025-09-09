import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import {EnvironmentManager} from "../manager/EnvironmentManager.ts";
import {DudesArmyManager} from "../manager/DudesArmyManager.ts";
import {InputKeyboardManager} from "../manager/InputKeyboardManager.ts";
import {SoundsManager} from "../manager/SoundsManager.ts";


export class Gameplay extends Phaser.Scene {

    private oldDudesTypes: string[] = []
    private environmentManager: EnvironmentManager;
    private dudesArmyManager: DudesArmyManager;
    private inputKeyboardManager: InputKeyboardManager;

    constructor() {
        super(sceneName.gameplay);
        this.environmentManager = new EnvironmentManager(this);
        this.dudesArmyManager = new DudesArmyManager(this);
        this.inputKeyboardManager = new InputKeyboardManager(this);

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
        this.inputKeyboardManager.createInputKeys()
    }


    update() {
        // this.environmentManager.update()

    }
}