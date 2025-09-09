export interface IStyleText {
    [key: string]: string | number;

    fontFamily: "pataponFont";
}


export interface ISceneName {
    maintitle: string;
    choosemaincharacter: string;
    preloadscene: string
    gameplay: string
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
    [key: string]: string | any;
}