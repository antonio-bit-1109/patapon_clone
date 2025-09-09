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

}