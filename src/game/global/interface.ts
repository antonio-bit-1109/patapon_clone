export interface IStyleText {
    [key: string]: string | number;

    fontFamily: "pataponFont";
}


export interface ISceneName {
    maintitle: string;
    choosemaincharacter: string;
    preloadscene: string
    gameplay: string;
    startthegame: string
}

export interface IActions {
    move: string;
    attack: string;
    defend: string;
    jump: string;
    idle: string
}

export interface OriginObj {
    x: number;
    y: number;
}

export interface IData {
    dudesArmy: string[]
}

export interface IConfigSound {
    volume: number;
    loop: boolean;
}

export interface IBasicTweenObj {
    duration: number,

    [key: string]: string | any;
}
