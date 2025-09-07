import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";

export class Gameplay extends Phaser.Scene {


    private dudesArmyGameplay: Phaser.GameObjects.Sprite[] = [];
    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;

    constructor() {
        super(sceneName.gameplay);
    }

    init(data: IData) {

        data.dudesArmy.forEach(dudeCopy => {
            const dudeGameplay = this.physics.add.sprite(0, 0, dudeCopy.texture.key).setScale(dudeCopy.scale)
            this.dudesArmyGameplay.push(dudeGameplay)
        })
    }

    preload() {
    }

    create() {

        this.backgroundLooping = this.add
            .tileSprite(0, 0, this.sys.game.config.width as number, this.sys.game.config.height as number, "background_looping")
            .setOrigin(0.0)

        this.terrainLooping = this.add
            .tileSprite(0, (this.game.config.height as number) - (70 as number), this.sys.game.config.width as number, 100, "terrain_looping")
            .setOrigin(0.0)
    }

    update() {
        this.backgroundLooping.tilePositionX += 0.1;
        this.terrainLooping.tilePositionX += 0.8
    }
}