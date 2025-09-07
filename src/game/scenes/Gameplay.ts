import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import Sprite = Phaser.GameObjects.Sprite;

export class Gameplay extends Phaser.Scene {

    private oldDudesTypes: string[] = []
    // private dudesArmyGameplay_array: Phaser.GameObjects.Sprite[] = [];
    private dudesArmyGameplay_group: Phaser.GameObjects.Group;
    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;
    private phisicsTerrain: Phaser.GameObjects.Rectangle;


    constructor() {
        super(sceneName.gameplay);

    }

    init(data: IData) {

        this.oldDudesTypes = data.dudesArmy

    }

    preload() {
    }

    create() {

        this.dudesArmyGameplay_group = this.add.group();

        this.oldDudesTypes.forEach(typeDudes => {

            let distance = Math.floor(Math.random() * (250 - 50 + 1) + 50)

            const dudeGameplay: Sprite = this.physics.add.sprite(
                50 + distance,
                (this.game.config.height as number) - (90 as number),
                this.checkAndChangeTexture(typeDudes)
            )
                .setScale(3)
                .setDepth(1)
                .play(this.addCorrectAnimation(typeDudes))


            this.dudesArmyGameplay_group.add(dudeGameplay);
        })

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

    public checkAndChangeTexture(type: string): string {

        if (type.includes("pink")) {
            return "pinkDude_idle_spritesheet"
        }

        if (type.includes("white")) {
            return "whiteDude_idle_spritesheet"
        }

        if (type.includes("blue")) {
            return "blueDude_idle_spritesheet"
        }

        return "default";
    }

    public addCorrectAnimation(type) {
        if (type.includes("pink")) {
            return "pinkDude_waiting"
        }

        if (type.includes("white")) {
            return "whiteDude_waiting"
        }

        if (type.includes("blue")) {
            return "blueDude_waiting"
        }
    }

    update() {
        this.backgroundLooping.tilePositionX += 0.1;
        this.terrainLooping.tilePositionX += 0.8
    }
}