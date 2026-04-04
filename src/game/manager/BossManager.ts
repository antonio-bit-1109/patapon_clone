import {Scene} from "phaser";
import {Boss} from "../entities/players/child/Boss.ts";
import Zone = Phaser.GameObjects.Zone;
import {LifePointsManager} from "./LifePointsManager.ts";
import {SoundsManager} from "./SoundsManager.ts";

export class BossManager {

    private readonly scene: Scene;
    private bossSprite: Boss;

    public constructor(scene: Scene) {
        this.scene = scene;
    }

    public getBossSprite() {
        return this.bossSprite;
    }

    public spawnBoss(enemyStoppingZone: Zone) {

        // prima di fare spawn del boss rimuovo il rettangolo di collisione usato per spostare gli enemy dudes
        if (enemyStoppingZone) {
            enemyStoppingZone.destroy(true)
        }


        this.bossSprite = new Boss(
            this.scene,
            800,
            550,
            "boss_appear_spritesheet"
        )


    }

    public bossActions(lifePointsManager: LifePointsManager) {

        if (this.isBossNull()) return;

        this.scene.time.addEvent({
            loop: true,
            delay: 6000,
            callback: () => {
                let n = Math.floor(Math.random() * 2);

                // se valore minore 0.5 movimento
                if (n < 0.5) {
                    this.moveBossAvantiEIndietro(lifePointsManager)
                } else {
                    // altrimenti attacco
                    this.bossAtk_03(lifePointsManager)
                }
            }
        })

    }

    public bossAtk_03(lifePointsManager: LifePointsManager) {

        if (this.isBossNull()) return;

        this.scene.tweens.add({
            targets: this.bossSprite,
            duration: 2000,
            alpha: 1,
            onStart: () => {
                this.bossSprite.play("boss_atk3")
                SoundsManager.playEffect("boss_breath_fire_sound", this.scene);
            },
            onUpdate: () => lifePointsManager.updatePositionBarBoss(this.bossSprite)
            ,
            onComplete: () => {
                this.bossSprite.playIdle()
                SoundsManager.stopSound("boss_breath_fire_sound")
            }
        })

    }

    public moveBossAvantiEIndietro(lifePointsManager: LifePointsManager) {
        if (this.isBossNull()) return;

        this.scene.tweens.chain({
            targets: this.bossSprite,
            tweens: [
                {
                    // 1. VA AVANTI
                    x: "-=100",
                    duration: 1000,
                    onStart: () => this.bossSprite.play("boss_walk"),
                    onUpdate: () => lifePointsManager.updatePositionBarBoss(this.bossSprite)
                },
                {
                    // 2. PAUSA (IDLE)
                    // Usiamo un target vuoto o lo stesso boss, ma senza muovere nulla
                    duration: 800,
                    alpha: 1, // c'è bisogno di una prop da modifica, anche se fittizia per far scattare il tween
                    onStart: () => {
                        this.bossSprite.playIdle(); // Chiamato UNA SOLA VOLTA all'inizio dei 500ms
                    },
                    // Manteniamo l'update della barra se il boss dovesse subire knockback o altro
                    onUpdate: () => lifePointsManager.updatePositionBarBoss(this.bossSprite)
                },
                {
                    // 3. TORNA INDIETRO
                    x: "+=100",
                    duration: 1000,
                    onStart: () => this.bossSprite.play("boss_walk_backward"),
                    onUpdate: () => lifePointsManager.updatePositionBarBoss(this.bossSprite)
                }
            ],
            onComplete: () => {
                this.bossSprite.playIdle();
            }
        });
    }


    public isBossNull() {
        return this.bossSprite === null;
    }
}