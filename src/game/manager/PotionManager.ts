import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import Group = Phaser.GameObjects.Group;
import {BlueDude} from "../entities/players/child/BlueDude.ts";
import {WhiteDude} from "../entities/players/child/WhiteDude.ts";
import {PinkDude} from "../entities/players/child/PinkDude.ts";
import {LifePointsManager} from "./LifePointsManager.ts";
import {SoundsManager} from "./SoundsManager.ts";

export class PotionManager {

    private readonly scene: Scene;
    private potion: Sprite | null;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public spawnPotionToGiveHealth(physicsTerrain: Phaser.GameObjects.Rectangle, dudesArmyGroup: Group, lifePointsManager: LifePointsManager) {

        if (!physicsTerrain) {
            console.log(" il terreno fisico non è ancora disponibile. Attesa creazione terreno fisico.")
            return;
        }

        if (!lifePointsManager) {
            console.log("lifepoints manager non pronto. Attesa creazione classe richiesta.")
            return;
        }

        // ogni due minuti spawna una red potion che cura il tuo party
        this.scene.time.addEvent({
            delay: 10000, // ogni 5sec chiama callback
            callback: () => {
                this.spawnPotion(physicsTerrain, dudesArmyGroup, lifePointsManager);
            },
            loop: true
        })

    }

    private spawnPotion(physicsTerrain: Phaser.GameObjects.Rectangle, dudesArmyGroup: Group, lifePointsManager: LifePointsManager) {

        if (this.potion) {
            return;
            console.log("la pozione ancora esiste. non la ricreo.")
        }


        const potion = this.scene.physics.add.sprite(400, 100, "red_potion_spritesheet").setScale(3)
        potion.play("red_potion");
        console.log("pozione creata.");
        this.potion = potion;

        // nella delayedcall chiamata gestisci con i tween o simili lo spostamento sule terreno e il collide con il dudegroup
        this.updatePotionPosition(physicsTerrain, dudesArmyGroup, lifePointsManager)

    }


    // spostare la pozione fornisci manager necessari
    public updatePotionPosition(phisicsTerrain: Phaser.GameObjects.Rectangle, dudesArmyGroup: Group, lifePointsManager: LifePointsManager) {

        if (!this.potion) return;

        this.scene.physics.add.overlap(
            this.potion,
            dudesArmyGroup,
            () => {

                if (!dudesArmyGroup) return;

                const dudesGroup = dudesArmyGroup.getChildren();
                dudesGroup.forEach(dude => {
                    const player = dude as BlueDude | WhiteDude | PinkDude
                    if (!player || !player.getMainChar()) return; // se non è un dude del giocator enon faccio nulla

                    if (player instanceof BlueDude) {
                        const b = player
                        b.refullHp();
                        lifePointsManager.updateUpperbarHp(b)
                    } else if (player instanceof WhiteDude) {
                        const w = player
                        w.refullHp();
                        lifePointsManager.updateUpperbarHp(w)
                    } else if (player instanceof PinkDude) {
                        const p = player
                        p.refullHp();
                        lifePointsManager.updateUpperbarHp(p)
                    } else {
                        console.error("nessuno dei dude è di un tipo attualmente gestito  tipo dude non gestito :");
                    }

                })

                this.potion?.destroy()
                this.potion = null;
                SoundsManager.playSound("drink_potion_sound")
            }, // Funzione da chiamare al contatto
            undefined,
            this
        );

        // caduta della pozione sul terreno
        this.scene.tweens.add({
            targets: this.potion,
            y: phisicsTerrain.y - 30,
            duration: 2000,
            onComplete: () => {

                if (!this.potion) return;

                // slide della pozione fino al gruppo dei dude main character (del giocatore)
                this.scene.tweens.add({
                    targets: this.potion,
                    x: -100,
                    duration: 2000,
                    onComplete: () => {
                        this.potion && this.potion.destroy()
                        this.potion = null;
                    }
                })

            }
        })


    }

}