import {Scene} from "phaser";
import {Boss} from "../entities/players/child/Boss.ts";
import Zone = Phaser.GameObjects.Zone;
import {LifePointsManager} from "./LifePointsManager.ts";

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

        this.scene.time.delayedCall(2000, () => {


            let n = Math.floor(Math.random() * 2);

            this.moveBossAvantiEIndietro(lifePointsManager)
            // se valore minore 0.5 movimento
            if (n) {
            } else {
                // altrimenti attacco
            }


        })


    }

    public moveBossAvantiEIndietro(lifePointsManager: LifePointsManager) {
        if (!this.bossSprite) return;

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


    // // aggiungi animazione di idle e movimento post spawn e durante gli spostamenti
    // public moveBossAvanti(lifePointsManager: LifePointsManager) {
    //
    //     if (this.isBossNull()) return;
    //
    //     this.scene.tweens.add({
    //         targets: this.bossSprite,
    //         x: "-=100",
    //         duration: 1000,
    //         onStart: () => {
    //             this.bossSprite.play("boss_walk")
    //         },
    //         onUpdate: () => {
    //             lifePointsManager.updatePositionBarBoss(this.bossSprite)
    //         },
    //         onComplete: () => {
    //             this.bossSprite.playIdle()
    //         }
    //     })
    //
    //
    // }
    //
    //
    // public moveBossIndietro(lifePointsManager: LifePointsManager) {
    //
    //     if (this.isBossNull()) return;
    //
    //     this.scene.tweens.add({
    //         targets: this.bossSprite,
    //         x: "+=100",
    //         duration: 1000,
    //         onStart: () => {
    //             this.bossSprite.play("boss_walk_backward")
    //         },
    //         onUpdate: () => {
    //             lifePointsManager.updatePositionBarBoss(this.bossSprite)
    //         },
    //         onComplete: () => {
    //             this.bossSprite.playIdle()
    //         }
    //     })
    // }


    public isBossNull() {
        return this.bossSprite === null;
    }
}