import {Scene} from "phaser";
import {Boss} from "../entities/players/child/Boss.ts";
import Zone = Phaser.GameObjects.Zone;

export class BossManager {

    private scene: Scene;
    private bossSprite: Boss;

    public constructor(scene: Scene) {
        this.scene = scene;
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

    // aggiungi animazione di idle e movimento post spawn e durante gli spostamenti
    public moveBossAvanti() {

        if (this.isBossNull()) return;

        this.scene.tweens.add({
            targets: this.bossSprite,
            x: "-=100",
            duration: 500
        })


    }


    public moveBossIndietro() {

        if (this.isBossNull()) return;

        this.scene.tweens.add({
            targets: this.bossSprite,
            x: "+=100",
            duration: 500
        })
    }


    public isBossNull() {
        return this.bossSprite === null;
    }
}