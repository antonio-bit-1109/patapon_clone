import {IActions, ISceneName} from "./interface.ts";


export const sceneName: ISceneName = {
    maintitle: "maintitle",
    choosemaincharacter: "choosemaincharacter",
    preloadscene: "preloadscene",
    gameplay: "gameplay"
}

export const actions: IActions = {
    move: "move",
    attack: "attack",
    defend: "defend",
    jump: "jump",
    idle: "idle"
}

export const assetPath: string = "assets/dudepon"
export const assetPathSound: string = "assets/sounds"
export const assetPathStamp: string = "assets/stamps"