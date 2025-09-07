import Phaser, {AUTO, Game} from "phaser";
import {MainTitle} from "./scenes/MainTitle.ts";
import {ChooseMainCharacter} from "./scenes/ChooseMainCharacter.ts";
import {PreloadScene} from "./scenes/PreloadScene.ts";

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
        PreloadScene,
        MainTitle,
        ChooseMainCharacter
    ],
};

const StartGame = (parent: string) => {

    return new Game({...config, parent});

}

export default StartGame;
