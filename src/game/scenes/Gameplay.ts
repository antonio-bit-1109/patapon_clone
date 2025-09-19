import {actions, sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import {EnvironmentManager} from "../manager/EnvironmentManager.ts";
import {ArmyManager} from "../manager/ArmyManager.ts";
import {InputKeyboardManager} from "../manager/InputKeyboardManager.ts";
import {SoundsManager} from "../manager/SoundsManager.ts";
import {ActionsManager} from "../manager/ActionsManager.ts";
import {LifePointsManager} from "../manager/LifePointsManager.ts";
import {WeaponManager} from "../manager/WeaponManager.ts";


export class Gameplay extends Phaser.Scene {

    private oldDudesTypes: string[] = []
    private environmentManager: EnvironmentManager;
    private dudesArmyManager: ArmyManager;
    private inputKeyboardManager: InputKeyboardManager;
    private actionsManager: ActionsManager;
    private lifePointsManager: LifePointsManager;
    private weaponManager: WeaponManager;


    constructor() {
        super(sceneName.gameplay);
        this.environmentManager = new EnvironmentManager(this);
        this.dudesArmyManager = new ArmyManager(this);
        this.inputKeyboardManager = new InputKeyboardManager(this);
        this.actionsManager = new ActionsManager(this);
        this.lifePointsManager = new LifePointsManager(this);
        this.weaponManager = new WeaponManager(this);
    }

    init(data: IData) {
        this.oldDudesTypes = data.dudesArmy
    }

    preload() {
    }


    create() {

        SoundsManager.playSound("march_gameplay_1");

        this.environmentManager.create();
        this.dudesArmyManager.generatePlayerArmy(this.oldDudesTypes) // creation playerdudes
        this.dudesArmyManager.generateEnemyArmy(3)
        this.lifePointsManager.createLifeBars(this.dudesArmyManager.getDudesArmy())
        this.lifePointsManager.createLifeBars(this.dudesArmyManager.getDudesEnemyArmy())
        this.inputKeyboardManager.create()
        this.environmentManager.checkOverlapWithEnemyStoppingZone(this.dudesArmyManager.getDudesEnemyArmy())
    }


    update(_time: number, _delta: number) {

        this.lifePointsManager.updatePositionBar(this.dudesArmyManager.getDudesArmy())
        this.lifePointsManager.updatePositionBar(this.dudesArmyManager.getDudesEnemyArmy())
        this.inputKeyboardManager.showStatusInputContainer()
        this.inputKeyboardManager.updateStatusInputContainer()

        //  this.lifePointsManager.updateLifeBarPosition(this.dudesArmyManager.getDudesEnemyArmy())
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
                    this.dudesArmyManager.attackDudes(
                        this.dudesArmyManager.getDudesEnemyArmy(),
                        this.actionsManager,
                        this.weaponManager,
                        this.environmentManager,
                        this.lifePointsManager
                    )
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