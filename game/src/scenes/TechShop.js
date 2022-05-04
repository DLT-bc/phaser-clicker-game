const COLOR_PRIMARY = 0x502C88;
const COLOR_LIGHT = 0xA574EB;
const COLOR_DARK = 0xB92AD4;

import { CST } from "../CST.js";
import { techInfo } from "../info.js";
import { newRatio } from "../main.js";
import { drawDebugBounds } from "../debug.js";
import { calculateAutoMining, calculateClickingMultiplier } from "../functional.js";
import { localization } from "../localization.js";

export class TechShop extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init() {
        this.userData = this.registry.get("userdata")

        TechShop.WIDTH = this.game.renderer.width * 0.8
        TechShop.HEIGHT = this.game.renderer.height * 0.8
    }

    create (data) {
        this.add.image(0, 0, "pc_shop_bg").setOrigin(0, 0)

        this.cam = this.cameras.main.setViewport(this.parent.x - TechShop.WIDTH / 2, this.parent.y - TechShop.HEIGHT / 2, TechShop.WIDTH, TechShop.HEIGHT);

        //setting scene rounded
        const camShape = this.make.graphics();
        camShape.fillStyle(0xffffff);
        camShape.fillStyle(0xffffff, 0.3);
        camShape.fillRoundedRect(this.parent.x - TechShop.WIDTH / 2, this.parent.y - TechShop.HEIGHT / 2, TechShop.WIDTH, TechShop.HEIGHT, 32);
        camShape.fillStyle(0xff00ff, 1)
        this.cam.setMask(camShape.createGeometryMask())

        const textBuyStyle = {
            fontSize: 300 * newRatio + '%',
            fontFamily: 'Montserrat',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 3
        }

        let buyMainTech = this.add.sprite(TechShop.WIDTH * 0.18, TechShop.HEIGHT * 0.85, "buy_tech_btn").setInteractive().setScale(newRatio * 0.7 * 1)
        let buyBtnTitle = this.add.text(buyMainTech.x, buyMainTech.y, `${localization.getLocale('techShopB')}`, textBuyStyle).setOrigin(0.5)
        if(this.userData.techLvl >= 10) {
            buyMainTech.disableInteractive()
            buyMainTech.setTint(0x808080)
        }

        this.techImg = this.add.image(TechShop.WIDTH * 0.8, TechShop.HEIGHT * 0.5, `tech_${this.userData.techLvl + 1}`).setScale(newRatio * 0.5)


        let textNameStyle = {
            width: "50%",
            height: "15%",
            top: "1%",
            left: "6%",
            //border: "dashed red",
            fontSize: "150%",
            color: '#ffffff',
            fontFamily: 'Montserrat'
        }
        this.techName = this.add.dom(TechShop.WIDTH * 0.3, TechShop.HEIGHT * 0.1).createElement('p', textNameStyle)
        

        let textStyle = {
            width: "40%",
            height: "30%",
            top: "15%",
            left: "1%",
            //border: "dashed red",
            //fontSize: "14px",
            color: '#ffffff',
            fontFamily: 'Montserrat'
        }
        this.text = this.add.dom(TechShop.WIDTH * 0.3, TechShop.HEIGHT * 0.3).createElement('p', textStyle)

        this.techPrice = this.add.text(buyMainTech.x + buyMainTech.width * buyMainTech.scaleX * 1.1, buyMainTech.y,
            `${localization.getLocale('techShop1')}: ${techInfo[this.userData.techLvl].price} Ξ`,  {
                fontSize: '25px',
                fontFamily: 'Montserrat',
                color: '#ffffff',
                boundsAlignV: 'bottom',
                stroke: "red",
        }).setOrigin(0.5, 0.5).setScale(newRatio * 1)

        this.updateInfo()
        


        buyMainTech.on("pointerdown", () => {
            buyMainTech.setScale(newRatio * 0.7 * 0.95)

            if(this.userData.cryptoCurrency >= techInfo[this.userData.techLvl].price) {
                this.userData.cryptoCurrency -= techInfo[this.userData.techLvl].price
                this.userData.techLvl++
                alert(localization.variant === 'ru' ? 'Вам доступна новая тема в Блокчейн Библиотеке! ' : 'You have unlocked a new theme in Blockchain Library!')
            } else {
                alert(localization.getLocale('techShop2'))
            }

            if(this.userData.techLvl >= 10) {
                console.log(this.userData.techLvl);
                buyMainTech.disableInteractive()
                buyMainTech.setTint(0x808080)
                this.techImg.setVisible(false)
            }

            this.scene.get(CST.SCENES.MAIN).updateText()

            this.updateInfo()

        }).on("pointerup", () => {
            buyMainTech.setScale(newRatio * 0.7 * 1)
        }).on("pointerout", () => {
            buyMainTech.setScale(newRatio * 0.7 * 1)
        })

        

        let exitBtn = this.add.sprite(TechShop.WIDTH * 0.98 , TechShop.HEIGHT * 0.03, "exit_btn").setOrigin(1, 0).setInteractive().setScale(newRatio * 0.7 * 1)
        /* rounded exit btn
        const exitBtnShape = this.make.graphics();
        exitBtnShape.fillStyle(0xffffff);
        exitBtnShape.fillStyle(0xffffff, 0.3);
        exitBtnShape.fillRoundedRect(exitBtn.x - exitBtn.width, exitBtn.y, exitBtn.width, exitBtn.height, {tl: 0, tr: 32, br: 0, bl: 32});
        exitBtnShape.fillStyle(0xff00ff, 1)
        const exitBtnMask = exitBtnShape.createGeometryMask();
        exitBtn.setMask(exitBtnMask)
        */

        const mainMenuBtns = this.registry.get("mainSceneBtns")
        exitBtn.on("pointerdown", () => {
            exitBtn.setScale(newRatio * 0.7 * 0.95)
            
        }).on("pointerup", () => {
            exitBtn.setScale(newRatio * 0.7 * 1)
            
            mainMenuBtns.forEach((el) => {el.setInteractive()})
            this.scene.sleep()
            this.scene.setVisible(false)
            this.scene.get(CST.SCENES.MAIN).bg_layer.setVisible(false)


            const deleteText = document.querySelectorAll("p")
            deleteText.forEach(el => el.remove());
            
        }).on("pointerout", () => {
            exitBtn.setScale(newRatio * 0.7 * 1)
        })

        // debug    
        //drawDebugBounds(this, this.cam)
        //drawDebugBounds(this, exitBtn)
        //drawDebugBounds(this, buyMainTech)
        //drawDebugBounds(this, this.techImg)

    }

    updateInfo() {
        this.techImg.setTexture("tech_" + (this.userData.techLvl + 1))
        this.techName.setText(localization.variant === 'ru' ? techInfo[this.userData.techLvl].nameRU : techInfo[this.userData.techLvl].name)
        this.text.setText(localization.variant === 'ru' ? techInfo[this.userData.techLvl].infoRU : techInfo[this.userData.techLvl].info);
        this.techPrice.setText(`${localization.getLocale('techShop1')}: ${techInfo[this.userData.techLvl].price} Ξ`)
    }
   
    update() {
    }

}