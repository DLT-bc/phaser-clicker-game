import { CST } from "../CST.js";
import { calculatePcPrice } from "../functional.js";

export class PcShop extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init() {
        this.userData = this.registry.get("userdata")
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

        this.mainPcPrice = calculatePcPrice(this.userData.mainPcLvl)
        this.miningPcPrice = calculatePcPrice(this.userData.miningPcLvl)
        this.serverPcPrice = calculatePcPrice(this.userData.serverPcLvl)

        //add sprites
        let buyMainBtn = this.add.sprite(PcShop.WIDTH * 0.01 , PcShop.HEIGHT * 0.4, "buy_main_btn").setScale(0.9).setInteractive()
        buyMainBtn.x += buyMainBtn.width / 2
        this.buyMainTitle = this.add.text(buyMainBtn.x + buyMainBtn.width / 1.5, buyMainBtn.y - 5,
                "Price: " + calculatePcPrice(this.userData.mainPcLvl) + "\n"
                + "Level: " + this.userData.mainPcLvl, {
                fontSize: '25px',
                fontFamily: 'Montserrat',
                color: '#ffffff',
                align: 'left',
                lineSpacing: 3
            }).setOrigin(0.5, 0.5)
    

        let buyMiningBtn = this.add.sprite(PcShop.WIDTH * 0.01, buyMainBtn.y + buyMainBtn.height * 1.1, "buy_mining_btn").setScale(0.9).setInteractive()
        buyMiningBtn.x += buyMiningBtn.width / 2
        this.buyMiningTitle = this.add.text(buyMiningBtn.x + buyMiningBtn.width / 1.5, buyMiningBtn.y - 5,
            "Price: " + calculatePcPrice(this.userData.miningPcLvl) + "\n"
             + "Level: " + this.userData.miningPcLvl, {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
           }).setOrigin(0.5, 0.5)

        let buyServerBtn = this.add.sprite(PcShop.WIDTH * 0.01, buyMiningBtn.y + buyMiningBtn.height * 1.1, "buy_server_btn").setScale(0.9).setInteractive()
        buyServerBtn.x += buyServerBtn.width / 2
        this.buyServerTitle = this.add.text(buyServerBtn.x + buyServerBtn.width / 1.5, buyServerBtn.y - 5,
            "Price: " + calculatePcPrice(this.userData.serverPcLvl) + "\n"
             + "Level: " + this.userData.serverPcLvl, {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
           }).setOrigin(0.5, 0.5)


        let exitBtn = this.add.sprite(PcShop.WIDTH + 1, 0, "exit_btn").setOrigin(1, 0).setInteractive()

        
        
        
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
            buyMainBtn.setScale(0.85)
            if(this.userData.moneyCurrency >= calculatePcPrice(this.userData.mainPcLvl)){
                this.userData.moneyCurrency -= calculatePcPrice(this.userData.mainPcLvl)
                this.userData.mainPcLvl++
            } else {
                alert("not enough money")
            }

        }).on("pointerup", () => {
            buyMainBtn.setScale(0.9)
        }).on("pointerout", () => {
            buyMainBtn.setScale(0.9)
        })

        buyMiningBtn.on("pointerdown", () => {
            buyMiningBtn.setScale(0.85)
            if(this.userData.moneyCurrency >= calculatePcPrice(this.userData.miningPcLvl)) {
                this.userData.moneyCurrency -= calculatePcPrice(this.userData.miningPcLvl)
                this.userData.miningPcLvl++
            } else {
                alert("not enough money")
            }
        }).on("pointerup", () => {
            buyMiningBtn.setScale(0.9)
        }).on("pointerout", () => {
            buyMiningBtn.setScale(0.9)
        })

        buyServerBtn.on("pointerdown", () => {
            buyServerBtn.setScale(0.85)
            if(this.userData.moneyCurrency >= calculatePcPrice(this.userData.serverPcLvl)) {
                this.userData.moneyCurrency -= calculatePcPrice(this.userData.serverPcLvl)
                this.userData.serverPcLvl++
            } else {
                alert("not enough money")
            }
        }).on("pointerup", () => {
            buyServerBtn.setScale(0.9)
    
        }).on("pointerout", () => {
            buyServerBtn.setScale(0.9)
        })





        const mainMenuBtns = this.registry.get("mainSceneBtns")
        
        exitBtn.on("pointerdown", () => {
            exitBtn.setScale(0.95)
            mainMenuBtns.forEach((el) => {el.setInteractive()})
            
        }).on("pointerup", () => {
            exitBtn.setScale(1)
            this.scene.sleep()
            this.scene.setVisible(false)
        }).on("pointerover", () => {
            
        }).on("pointerout", () => {
            exitBtn.setScale(1)
        })

    }
    update() {
        this.buyMainTitle.setText("Price: " + calculatePcPrice(this.userData.mainPcLvl) + "\n" + "Level: " + this.userData.mainPcLvl)
        this.buyMiningTitle.setText("Price: " + calculatePcPrice(this.userData.miningPcLvl) + "\n" + "Level: " + this.userData.miningPcLvl)
        this.buyServerTitle.setText("Price: " + calculatePcPrice(this.userData.serverPcLvl) + "\n" + "Level: " + this.userData.serverPcLvl)
    }
}

PcShop.WIDTH = document.documentElement.clientWidth * 0.7
PcShop.HEIGHT = document.documentElement.clientHeight * 0.7