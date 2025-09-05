
 interface ISceneNane {
     maintitle:string;
     choosemaincharacter : string;
 }

export const sceneName:ISceneNane = {
    maintitle: "maintitle" ,
    choosemaincharacter: "choosemaincharacter"
}

export interface IStyleText {
    color: string, // <-- Colore bianco, il più importante!
    stroke: string, // Aggiunge un bordo nero per maggiore leggibilità
    strokeThickness: number
}