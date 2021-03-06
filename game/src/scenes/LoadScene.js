import { CST } from "../CST.js";

const bdURL = "https://dlt-database.herokuapp.com/api/"

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


        // change resolution
        // load image, spritesheet, sound
        
        this.load.image("background_layer", "./dist/assets/layer_background.jpg")
        this.load.image("pc_shop_bg", "./dist/assets/pc_shop_bg.png")
        
        // menu
        this.load.image("start_btn", "./dist/assets/start_button.png")
        this.load.image("quit", "./dist/assets/quit_button.png")
        this.load.image("arrow", "./dist/assets/arrow.png")

        // main
        this.load.image("logo", "./dist/assets/dlt_logo.png")
        this.load.image("main_pc", "./dist/assets/main_pc.png")

        this.load.image("mining_1", "./dist/assets/mining_1.png")
        this.load.image("mining_2", "./dist/assets/mining_2.png")
        this.load.image("mining_3", "./dist/assets/mining_3.png")

        this.load.image("server_1", "./dist/assets/server_1.png")
        this.load.image("server_2", "./dist/assets/server_2.png")
        this.load.image("server_3", "./dist/assets/server_3.png")

        // main buttons
        this.load.image("pc_shop_btn", "./dist/assets/pc_shop_btn.png")
        this.load.image("tech_shop_btn", "./dist/assets/tech_shop_btn.png")
        this.load.image("bc_library_btn", "./dist/assets/bc_library_btn.png")


        // main exchange
        this.load.image("exchange_btn", "./dist/assets/exchange_btn.png")
        this.load.image("exchange_100", "./dist/assets/exchange_100.png")
        this.load.image("exchange_50", "./dist/assets/exchange_50.png")
        

        // language 
        this.load.image("language_ru_btn", "./dist/assets/language_ru_btn.png")
        this.load.image("language_en_btn", "./dist/assets/language_en_btn.png")

        // pc shop
        this.load.image("exit_btn", "./dist/assets/exit_btn.png")

        // tech shop
        this.load.image("buy_tech_btn", "./dist/assets/buy_tech_btn.png")
        this.load.image("tech_1", "./dist/assets/techs/tech_1.png")


        for(let i = 1; i <= 10; i++) {
            this.load.image("tech_" + i, "./dist/assets/techs/tech_" + i + ".png")
        }

        // create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        // Loader Events:
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
        // loads from database
        let data = { 
            moneyCurrency: 0, 
            cryptoCurrency: 0,  
            mainPcLvl: 1,
            miningPcLvl: 0,
            serverPcLvl: 0,
            techLvl: 0
        }

        let userDataSt = localStorage.getItem('userData')
        console.log(JSON.parse(userDataSt));

        if (userDataSt == null) {
            localStorage.setItem('userData', JSON.stringify(data))
        } else {
            data = JSON.parse(userDataSt)
        }
        

        /*fetch(bdURL + "auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            
        }).then((response) => {
            console.log(response.status)     //=> number 100???599
            console.log(response.statusText) //=> String
          
            if (response.ok) {
                console.log(JSON.parse(response.statusText));
            }
            else {
                //alert(response.statusText)
            }
          }, (error) => {
            console.log(error.message) //=> String
          })
          */
        
        this.registry.set("userdata", data)

        this.scene.start(CST.SCENES.MAIN, data);

    }
}