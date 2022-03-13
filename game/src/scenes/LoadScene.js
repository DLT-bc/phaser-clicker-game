

import { CST } from "../CST.js";
import { MenuScene } from "./MenuScene.js";


export class LoadScene extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {

    }
    preload() {

        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');


        //change resolution
        //load image, spritesheet, sound

        this.load.image("background", "./dist/assets/PC_background.png")
        this.load.image("background_layer", "./dist/assets/layer_background.jpg")
        this.load.image("pc_shop_bg", "./dist/assets/pc_shop_bg.png")
        
        //menu
        this.load.image("start_btn", "./dist/assets/start_button.png")
        this.load.image("quit", "./dist/assets/quit_button.png")
        this.load.image("arrow", "./dist/assets/arrow.png")

        //main
        this.load.image("logo", "./dist/assets/dlt_logo.png")
        this.load.image("main_pc", "./dist/assets/main_pc.png")
        this.load.image("mining_lvl1", "./dist/assets/mining_lvl1.png")
        this.load.image("mining_lvl2", "./dist/assets/mining_lvl2.png")

        //main buttons
        this.load.image("pc_shop_btn", "./dist/assets/pc_shop_btn.png")
        this.load.image("tech_shop_btn", "./dist/assets/tech_shop_btn.png")
        this.load.image("bc_library_btn", "./dist/assets/bc_library_btn.png")


        //main exchange
        this.load.image("exchange_btn", "./dist/assets/exchange_btn.png")
        this.load.image("exchange_100", "./dist/assets/exchange_100.png")
        this.load.image("exchange_50", "./dist/assets/exchange_50.png")
        

        //pc shop
        
        this.load.image("buy_main_btn", "./dist/assets/buy_main_btn.png")
        this.load.image("buy_mining_btn", "./dist/assets/buy_mining_btn.png")
        this.load.image("buy_server_btn", "./dist/assets/buy_server_btn.png")
        this.load.image("exit_btn", "./dist/assets/exit_btn.png")

        //tech shop
        
        
        
       

        

        //create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        //Loader Events:
        //      complete - when done loading everything
        //      progress - loader number progress in decimal

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on("complete", () => {
            console.log("done");
        })

    }
    create() {
        let data = { // loads from database
            moneyCurrency: 0, 
            cryptoCurrency: 0,  
            mainPcLvl: 1,
            miningPcLvl: 0,
            serverPcLvl: 0,
            mainPcTechsLvl: 0,
            miningPcTechsLvl: 0,
            serverPcTechsLvl: 0
        }
        
        this.registry.set("userdata", data)

        //this.scene.start(CST.SCENES.MENU, data);
        
        //DEV
        this.scene.start(CST.SCENES.MAIN, data);

    }
}