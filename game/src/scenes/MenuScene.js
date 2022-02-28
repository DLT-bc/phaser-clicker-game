import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene {

    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    
    init(data) {
        console.log("MenuScene");
        console.log(`init: ${data}`);
    }
    create(data) { // creating the menu screen

        console.log(data);

        const sceneWidth = this.game.renderer.width
        const sceneHeight = this.game.renderer.height
        
        //create images (z order)

        this.add.image(sceneWidth / 2, sceneHeight / 2, "background")
        this.add.image(sceneWidth / 2, sceneHeight / 2, "background_layer").setAlpha(0.3)
        this.add.image(sceneWidth * 0.15, sceneHeight * 0.15, "logo").setScale(0.1)

        let startButton = this.add.image(sceneWidth / 2, sceneHeight / 2, "start_btn")
        let menuArrow = this.add.sprite(0, 0, "arrow").setScale(1).setVisible(false)

        //create sprites

        //create audio, disable pauseonblur

        //create animations

        //make image buttons interactive

        /*
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        startButton.setInteractive()

        startButton.on("pointerover", ()=> {
            menuArrow.setVisible(true)
            menuArrow.x = startButton.x - startButton.width * 0.8
            menuArrow.y = startButton.y
            
        })
        startButton.on("pointerout", ()=> {
            menuArrow.setVisible(false)
        })
        startButton.on("pointerdown", () => {
            this.scene.start(CST.SCENES.MAIN, data);
        })

    }
}