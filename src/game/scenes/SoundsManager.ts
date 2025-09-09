import {IConfigSound} from "../global/interface.ts";
import {Scene} from "phaser";


export class SoundsManager {

    private static mapSounds: Map<string, any> = new Map<string, any>()

    constructor() {
    }


    public static getSound(key: string) {
        return SoundsManager.mapSounds.get(key)
    }


    public static resetDefault() {
        SoundsManager.mapSounds = new Map()
    }

    public static addAudio(key: string, config: IConfigSound, scene: Scene) {
        const sound = scene.sound.add(key, config)
        this.mapSounds.set(key, sound)
    }

    public static playSound(key: string) {
        SoundsManager.mapSounds.get(key).play()
    }

    public static stopSound(key: string) {
        SoundsManager.mapSounds.get(key).stop()
    }

    public static isSoundAlreadyPlaying(key: string) {
        return SoundsManager.mapSounds.get(key).isPlaying
    }


    public static stopAllSounds() {
        for (let sound of SoundsManager.mapSounds.values()) {
            sound.stop()
        }
    }

    public static isAnySoundAlreadyPlaying() {
        for (let sound of SoundsManager.mapSounds.values()) {

            if (sound.isPlaying) return true

        }
        return false
    }

    // //  looping the songs to be able to reproduce it in a loop constantly
    // loopSounds(keys: string) {
    //
    //     if (this.isAnySoundAlreadyPlaying()) return
    //
    //
    //     this.currSongPlayed = keys[this.index]
    //     !this.isSoundAlreadyPlaying(this.currSongPlayed) && this.playSound(this.currSongPlayed)
    //
    //
    //     this.getSound(this.currSongPlayed).once("complete", () => {
    //         console.log("canzone terminata evento acchiappato!!")
    //
    //         if (this.index === keys.length - 1) {
    //             this.index = 0
    //         } else {
    //
    //             this.index++
    //         }
    //
    //         this.currSongPlayed = keys[this.index]
    //         // recursion - recall the same method but into the complete event to reproduce again the next song
    //         this.loopSounds(keys)
    //     })
    //
    //
    // }


}