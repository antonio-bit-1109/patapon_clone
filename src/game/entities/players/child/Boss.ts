import {BaseCharacter} from "../root/BaseCharacter.ts";
import {SoundsManager} from "../../../manager/SoundsManager.ts";

export class Boss extends BaseCharacter {


    public constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setHp(this.getHp() + 100);
        this.setMaxHp(this.getMaxHp() + 100)
        this.setDamage(this.getDamage() + 10)
        this.setDefense(this.getDefense() + 40)
        this.adjustBossSizeAndPosition();
        this.setupAnimationHandler()
        this.play("boss_spawn")
        SoundsManager.playSound("boss_growl_audio")
    }

    private adjustBossSizeAndPosition() {
        this.setSize(300, 300)
        this.setFlipX(true)
        this.setOffset(140, 90)

    }

    private setupAnimationHandler() {
        // Ogni volta che finisce un'animazione, controlliamo quale era
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim: Phaser.Animations.Animation) => {
            if (anim.key === "boss_spawn") {
                this.playIdle();
            }
        });
    }

    public playIdle() {
        // Se non è già in esecuzione l'idle, lo facciamo partire
        if (this.anims.currentAnim?.key !== "boss_idle") {
            this.play("boss_idle", true); // il secondo parametro 'true' evita il restart se già in esecuzione
        }
    }
}