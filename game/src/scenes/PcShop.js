import { CST } from "../CST.js";
import { newWidth, newHeight, newRatio } from "../main.js"
import { calculateClickingMultiplier, calculateAutoMining, calculateMainPrice, calculateMiningPrice, calculateServerPrice } from "../functional.js";

import { drawDebugBounds } from "../debug.js";

export class PcShop extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init() {
        this.userData = this.registry.get("userdata")
        this.playerTexts = this.registry.get("player_texts")
        console.log(this.playerTexts);
        this.counter = this.registry.get("texts_counter")
        console.log(this.counter);

        PcShop.WIDTH = this.game.renderer.width * 0.7
        PcShop.HEIGHT = this.game.renderer.height * 0.7
    }

    create (data) {
        this.add.image(0, 0, "pc_shop_bg").setOrigin(0, 0)

        this.cam = this.cameras.main.setViewport(this.parent.x - PcShop.WIDTH / 2, this.parent.y - PcShop.HEIGHT / 2, PcShop.WIDTH, PcShop.HEIGHT);

        //setting scene rounded
        const camShape = this.make.graphics();
        camShape.fillStyle(0xffffff);
        camShape.fillStyle(0xffffff, 0.3);
        camShape.fillRoundedRect(this.parent.x - PcShop.WIDTH / 2, this.parent.y - PcShop.HEIGHT / 2, PcShop.WIDTH, PcShop.HEIGHT, 32);
        camShape.fillStyle(0xff00ff, 1)
        this.cam.setMask(camShape.createGeometryMask())

        this.mainPcPrice = calculateMainPrice(this.userData.mainPcLvl)
        this.miningPcPrice = calculateMiningPrice(this.userData.miningPcLvl)
        this.serverPcPrice = calculateServerPrice(this.userData.serverPcLvl)

        

        //add sprites
        let buyMainBtn = this.add.sprite(PcShop.WIDTH * 0.3 , PcShop.HEIGHT * 0.2, "buy_main_btn").setScale(newRatio * 0.9).setInteractive()
        //buyMainBtn.x += buyMainBtn.width / 2
        this.buyMainTitle = this.add.text(PcShop.WIDTH * 0.6, buyMainBtn.y - 5,
            `Price: ${calculateMainPrice(this.userData.mainPcLvl)} $\nLevel: ${this.userData.mainPcLvl}`, 
            {
                fontSize: '25px',
                fontFamily: 'Montserrat',
                color: '#ffffff',
                align: 'left',
                lineSpacing: 3
        }).setOrigin(0, 0.5)
        
        let buyMiningBtn = this.add.sprite(PcShop.WIDTH * 0.3, PcShop.HEIGHT * 0.5, "buy_mining_btn").setScale(newRatio * 0.9).setInteractive()
        //buyMiningBtn.x += buyMiningBtn.width / 2
        this.buyMiningTitle = this.add.text(PcShop.WIDTH * 0.6, buyMiningBtn.y - 5,
            `Price: ${calculateMiningPrice(this.userData.miningPcLvl)} $\nLevel: ${this.userData.miningPcLvl}`, 
            {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
        }).setOrigin(0, 0.5)

        let buyServerBtn = this.add.sprite(PcShop.WIDTH * 0.3, PcShop.HEIGHT * 0.8, "buy_server_btn").setScale(newRatio * 0.9).setInteractive()
        //buyServerBtn.x += buyServerBtn.width / 2
        this.buyServerTitle = this.add.text(PcShop.WIDTH * 0.6, buyServerBtn.y - 5,
            `Price: ${calculateServerPrice(this.userData.serverPcLvl)} $\nLevel: ${this.userData.serverPcLvl}`, 
            {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
        }).setOrigin(0, 0.5)


        let exitBtn = this.add.sprite(PcShop.WIDTH + 1, 0, "exit_btn").setOrigin(1, 0).setInteractive().setScale(newRatio)
        /* rounded exit btn
        const exitBtnShape = this.make.graphics();
        exitBtnShape.fillStyle(0xffffff);
        exitBtnShape.fillStyle(0xffffff, 0.3);
        exitBtnShape.fillRoundedRect(exitBtn.x - exitBtn.width, exitBtn.y, exitBtn.width, exitBtn.height, {tl: 0, tr: 32, br: 0, bl: 32});
        exitBtnShape.fillStyle(0xff00ff, 1)
        const exitBtnMask = exitBtnShape.createGeometryMask();
        exitBtn.setMask(exitBtnMask)
        */


        

        
        


        buyMainBtn.on("pointerdown", () => {
            buyMainBtn.setScale(newRatio * 0.85)
            let pcPrice = calculateMainPrice(this.userData.mainPcLvl)
            if(this.userData.moneyCurrency >= pcPrice){
                this.userData.moneyCurrency -= pcPrice
                this.userData.mainPcLvl++
            } else {
                alert("not enough money")
                return
            }

            this.buyMainTitle.setText(`Price: ${calculateMainPrice(this.userData.mainPcLvl)} $\nLevel: ${this.userData.mainPcLvl}`)
            this.scene.get(CST.SCENES.MAIN).cryptoPerClickTitle.setText(`${calculateClickingMultiplier(this.userData.mainPcLvl, this.userData.mainPcTechsLvl)} Ξ/click`)

        }).on("pointerup", () => {
            buyMainBtn.setScale(newRatio * 0.9)
        }).on("pointerout", () => {
            buyMainBtn.setScale(newRatio * 0.9)
        })

        buyMiningBtn.on("pointerdown", () => {
            buyMiningBtn.setScale(newRatio * 0.85)
            let pcPrice = calculateMiningPrice(this.userData.miningPcLvl)
            if(this.userData.moneyCurrency >= pcPrice) {
                this.userData.moneyCurrency -= pcPrice
                this.userData.miningPcLvl++
            } else {
                alert("not enough money")
                return
            }

            this.buyMiningTitle.setText(`Price: ${calculateMiningPrice(this.userData.miningPcLvl)} $\nLevel: ${this.userData.miningPcLvl}`)
            this.scene.get(CST.SCENES.MAIN).cryptoPerSecondTitle.setText(`${calculateAutoMining(this.userData.miningPcLvl, this.userData.miningPcTechsLvl)} Ξ/s`)
            this.changeMiningPicture(this.scene.get(CST.SCENES.MAIN))

            if(this.userData.miningPcLvl == 10) {
                this.playerTexts.set(`Theme ${this.counter}`, 2)
                this.counter++
                this.registry.set("texts_counter", this.counter)
            }
        }).on("pointerup", () => {
            buyMiningBtn.setScale(newRatio * 0.9)
        }).on("pointerout", () => {
            buyMiningBtn.setScale(newRatio * 0.9)
        })

        buyServerBtn.on("pointerdown", () => {
            buyServerBtn.setScale(newRatio * 0.85)
            let pcPrice = calculateServerPrice(this.userData.serverPcLvl)
            if(this.userData.moneyCurrency >= pcPrice) {
                this.userData.moneyCurrency -= pcPrice
                this.userData.serverPcLvl++
            } else {
                alert("not enough money")
                return
            }

            this.buyServerTitle.setText(`Price: ${calculateServerPrice(this.userData.serverPcLvl)} $\nLevel: ${this.userData.serverPcLvl}`)
            this.changeServerPicture(this.scene.get(CST.SCENES.MAIN))

        }).on("pointerup", () => {
            buyServerBtn.setScale(newRatio * 0.9)
    
        }).on("pointerout", () => {
            buyServerBtn.setScale(newRatio * 0.9)
        })





        const mainMenuBtns = this.registry.get("mainSceneBtns")
        
        exitBtn.on("pointerdown", () => {
            exitBtn.setScale(newRatio * 0.95)
            mainMenuBtns.forEach((el) => {el.setInteractive()})
            this.scene.sleep()
            this.scene.setVisible(false)

            this.scene.get(CST.SCENES.MAIN).bg_layer.setVisible(false)
        }).on("pointerup", () => {
            exitBtn.setScale(newRatio * 1)
            
        }).on("pointerout", () => {
            exitBtn.setScale(newRatio * 1)
        })
        


        //debug
        drawDebugBounds(this, exitBtn)
        drawDebugBounds(this, this.cam)
        drawDebugBounds(this, buyMainBtn, buyMainBtn.getCenter().x, buyMainBtn.getCenter().y)
        drawDebugBounds(this, buyMiningBtn)
        drawDebugBounds(this, buyServerBtn)
        drawDebugBounds(this, this.buyMainTitle, this.buyMainTitle.getCenter().x, this.buyMainTitle.getCenter().y)
        drawDebugBounds(this, this.buyMiningTitle)
        drawDebugBounds(this, this.buyServerTitle)
    }

    changeMiningPicture(scene) {
        if (scene.userData.miningPcLvl != 0) { scene.miningPc.setVisible(true)}
        if(scene.userData.miningPcLvl >= 10 && scene.userData.miningPcLvl < 20) {
            scene.miningPc.setTexture("mining_lvl2")
        } else if(scene.userData.miningPcLvl >= 20) {
            scene.miningPc.setTexture("mining_lvl3")
        }
    }
    changeServerPicture(scene) {
        if (scene.userData.serverPcLvl != 0) { 
            scene.serverPc.setVisible(true)
            scene.serverValueTitle.setVisible(true)
        }
        if(scene.userData.serverPcLvl >= 10 && scene.userData.serverPcLvl < 20) {
            scene.serverPc.setTexture("mining_lvl2")
        } else if(scene.userData.serverPcLvl >= 20) {
            scene.serverPc.setTexture("mining_lvl3")
        }   
    }

    update() {
    }
}

