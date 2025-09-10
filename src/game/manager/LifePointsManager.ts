import {Scene} from "phaser";
import {PinkDude} from "../entities/PinkDude.ts";
import {WhiteDude} from "../entities/WhiteDude.ts";
import {BlueDude} from "../entities/BlueDude.ts";

export class LifePointsManager {

    private scene: Scene;


    constructor(scene: Scene) {
        this.scene = scene;
    }

    public create(groupDude: Phaser.GameObjects.Group) {
        this.buildLowerBar(groupDude)
        this.buildUpperBar(groupDude)
    }

    public buildLowerBar(groupDude: Phaser.GameObjects.Group) {
        groupDude.children.iterate(dude => {

            let currentDude = dude as PinkDude | WhiteDude | BlueDude;

            const lowerBar = this.scene.add.graphics({
                fillStyle: {color: 0xff0000, alpha: 1},
                lineStyle: {width: 2, color: 0xff0000, alpha: 1},
                x: currentDude.x - 10,
                y: currentDude.y - 50
            })
            lowerBar.fillRect(0, 0, 30, 5);
            return true;
        })
    }

    public buildUpperBar(groupDude: Phaser.GameObjects.Group) {
        groupDude.children.iterate(dude => {

            let currentDude = dude as PinkDude | WhiteDude | BlueDude;

            const lowerBar = this.scene.add.graphics({
                fillStyle: {color: 0x008000, alpha: 1},
                lineStyle: {width: 2, color: 0x82f72f, alpha: 1},
                x: currentDude.x - 10,
                y: currentDude.y - 50
            })
            lowerBar.fillRect(0, 0, 30, 5);
            return true;
        })
    }
}