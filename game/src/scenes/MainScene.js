import { CST } from "../CST.js";
import { calculateClickingMultiplier, calculateAutoMining, calculateExchangeRate } from "../functional.js"
import { PcShop } from "./PcShop.js";
import { TechShop } from "./TechShop.js";
import { BlockchainLibrary } from "./BlockchainLibrary.js";


export class MainScene extends Phaser.Scene {

    constructor(){
        super({
            key: CST.SCENES.MAIN
        })
    }

    init(data) {
        console.log("MainScene");
        console.log("init");
        console.log(data);
        this.userData = this.registry.get("userdata")
    }
    preload() {

    }
    create() { // creating the MainScene
        console.log("create");

        const sceneWidth = this.game.renderer.width
        const sceneHeight = this.game.renderer.height

        this.add.image(0, 0, "background_layer").setOrigin(0, 0).setAlpha(0.2)

        this.scale.lockOrientation('landscape')
        this.orientationText = this.add.text(320, 128, 'Please set your\nphone to landscape', { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);
        this.checkOriention(this.scale.orientation);
        console.log("Orientation: ", this.scale.orientation);
        this.scale.on('orientationchange', this.checkOriention, this);
        this.scale.on('resize', this.resize, this);


        this.exp = 1
        this.exchangeRate = calculateExchangeRate(1) // 1 - default
        this.exchangeMode = 1 // 1 - 100% default
        
        let counterObj = { num: 2 }
        this.counter = counterObj.num
        this.playerTexts = new Map()
        this.playerTexts.set("Theme 1", 1)
        this.registry.set("player_texts", this.playerTexts)
        this.registry.set("texts_counter", this.counter)

        //create additional scenes   


        let pcShop = this.createWindow(PcShop)
        let techShop = this.createWindow(TechShop)
        let bcLibrary = this.createWindow(BlockchainLibrary)


        
        

        
        let get1000 = this.add.sprite(0, 0 , "exchange_100").setInteractive().setOrigin(0, 0)
        get1000.on('pointerdown', () => {
            this.userData.cryptoCurrency += 1000
        })

        //create sprites

        let mainPc = this.add.sprite(sceneWidth / 2, sceneHeight / 2.5, "main_pc").setInteractive()
        let pcShopBtn = this.add.sprite(sceneWidth * 0.1, sceneHeight * 0.9, "pc_shop_btn").setInteractive()
        let techShopBtn = this.add.sprite(pcShopBtn.x + pcShopBtn.width * 1.25, sceneHeight * 0.9, "tech_shop_btn").setInteractive()
        let exchangeBtn = this.add.sprite(sceneWidth * 0.8, sceneHeight * 0.9, "exchange_btn")
        let exchange100 = this.add.sprite(exchangeBtn.x + exchangeBtn.width, exchangeBtn.y - exchangeBtn.height * 0.26 , "exchange_100").setInteractive()
        let exchange50 = this.add.sprite(exchangeBtn.x + exchangeBtn.width, exchangeBtn.y + exchangeBtn.height * 0.25, "exchange_50").setInteractive()
            exchange100.setScale(0.9).setTint(0x808080)
            exchange50.setScale(1).setTint()
            this.exchangeMode = 1
            exchangeBtn.setInteractive()
        let bcLibraryBtn = this.add.sprite(techShopBtn.x + techShopBtn.width * 1.25, sceneHeight * 0.9, "bc_library_btn").setInteractive()
        
        //create images (z order)
        
        this.miningPc = this.add.image(mainPc.x - mainPc.width * 1.3, mainPc.y + mainPc.height * 0.3, "mining_lvl1").setVisible(false)
        if (this.userData.miningPcLvl != 0) { this.miningPc.setVisible(true)}
        
        //create text
        this.moneyCounter = this.add.text(sceneWidth * 0.2, sceneHeight * 0.06, `Money: ${this.userData.moneyCurrency}`)
        this.cryptoCounter = this.add.text(sceneWidth * 0.6, sceneHeight * 0.06, `Crypto: ${this.userData.cryptoCurrency}`)
        this.cryptoPerSecondTitle = this.add.text(this.cryptoCounter.x, this.cryptoCounter.y + this.cryptoCounter.height, `${calculateAutoMining(this.userData.miningPcLvl, this.userData.miningPcTechsLvl)} eth/s`)
        this.exchangeRateTitle = this.add.text(sceneWidth * 0.85, exchangeBtn.y - exchangeBtn.height * 0.7, `Exchange Rate: ${this.exchangeRate}`).setOrigin(0.5)

        //create audio, disable pauseonblur

        //create animations

        //mask layer
        this.bg_layer = this.add.rectangle(0, 0, sceneWidth, sceneHeight, 0x121212, 0.5).setOrigin(0, 0).setVisible(false)

        //create dialogWindows
        
        let mainSceneBtns = [mainPc, pcShopBtn, techShopBtn, exchangeBtn, exchange100, exchange50, bcLibraryBtn]
        this.registry.set("mainSceneBtns", mainSceneBtns)
         
        //make image buttons interactive

        /*
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        //main pc clicking button
        mainPc.on("pointerdown", () => {
            mainPc.setScale(0.95).setTint(0x808080)
            this.userData.cryptoCurrency += calculateClickingMultiplier(this.userData.mainPcLvl, this.userData.mainPcTechsLvl)

        }).on("pointerout", () => {
            mainPc.setScale(1).setTint()
        }).on("pointerup", () => {
            mainPc.setScale(1).setTint()
        })

        //exchange btns
        exchangeBtn.on("pointerdown", () => {
            exchangeBtn.setScale(0.95).setTint(0x808080)

            this.exchangeCrypto()
             
        }).on("pointerout", () => { 
            exchangeBtn.setScale(1).setTint()
        }).on("pointerup", () => { 
            exchangeBtn.setScale(1).setTint()
        })

        exchange100.on("pointerdown", () => {
            exchange100.setScale(0.9).setTint(0x808080)
            exchange50.setScale(1).setTint()
            this.exchangeMode = 1
            exchangeBtn.setInteractive()
             
        })
        exchange50.on("pointerdown", () => {
            exchange50.setScale(0.9).setTint(0x808080)
            exchange100.setScale(1).setTint()
            exchangeBtn.setInteractive()

            this.exchangeMode = 0.5
        })



        //pc shop btn
        pcShopBtn.on("pointerdown", () => {
            pcShopBtn.setScale(0.95)
            this.scene.launch(CST.MENU.PCSHOP)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()}) 

            this.bg_layer.setVisible(true)
        }).on("pointerout", () => { 
            pcShopBtn.setScale(1)
        }).on("pointerup", () => { 
            pcShopBtn.setScale(1)
        })

        //tech shop btn
        techShopBtn.on("pointerdown", () => {
            techShopBtn.setScale(0.95)
            this.scene.launch(CST.MENU.TECHSHOP)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()})

            this.bg_layer.setVisible(true)
        }).on("pointerout", () => { 
            techShopBtn.setScale(1)
        }).on("pointerup", () => { 
            techShopBtn.setScale(1)
        })

        bcLibraryBtn.on("pointerdown", () => {
            bcLibraryBtn.setScale(0.95)
            this.scene.launch(CST.MENU.BCLIBRARY)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()}) 
        }).on("pointerout", () => { 
            bcLibraryBtn.setScale(1)
        }).on("pointerup", () => { 
            bcLibraryBtn.setScale(1)
        })
        
        setInterval(() => {
            this.userData.cryptoCurrency += calculateAutoMining(this.userData.miningPcLvl, this.userData.miningPcTechsLvl)
        } , 1000)

        setInterval(() => {
            this.exchangeRate = calculateExchangeRate(1)
            this.exchangeRateTitle.setText(`Exchange Rate: ${this.exchangeRate}`)
        } , 5000)

    }

    checkOriention (orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            this.orientationText.setVisible(true);
        } else if (orientation === Phaser.Scale.LANDSCAPE) {
            this.orientationText.setVisible(false);
        }
    }

    resize (gameSize, baseSize, displaySize, resolution) {
        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);
    }
    
    exchangeCrypto() {
        if(this.userData.cryptoCurrency <= 0.1) { console.log("returning..."); return }

        let changingCrypto = this.userData.cryptoCurrency * this.exchangeMode 
        console.log("crypto to change = " + changingCrypto);
        this.userData.cryptoCurrency = this.userData.cryptoCurrency - changingCrypto
        this.userData.moneyCurrency += changingCrypto * this.exchangeRate
    }

    createWindow(func) {
        let x = this.game.renderer.width / 2
        let y = this.game.renderer.height / 2
        let key;
        
        switch (func) {
            case PcShop:
                key = CST.MENU.PCSHOP
                break;

            case TechShop:
                key = CST.MENU.TECHSHOP
                break;
            
            case BlockchainLibrary:
                key = CST.MENU.BCLIBRARY

            default:
                break;
        }

        let windowZone = this.add.zone(x, y, func.WIDTH, func.HEIGHT)
        let sceneWindow = new func(key, windowZone)
    
        return this.scene.add(key, sceneWindow, false)
    }

    update() {

        this.cryptoCounter.setText(`Crypyto: ${Math.floor(this.userData.cryptoCurrency* 100) / 100}`)
        this.cryptoPerSecondTitle.setText(`${calculateAutoMining(this.userData.miningPcLvl, this.userData.miningPcTechsLvl)} eth/s`)

        this.moneyCounter.setText(`Money: ${Math.floor(this.userData.moneyCurrency * 100) / 100}`)


        this.mainPcPrice = 100 + (50 * this.userData.mainPcLvl * Math.pow(1.1, this.exp))
        this.miningPcPrice = 100 + (50 * this.userData.miningPcLvl * Math.pow(1.1, this.exp))
        this.serverPcPrice = 100 + (50 * this.userData.serverPcLvl * Math.pow(1.1, this.exp))

        if (this.userData.miningPcLvl != 0) { this.miningPc.setVisible(true)}
        if(this.userData.miningPcLvl >= 10 && this.userData.miningPcLvl < 20) {
            this.miningPc.setTexture("mining_lvl2")
        } else if(this.userData.miningPcLvl >= 20) {
            this.miningPc.setTexture("mining_lvl2") // CHANGE TO LVL3
        }
        
        
    }

    

    
}

