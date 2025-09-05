import Phaser from "phaser";

export class MainTitle extends Phaser.Scene {

    private canvasW: number;
    private canvasH: number;
    private style: any = {
        color: '#ffffff', // <-- Colore bianco, il più importante!
        stroke: '#ffffff', // Aggiunge un bordo nero per maggiore leggibilità
        strokeThickness: 0.5
    }

    constructor() {
        super("mainTitle");

    }

    public adjustWidth(n: number) {
        return this.canvasW / n
    }

    public adjustHeigth(n: number) {
        return this.canvasH / n
    }

    public init() {
        this.canvasW = this.sys.game.config.width as number;
        this.canvasH = this.sys.game.config.height as number;
    }

    public preload() {
        this.load.image("main_bg", "assets/dudepon/dudepon_main.jpeg")

    }

    public create() {
        this.add.image(this.adjustWidth(2), this.adjustHeigth(2), "main_bg")
            .setScale(0.8)

        this.add.text(this.adjustWidth(2), this.adjustHeigth(1.8), "New Game",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)

        this.add.text(this.adjustWidth(2), this.adjustHeigth(1.5), "Continue",
            this.style
        )
            .setScale(5)
            .setOrigin(0.5, 0.5)
    }

    public update() {
    }
}