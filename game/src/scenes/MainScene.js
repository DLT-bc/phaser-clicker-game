import { CST } from "../CST.js";
import { calculateClickingMultiplier, calculateAutoMining, calculateServerStorage, calculateExchangeRate } from "../functional.js"
import { PcShop } from "./PcShop.js";
import { TechShop } from "./TechShop.js";
import { BlockchainLibrary } from "./BlockchainLibrary.js";
import { drawDebugBounds } from "../debug.js";
import { localization } from "../localization.js";
import { newRatio } from "../main.js";

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

        if(localStorage.getItem("isFirstStart") != 0) {
            localStorage.setItem("isFirstStart", 1)
        }
    }
    preload() {

    }
    create() { // creating the MainScene
        console.log("create");

        this.newRatio = newRatio * 0.9

        const sceneWidth = this.game.renderer.width
        const sceneHeight = this.game.renderer.height

        this.add.image(0, 0, "background_layer").setOrigin(0, 0).setAlpha(0.2)

        this.scale.lockOrientation('landscape')
        this.orientationText = this.add.text(320, 128, localization.getLocale('mainScene1'), { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);
        this.checkOriention(this.scale.orientation);
        console.log("Orientation: ", this.scale.orientation);
        this.scale.on('orientationchange', this.checkOriention, this);
        this.scale.on('resize', this.resize, this);

        let timePassed = Math.floor(((Date.now() - localStorage.getItem("savedDate")) / 60000) *  100) / 100

        this.exp = 1
        this.exchangeRate = calculateExchangeRate(1) // 1 - default
        this.exchangeMode = 1 // 1 - 100% default
        

        //create additional scenes   


        let pcShop = this.createWindow(PcShop)
        let techShop = this.createWindow(TechShop)
        let bcLibrary = this.createWindow(BlockchainLibrary)


        
        


        //create sprites

        
        this.mainPc = this.add.sprite(sceneWidth / 2, sceneHeight / 2.5, "main_pc").setInteractive().setScale(this.newRatio * 1)

        let pcShopBtn = this.add.sprite(sceneWidth * 0.1, sceneHeight * 0.88, "pc_shop_btn").setInteractive().setScale(this.newRatio * 1)
        let techShopBtn = this.add.sprite(pcShopBtn.x + pcShopBtn.width * pcShopBtn.scale * 1.15, sceneHeight * 0.88, "tech_shop_btn").setInteractive().setScale(this.newRatio * 1)
        let bcLibraryBtn = this.add.sprite(techShopBtn.x + techShopBtn.width * techShopBtn.scale * 1.15, sceneHeight * 0.88, "bc_library_btn").setInteractive().setScale(this.newRatio * 1)

        let exchangeBtn = this.add.sprite(sceneWidth * 0.7, sceneHeight * 0.88, "exchange_btn").setInteractive().setScale(this.newRatio * 1)
        let exchange100 = this.add.sprite(exchangeBtn.x + exchangeBtn.width * exchangeBtn.scaleX, exchangeBtn.y - exchangeBtn.height * exchangeBtn.scaleY * 0.26 , "exchange_100").setInteractive().setScale(this.newRatio * 0.9).setTint(0x808080)
        let exchange50 = this.add.sprite(exchangeBtn.x + exchangeBtn.width * exchangeBtn.scaleX, exchangeBtn.y + exchangeBtn.height * exchangeBtn.scaleY * 0.25, "exchange_50").setInteractive().setScale(this.newRatio * 1).setTint()
        
        let languageBtn = this.add.sprite(sceneWidth * 0.95, sceneHeight * 0.05, localization.variant === 'ru' ? 'language_ru_btn' : 'language_en_btn').setInteractive().setScale(this.newRatio * 1)


        //create images (z order)
        this.miningPc = this.add.image(this.mainPc.x - this.mainPc.width * this.mainPc.scaleX * 1.2, this.mainPc.y + this.mainPc.height / 2.7 * this.mainPc.scaleY, "mining_1").setVisible(false).setScale(this.newRatio * 0.3 * 1)
        if (this.userData.miningPcLvl != 0) { this.miningPc.setVisible(true) }
        this.serverPc = this.add.image(this.mainPc.x + this.mainPc.width * this.mainPc.scaleX * 1.2, this.mainPc.y + this.mainPc.height / 2.7 * this.mainPc.scaleY, "server_1").setVisible(false).setInteractive().setScale(this.newRatio * 0.4 * 1)
        if (this.userData.serverPcLvl != 0) { this.serverPc.setVisible(true) }
        


        //create text

        const textStyle = {
            fontSize: '20px',
            fontFamily: 'Montserrat',
            color: '#ffffff',
            align: 'middle'
        }

        this.moneyCounter = this.add.text(sceneWidth * 0.2, sceneHeight * 0.06, `${this.userData.moneyCurrency} $`, textStyle).setScale(this.newRatio * 1)
        this.cryptoCounter = this.add.text(sceneWidth * 0.6, sceneHeight * 0.06, `${this.userData.cryptoCurrency} ??`, textStyle).setScale(this.newRatio * 1)
        this.cryptoPerSecondTitle = this.add.text(this.cryptoCounter.x, this.cryptoCounter.y + this.cryptoCounter.height * this.cryptoCounter.scaleY * 1.3, `${calculateAutoMining(this.userData.miningPcLvl, this.userData.techLvl)} ??/s`, textStyle).setScale(newRatio * 1)
        this.cryptoPerClickTitle = this.add.text(this.cryptoPerSecondTitle.x, this.cryptoPerSecondTitle.y + this.cryptoPerSecondTitle.height * this.cryptoPerSecondTitle.scaleY * 1.3, `${calculateClickingMultiplier(this.userData.mainPcLvl, this.userData.techLvl)} ??/${localization.getLocale('mainScene3')}`, textStyle).setScale(this.newRatio * 1)
        this.serverValueTitle = this.add.text(this.serverPc.x, this.serverPc.y - this.serverPc.height * 0.65 * this.serverPc.scaleY, `${timePassed} ??`, textStyle).setVisible(false).setOrigin(0.5).setScale(this.newRatio * 1)
        this.exchangeRateTitle = this.add.text(exchangeBtn.x + exchangeBtn.width / 2, exchangeBtn.y - exchangeBtn.height * exchangeBtn.scaleY * 0.7, `${localization.getLocale('exchangeRate')}: ${this.exchangeRate}`, textStyle).setOrigin(0.5).setScale(this.newRatio * 1)


        // this.exchangeRateCrypto = this.add.text(exchangeBtn.x + exchangeBtn.width / 2, exchangeBtn.y - exchangeBtn.height * 0.7, `${localization.getLocale('exchangeCrypto')}: ${this.exchangeRate}`, textStyle).setOrigin(0.5).setScale(this.newRatio * 1)

        
        //create audio, disable pauseonblur

        //create animations

        //mask layer
        this.bg_layer = this.add.rectangle(0, 0, sceneWidth, sceneHeight, 0x121212, 0.5).setOrigin(0, 0).setVisible(false)

        //create dialogWindows
        
        let mainSceneBtns = [this.mainPc, pcShopBtn, techShopBtn, exchangeBtn, exchange100, languageBtn, exchange50, bcLibraryBtn]
        this.registry.set("mainSceneBtns", mainSceneBtns)

        
         
        //make image buttons interactive

        /*
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        if(this.userData.serverPcLvl == 0) {
            timePassed = 0
        } else {
            this.serverValueTitle.setVisible(true)
        }

        if(localStorage.getItem("isFirstStart") != 0) {
            this.scene.pause()
            this.scene.launch(CST.SCENES.GREETING)
        }

        //main pc clicking button
        this.mainPc.on("pointerdown", () => {
            this.mainPc.setScale(this.newRatio * 0.95).setTint(0x808080)
            this.userData.cryptoCurrency += calculateClickingMultiplier(this.userData.mainPcLvl, this.userData.techLvl)

        }).on("pointerout", () => {
            this.mainPc.setScale(this.newRatio * 1).setTint()
        }).on("pointerup", () => {
            this.mainPc.setScale(this.newRatio * 1).setTint()
        })
        
        this.serverPc.on("pointerdown", () => {
            this.serverPc.setScale(this.newRatio * 0.4 * 0.95).setTint(0x808080)
            this.userData.cryptoCurrency += Math.min(calculateServerStorage(this.userData.serverPcLvl, this.userData.techLvl), Math.floor(timePassed))
            timePassed = 0
            this.serverValueTitle.setText(`${timePassed} ??`)
        }).on("pointerout", () => {
            this.serverPc.setScale(this.newRatio * 0.4 * 1).setTint()
        }).on("pointerup", () => {
            this.serverPc.setScale(this.newRatio * 0.4 * 1).setTint()
        })
        
        //exchange btns
        exchangeBtn.on("pointerdown", () => {
            exchangeBtn.setScale(this.newRatio * 0.95).setTint(0x808080)

            this.exchangeCrypto()
             
        }).on("pointerout", () => { 
            exchangeBtn.setScale(this.newRatio * 1).setTint()
        }).on("pointerup", () => { 
            exchangeBtn.setScale(this.newRatio * 1).setTint()
        })

        exchange100.on("pointerdown", () => {
            exchange100.setScale(this.newRatio * 0.9).setTint(0x808080)
            exchange50.setScale(this.newRatio * 1).setTint()
            this.exchangeMode = 1
            exchangeBtn.setInteractive()
             
        })
        exchange50.on("pointerdown", () => {
            exchange50.setScale(this.newRatio * 0.9).setTint(0x808080)
            exchange100.setScale(this.newRatio * 1).setTint()
            exchangeBtn.setInteractive()

            this.exchangeMode = 0.5
        })
        

        // language btn
        languageBtn.on("pointerdown", () => {
            languageBtn.setTint(0x808080)
            localization.toggleVariant();
        }).on("pointerup", () => {
            languageBtn.setTint()
        }).on("pointerout", () => {
            languageBtn.setTint()
        })



        //pc shop btn
        pcShopBtn.on("pointerdown", () => {
            pcShopBtn.setScale(this.newRatio * 0.95)
            this.scene.launch(CST.MENU.PCSHOP)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()}) 

            this.bg_layer.setVisible(true)
        }).on("pointerout", () => { 
            pcShopBtn.setScale(this.newRatio * 1)
        }).on("pointerup", () => { 
            pcShopBtn.setScale(this.newRatio * 1)
        })

        //tech shop btn
        techShopBtn.on("pointerdown", () => {
            techShopBtn.setScale(this.newRatio * 0.95)
            this.scene.launch(CST.MENU.TECHSHOP)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()})

            this.bg_layer.setVisible(true)
        }).on("pointerout", () => { 
            techShopBtn.setScale(this.newRatio * 1)
        }).on("pointerup", () => { 
            techShopBtn.setScale(this.newRatio * 1)
        })

        bcLibraryBtn.on("pointerdown", () => {
            bcLibraryBtn.setScale(this.newRatio * 0.95)
            this.scene.launch(CST.MENU.BCLIBRARY)
            this.registry.get("mainSceneBtns").forEach((el) => {el.disableInteractive()}) 
        }).on("pointerout", () => { 
            bcLibraryBtn.setScale(this.newRatio * 1)
        }).on("pointerup", () => { 
            bcLibraryBtn.setScale(this.newRatio * 1)
        })

        //draw debug borders 
        /*
        drawDebugBounds(this, mainPc)
        drawDebugBounds(this, this.serverPc)
        drawDebugBounds(this, this.miningPc)
        drawDebugBounds(this, pcShopBtn)
        drawDebugBounds(this, techShopBtn)
        drawDebugBounds(this, bcLibraryBtn)
        drawDebugBounds(this, exchangeBtn)
        drawDebugBounds(this, exchange100)
        drawDebugBounds(this, exchange50)
        drawDebugBounds(this, this.moneyCounter)
        drawDebugBounds(this, this.cryptoCounter)
        drawDebugBounds(this, this.cryptoPerSecondTitle)
        drawDebugBounds(this, this.cryptoPerClickTitle)
        drawDebugBounds(this, this.exchangeRateTitle)
        drawDebugBounds(this, this.serverValueTitle)
        
        */

        this.updateText()
        
        setInterval(() => {
            this.userData.cryptoCurrency += calculateAutoMining(this.userData.miningPcLvl, this.userData.techLvl)
            localStorage.setItem("savedDate", Date.now())

            localStorage.setItem('userData', JSON.stringify(this.userData))
        } , 1000)

        setInterval(() => {
            this.exchangeRate = calculateExchangeRate(1) 
            this.exchangeRateTitle.setText(`${localization.getLocale('exchangeRate')}: ${this.exchangeRate}`)
            //console.log(this.userData.cryptoCurrency, this.userData.moneyCurrency);
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
    
    updateText() {
        this.cryptoCounter.setText(`${Math.floor(this.userData.cryptoCurrency * 100) / 100} ??`)
        this.moneyCounter.setText(`${Math.floor(this.userData.moneyCurrency * 100) / 100} $`)
        this.exchangeRateTitle.setText(`${localization.getLocale('exchangeRate')}: ${this.exchangeRate}`)
        this.cryptoPerSecondTitle.setText(`${calculateAutoMining(this.userData.miningPcLvl, this.userData.techLvl)} ??/s`)
        this.cryptoPerClickTitle.setText(`${calculateClickingMultiplier(this.userData.mainPcLvl, this.userData.techLvl)} ??/${localization.getLocale('mainScene3')}`)
    }

    update() {

        this.cryptoCounter.setText(`${Math.floor(this.userData.cryptoCurrency * 100) / 100} ??`)
        this.moneyCounter.setText(`${Math.floor(this.userData.moneyCurrency * 100) / 100} $`)
    
    }
}