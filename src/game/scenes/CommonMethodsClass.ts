import {OriginObj, IStyleText, IBasicTweenObj} from "../global/interface.ts";
import Phaser, {Scene} from "phaser";

//static class
export class CommonMethodsClass {


    /**
     * Adjusts the width by dividing the game's configured width by the given number.
     *
     * @param {number} n - The number by which the game's configured width will be divided.
     * @param {Phaser.Scene} scene - The current Phaser scene used to access the game's configuration.
     * @return {number} - The adjusted width after division.
     */
    public static adjustWidth(n: number, scene: Phaser.Scene): number {
        return (scene.sys.game.config.width as number) / n;
    }

    /**
     * Adjusts the height by dividing the game configuration height by the given number.
     *
     * @param scene
     * @param {number} n - The divisor used*/
    public static adjustHeight(n: number, scene: Phaser.Scene) {
        return (scene.sys.game.config.height as number) / n;
    }


    /**
     * Creates an animation in the specified Phaser scene.
     *
     * @param {Phaser.Scene} scene - The scene in which the animation will be created.
     * @param {string} animName - The key for the animation.
     * @param {string} spritesheetName - The key of the spritesheet to use for the animation frames.
     * @param {number} start - The starting frame index for the animation.
     * @param {number} end - The ending frame index for the animation.
     * @param {number} repeat - The number of times the animation should repeat. Use -1 for infinite loop.
     * @param {number} [frameRate] - The frame rate of the animation, in frames per second. Optional.
     *
     * @return {void} This method does not return any value.
     */
    public static createAnimation(scene: Phaser.Scene, animName: string, spritesheetName: string, start: number, end: number, repeat: number, frameRate?: number) {
        scene.anims.create({
            key: animName,
            frames: scene.anims.generateFrameNumbers(spritesheetName, {start: start, end: end}),
            repeat: repeat,
            frameRate: frameRate ? frameRate : 10
        })
    }


    /**
     * Adds a tween animation to the specified target, modifying its scale over a given duration with a defined easing function.
     *
     * @param {number} duration - The duration of the tween in milliseconds.
     * @param {any} target - The target object for the tween animation.
     * @param {number} scale - The scale value to tween to.
     * @param {string} ease - The easing function to be used for the tween; should be a valid Phaser easing function.
     * @param {Phaser.Scene} scene - The scene where the tween should be added.
     * @return {void} Does not return a value.
     */
    public static addTweens(duration: number, target: any, scale: number, ease: string, scene: Phaser.Scene): void {
        scene.tweens.add({
            duration: duration,
            targets: target,
            scale: scale,
            ease: ease
        })
    }

    public static chainTweens(
        scene: Scene,
        target: Phaser.GameObjects.GameObject,
        loop: number,
        arrObjs: IBasicTweenObj[]) {
        scene.add.tweenchain({
            targets: target,
            loop: loop,
            tweens: arrObjs
        })
    }


    public static addText(scene: Phaser.Scene, x: number, y: number, text: string, style: IStyleText, origin: OriginObj) {
        scene.add.text(x, y, text, style)
            .setOrigin(origin.x, origin.y)
    }

    // public static createSprite(x: number, y: number, texture: string, frame: string, animationKey: string, scene: Scene) {
    //     scene.physics.add.sprite(x, y, texture, frame).play(animationKey);
    // }
}