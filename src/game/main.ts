import Phaser, {AUTO, Game} from "phaser";
import {MainTitle} from "./scenes/MainTitle.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },
            debug: true
        }
    },
    scene: [
        MainTitle
    ],
};

const StartGame = (parent: string) => {

    return new Game({...config, parent});

}

export default StartGame;
