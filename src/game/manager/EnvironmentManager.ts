import {Scene} from "phaser";
import {BaseEnemy} from "../entities/players/BaseEnemy.ts";
import {EnumPositionTriggerZone, TriggerZoneState} from "../global/global_constant.ts";
import Group = Phaser.GameObjects.Group;
import Zone = Phaser.GameObjects.Zone;
import {GeneralWeapon} from "../entities/weapons/GeneralWeapon.ts";
import {PinkDude} from "../entities/players/PinkDude.ts";
import {WhiteDude} from "../entities/players/WhiteDude.ts";
import {BlueDude} from "../entities/players/BlueDude.ts";
import {LifePointsManager} from "./LifePointsManager.ts";
import {Arrow} from "../entities/weapons/Arrow.ts";
import {Rock} from "../entities/weapons/Rock.ts";

export class EnvironmentManager {

    private backgroundLooping: Phaser.GameObjects.TileSprite;
    private terrainLooping: Phaser.GameObjects.TileSprite;
    private phisicsTerrain: Phaser.GameObjects.Rectangle;
    private scene: Phaser.Scene
    private enemyStoppingZone: Phaser.GameObjects.Zone

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

    checkOverlapWithEnemyStoppingZone(enemyGroup: Group) {
        console.log(enemyGroup)
        // @ts-ignore
        this.scene.physics.add.overlap(this.enemyStoppingZone, enemyGroup, this.collideCallBack_0, this.processCallback_0, this)
    }

    checkCollisionBetweenAllDudesAndWeapon(dudeGroup: Group, weapon: GeneralWeapon, lifePointsManager: LifePointsManager) {

        this.scene.physics.add.overlap(
            dudeGroup,
            weapon,
            (dude, weapon) => {
                let currDude = dude as BaseEnemy | PinkDude | WhiteDude | BlueDude;
                let wep = weapon as Rock | Arrow;

                lifePointsManager.takeDamage(currDude, wep)
              
            }, () => {
                return true
            }, this)
    }

    // private collisionCallBack_1(dude: BaseEnemy | PinkDude | WhiteDude | BlueDude, weapon: GeneralWeapon) {
    //
    // }
    //
    // private processCallBack_1() {
    //     return true;
    // }

    // @ts-ignore
    private collideCallBack_0(enemyStoppingZone: Zone, enemy: Phaser.Physics.Arcade.Sprite) {

        let currEnemy = enemy as BaseEnemy;
        const type = currEnemy.getType()

        switch (currEnemy.getZoneState()) {

            case TriggerZoneState.none:
                currEnemy.setZoneState(TriggerZoneState.stopping)

                this.scene.time.delayedCall(
                    this.calculateDelay(currEnemy.getData("indexEnemy"))
                    //   1000
                    , () => {
                        currEnemy.setMoving(false); //enemy arrived into trigger zone
                        currEnemy.setVelocity(0)
                        currEnemy.setTexture(`${type}Dude_idle_spritesheet`)
                        currEnemy.play(`${type}Dude_waiting`)
                        currEnemy.setZoneState(TriggerZoneState.stopped)
                    })
                break;

            case TriggerZoneState.stopped:

                if (currEnemy.getMovingFunction() !== null) return;

                const call = this.scene.time.delayedCall(1500, () => {


                    if (this.isEnemyIntoTriggerZone(currEnemy)) {
                        const enemyPosition = this.checkWhereEnemyIsIntoTriggerZone(currEnemy);
                        currEnemy.setMoving(true)


                        if (enemyPosition === EnumPositionTriggerZone.moreRight) {
                            // currEnemy.flipX = true;
                            currEnemy.setTexture(`${type}Dude_walk_reverse`);
                            currEnemy.play(`${type}Walk_infinite_reverse`);
                            currEnemy.setVelocityX(-150);
                            currEnemy.flipX = true;
                            currEnemy.setZoneState(TriggerZoneState.repositioning);
                        }
                        if (enemyPosition === EnumPositionTriggerZone.moreLeft) {
                            //  currEnemy.flipX = true;
                            currEnemy.setTexture(`${type}Dude_walk`);
                            currEnemy.play(`${type}Walk_infinite`);
                            currEnemy.setVelocityX(150);
                            currEnemy.setZoneState(TriggerZoneState.repositioning);
                        }

                        // Dopo un certo periodo di riposizionamento, torna allo stato di arresto
                        this.scene.time.delayedCall(100, () => {
                            currEnemy.setZoneState(TriggerZoneState.none);
                            currEnemy.setMovingFunction(null)
                        });
                    }
                });
                currEnemy.setMovingFunction(call)
                break;

            case TriggerZoneState.repositioning :
                break;
            case TriggerZoneState.repositioned:
                break;
            case TriggerZoneState.stopping:
                break;
        }


    }


    // prende i bounds della trigger zone e confrontarli con lo coord x e y del nemico
    private isEnemyIntoTriggerZone(enemy: BaseEnemy) {

        if (enemy && enemy.body) {
            console.log("sono dentro isEnemyIntoTriggerZone")
            let triggerZoneBounds = this.enemyStoppingZone.getBounds();
            console.log("è il nemico dentro la zone trigger ?? --->", triggerZoneBounds.contains(enemy.body.x, enemy.body.y))
            return triggerZoneBounds.contains(enemy.body.x, enemy.body.y)
        }


        throw new Error("impossibile trovare il body del nemico per vedere se si trova dentro la trigger zone.")
    }

    private checkWhereEnemyIsIntoTriggerZone(enemy: BaseEnemy) {

        let triggerZoneBounds = this.enemyStoppingZone.getBounds();
        const centerXZone = triggerZoneBounds.centerX


        if (enemy && enemy.body && enemy.body?.x > centerXZone) {
            return EnumPositionTriggerZone.moreRight
        }

        if (enemy && enemy.body && enemy.body?.x < centerXZone) {
            return EnumPositionTriggerZone.moreLeft
        }

        if (enemy && enemy.body && enemy.body?.x === centerXZone) {
            let r = Math.random();
            return r <= 0.5 ? EnumPositionTriggerZone.moreLeft : EnumPositionTriggerZone.moreRight
        }

        throw new Error("impossibile stabilire dove si trova il nemico. dentro o fuori la trigger zone ??")
    }

    // @ts-ignore
    private processCallback_0(enemyStoppingZone: Zone, enemy: Phaser.Physics.Arcade.Sprite) {
        return true;
    }

    private calculateDelay(indexEnemy: number) {
        if (indexEnemy === 0) return 1000
        if (indexEnemy === 1) return 1200
        if (indexEnemy === 2) return 1400
        if (indexEnemy === 3) return 1600
        if (indexEnemy === 4) return 1700
        if (indexEnemy === 5) return 1800
        return 100
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