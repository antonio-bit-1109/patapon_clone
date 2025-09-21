import {BaseCharacter} from "./BaseCharacter.ts";

export abstract class BasePlayer extends BaseCharacter {

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
    
}