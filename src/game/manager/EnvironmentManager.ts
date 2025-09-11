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
        )
            .setOrigin(0.0)


        this.scene.physics.add.existing(this.phisicsTerrain)

        const terrainBody = this.phisicsTerrain.body as Phaser.Physics.Arcade.Body;
        terrainBody.setImmovable(true);
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


    public addColliderWithTerrain(sprite: Phaser.Physics.Arcade.Sprite) {
        this.scene.physics.add.collider(sprite, this.phisicsTerrain, this.collideCallback, this.processCallback, this)
    }

    // @ts-ignore
    private collideCallback(sprite: Phaser.Physics.Arcade.Sprite, terrain: Phaser.GameObjects.GameObject) {
        console.log("uno sprite ha colliso con il terreno --->", sprite.getData("arrow"))
        sprite.setVelocity(0, 0)
        this.scene.time.delayedCall(300, () => {
            sprite.destroy()
        })
    }


    private processCallback() {
        return true;
    }

}