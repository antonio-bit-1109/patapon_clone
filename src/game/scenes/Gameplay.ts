import {sceneName} from "../global/global_constant.ts";
import {IData} from "../global/interface.ts";
import Sprite = Phaser.GameObjects.Sprite;

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
            this.dudesArmyGameplay_array.push(dudeCopy);
        })
    }

    preload() {
    }

    create() {

        this.dudesArmyGameplay_group = this.add.group();

        this.dudesArmyGameplay_array.forEach(dudeCopy => {
            const dudeGameplay: Sprite = this.physics.add.sprite(
                100,
                (this.game.config.height as number) - (90 as number),
                this.checkAndChangeTexture(dudeCopy.texture.key)
            )
                .setData('')
                .setScale(dudeCopy.scale)
                .setDepth(1)
                .play("")

            console.log(dudeCopy.getData("type"))
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

    public checkAndChangeTexture(texture: string): string {

        if (texture.includes("pink")) {
            return "pinkDude_idle_spritesheet"
        }

        if (texture.includes("white")) {
            return "whiteDude_idle_spritesheet"
        }

        if (texture.includes("blue")) {
            return "blueDude_idle_spritesheet"
        }

        throw new Error("no old texture found.")
        return "null";
    }

    public addCorrectAnimation()

    update() {
        this.backgroundLooping.tilePositionX += 0.1;
        this.terrainLooping.tilePositionX += 0.8
    }
}