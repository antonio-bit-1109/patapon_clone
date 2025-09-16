import {IActions, ISceneName} from "./interface.ts";

export const dudeponTypes = {
    blue: "blue",
    white: "white",
    pink: "pink"
}


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

export const weaponTypes = {
    arrow: "arrow",
    rock: "rock",
    fist: "fist"
} as const

export type WeaponType = typeof weaponTypes[keyof typeof weaponTypes];

export enum EnumPositionTriggerZone {
    moreLeft = "moreLeft",
    moreRight = "moreRight"
}

export const TriggerZoneState = {
    stopping: "stopping",
    stopped: "stopped",
    repositioning: "repositioning",
    repositioned: "repositioned",
    none: "none"
} as const

export type TriggerZoneType = typeof TriggerZoneState[keyof typeof TriggerZoneState];

export const assetPath: string = "assets/dudepon"
export const assetPathSound: string = "assets/sounds"
export const assetPathStamp: string = "assets/stamps"
export const assetPathWeapon: string = "assets/dudepon/weapon"