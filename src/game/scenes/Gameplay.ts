import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";

export class Gameplay extends Phaser.Scene {


    private dudesArmyGameplay_array: Phaser.GameObjects.Sprite[] = [];
    private dudesArmyGameplay_group: Phaser.GameObjects.Group;
    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;
    private phisicsTerrain: Phaser.GameObjects.Rectangle;

    constructor() {
        super(sceneName.gameplay);

    }

    init(data: IData) {

        data.dudesArmy.forEach(dudeCopy => {
            const dudeGameplay = this.physics.add.sprite(0, 0, dudeCopy.texture.key).setScale(dudeCopy.scale)
            this.dudesArmyGameplay_array.push(dudeGameplay)
        })
    }

    preload() {
    }

    create() {

        this.dudesArmyGameplay_group = this.add.group();

        for (const dude of this.dudesArmyGameplay_array) {
            this.dudesArmyGameplay_group.add(dude);
        }

        this.backgroundLooping = this.add
            .tileSprite(0, 0, this.sys.game.config.width as number, this.sys.game.config.height as number, "background_looping")
            .setOrigin(0.0)

        this.terrainLooping = this.add.tileSprite(
            0,
            (this.game.config.height as number) - (70 as number),
            this.sys.game.config.width as number,
            100,
            "terrain_looping")
            .setOrigin(0.0)

        this.phisicsTerrain = this.add.rectangle(
            0,
            (this.game.config.height as number) - (40 as number),
            this.sys.game.config.width as number,
            100,
        ).setOrigin(0.0)

        this.physics.add.existing(this.phisicsTerrain)

    }

    update() {
        this.backgroundLooping.tilePositionX += 0.1;
        this.terrainLooping.tilePositionX += 0.8
    }
}