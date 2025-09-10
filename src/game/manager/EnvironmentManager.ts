import {Scene} from "phaser";


export class EnvironmentManager {

    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;
    private phisicsTerrain: Phaser.GameObjects.Rectangle;
    private scene: Phaser.Scene

    constructor(scene: Scene) {
        this.scene = scene;
    }

    create() {
        this.backgroundLooping = this.scene.add
            .tileSprite(0, 0, this.scene.sys.game.config.width as number, this.scene.sys.game.config.height as number, "background_looping")
            .setOrigin(0.0)

        this.terrainLooping = this.scene.add.tileSprite(
            0,
            (this.scene.game.config.height as number) - (70 as number),
            this.scene.sys.game.config.width as number,
            100,
            "terrain_looping")
            .setOrigin(0.0)

        this.phisicsTerrain = this.scene.add.rectangle(
            0,
            (this.scene.game.config.height as number) - (40 as number),
            this.scene.sys.game.config.width as number,
            100,
        ).setOrigin(0.0)

        this.scene.physics.add.existing(this.phisicsTerrain)
    }

    update() {
        // this.backgroundLooping.tilePositionX += 0.1;
        // this.terrainLooping.tilePositionX += 0.8
    }

    public moveTerrain() {
        this.scene.add.tween({
            targets: this.terrainLooping,
            duration: 1700,
            tilePositionX: '+=300',
        })

    }

    public moveBackground() {
        this.scene.add.tween({
            targets: this.backgroundLooping,
            duration: 1700,
            tilePositionX: '+=40',
        })
    }

    public applyGravityForceToSprite(nX: number, nY: number, sprite: Phaser.Physics.Arcade.Sprite) {
        if (sprite && sprite.body) {
            sprite.body.gravity.x = nX;
            sprite.body.gravity.y = nY;
        }
    }

    // public removeGravityForce(n: number) {
    //     let currGravity = this.scene.physics.world.gravity.y
    //     this.scene.physics.world.gravity.y = currGravity - n;
    // }
    //
    // public resetGravityZero() {
    //     this.scene.physics.world.gravity.y = 0;
    // }
}