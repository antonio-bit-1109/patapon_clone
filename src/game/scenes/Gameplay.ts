import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import {EnvironmentManager} from "../manager/EnvironmentManager.ts";
import {DudesArmyManager} from "../manager/DudesArmyManager.ts";


export class Gameplay extends Phaser.Scene {

    private oldDudesTypes: string[] = []
    // private dudesArmyGameplay_group: Phaser.GameObjects.Group;
    private environmentManager: EnvironmentManager;
    private dudesArmyManager: DudesArmyManager;


    constructor() {
        super(sceneName.gameplay);
        this.environmentManager = new EnvironmentManager(this);
        this.dudesArmyManager = new DudesArmyManager(this)
    }

    init(data: IData) {
        this.oldDudesTypes = data.dudesArmy
    }

    preload() {
    }

    create() {

        this.environmentManager.create();
        this.dudesArmyManager.create(this.oldDudesTypes)

    }


    update() {
        this.environmentManager.update()
    }
}