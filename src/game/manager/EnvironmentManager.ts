import {Scene} from "phaser";
import Group = Phaser.GameObjects.Group;
import {WhiteDude} from "../entities/players/child/WhiteDude.ts";
import {LifePointsManager} from "./LifePointsManager.ts";
import {EnemyDude} from "../entities/players/child/EnemyDude.ts";
import {InputKeyboardManager} from "./InputKeyboardManager.ts";

export class EnvironmentManager {

    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;
    private phisicsTerrain: Phaser.GameObjects.Rectangle;
    private scene: Phaser.Scene
    private enemyStoppingZone: Phaser.GameObjects.Zone

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public getEnemyStoppingZone() {
        return this.enemyStoppingZone
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


        this.enemyStoppingZone = this.scene.add.zone(
            700,
            (this.scene.game.config.height as number) - (90 as number),
            500,
            120
        )

        this.scene.physics.add.existing(this.enemyStoppingZone)


    }

    update() {
    }


    public checkCollisionBetweenWhiteDudeAndEnemy(whiteDude: WhiteDude, enemyDudeGroup: Group, lifePointsManager: LifePointsManager) {
        this.scene.physics.add.overlap(
            whiteDude,
            enemyDudeGroup,
            (playerDude, enemyDude) => {

                const whiteDude = playerDude as WhiteDude;
                const enemy = enemyDude as EnemyDude;

                lifePointsManager.takeDamage(enemy, null, whiteDude)
                whiteDude.setHaveHitted(true);
            },

            (playerDude) => {

                const whiteDude = playerDude as WhiteDude;
                if (!whiteDude.getHaveHitted()) {
                    return true;
                }

                return false;

            },
            this
        )
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

    public applyGravityForceToSprite(gX: number, gY: number, sprite: Phaser.Physics.Arcade.Sprite, inputKeyboardManager: InputKeyboardManager) {
        if (!sprite || !sprite.body) return

        if (inputKeyboardManager.getIsRangeLong()) {
            gX = gX - 20;
            gY = gY - 100
        } else {
            gX = gX + 10;
            gY = gY + 50;
        }

        sprite.body.gravity.x = gX;
        sprite.body.gravity.y = gY;
    }

    public addColliderWithTerrain(sprite: Phaser.Physics.Arcade.Sprite) {
        // @ts-ignore
        this.scene.physics.add.collider(sprite, this.phisicsTerrain, this.collideCallback, this.processCallback, this)
    }

    // @ts-ignore
    private collideCallback(sprite: Phaser.Physics.Arcade.Sprite, terrain: Phaser.GameObjects.GameObject) {

        console.log("uno sprite ha colliso con il terreno")
        sprite.setVelocity(0, 0)
        this.scene.time.delayedCall(300, () => {
            sprite.destroy()
        })
    }


    private processCallback() {
        return true;
    }

}