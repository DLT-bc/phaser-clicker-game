const COLOR_PRIMARY = 0x502C88;
const COLOR_LIGHT = 0xA574EB;
const COLOR_DARK = 0xB92AD4;

import { CST } from "../CST.js";
import { techInfo } from "../info.js";
import { newRatio } from "../main.js";
import { drawDebugBounds } from "../debug.js";
import { calculateAutoMining } from "../functional.js";

export class TechShop extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init() {
        this.userData = this.registry.get("userdata")

        TechShop.WIDTH = this.game.renderer.width * 0.7
        TechShop.HEIGHT = this.game.renderer.height * 0.7
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

       
        let buyMainTech = this.add.sprite(TechShop.WIDTH * 0.3, TechShop.HEIGHT * 0.8, "buy_tech_btn").setInteractive().setScale(newRatio * 0.7 * 1)

        this.techImg = this.add.image(TechShop.WIDTH * 0.8, TechShop.HEIGHT * 0.5, "tech_" + this.userData.techLvl)

        this.techNameInfo = this.add.text(TechShop.WIDTH * 0.3, TechShop.HEIGHT * 0.1,
            `${techInfo[this.userData.techLvl].name}\n${techInfo[this.userData.techLvl].info}`, 
            {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
        }).setOrigin(0.5, 0.5)

        this.techPrice = this.add.text(TechShop.WIDTH * 0.2, TechShop.HEIGHT * 0.4,
            `Price: ${techInfo[this.userData.techLvl].price}`, 
            {
               fontSize: '25px',
               fontFamily: 'Montserrat',
               color: '#ffffff',
               align: 'left',
               lineSpacing: 3
        }).setOrigin(0.5, 0.5)

        

        

        


        buyMainTech.on("pointerdown", () => {
            buyMainTech.setScale(newRatio * 0.7 * 0.95)
            if(this.userData.cryptoCurrency >= techInfo[this.userData.techLvl].price) {
                this.userData.cryptoCurrency -= techInfo[this.userData.techLvl].price
                this.userData.techLvl++
                this.updateInfo()
            } else {
                alert("Not Enough Money")
            }

            this.scene.get(CST.SCENES.MAIN).cryptoPerSecondTitle.setText(`${calculateAutoMining(this.userData.miningPcLvl, this.userData.techLvl)} Ξ/s`)

            if(this.userData.techLvl >= 11) {
                buyMainTech.setInteractive(false)
                buyMainTech.setTint(0x808080)
            }
            
        }).on("pointerup", () => {
            buyMainTech.setScale(newRatio * 0.7 * 1)
        }).on("pointerout", () => {
            buyMainTech.setScale(newRatio * 0.7 * 1)
        })





        let exitBtn = this.add.sprite(TechShop.WIDTH + 1, 0, "exit_btn").setOrigin(1, 0).setInteractive()
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
            exitBtn.setScale(0.95)
            mainMenuBtns.forEach((el) => {el.setInteractive()})
            this.scene.sleep()
            this.scene.setVisible(false)

            this.scene.get(CST.SCENES.MAIN).bg_layer.setVisible(false)
        }).on("pointerup", () => {
            exitBtn.setScale(1)
            
        }).on("pointerout", () => {
            exitBtn.setScale(1)
        })

        //debug
        drawDebugBounds(this, this.cam)
        drawDebugBounds(this, exitBtn)
        drawDebugBounds(this, buyMainTech)
        drawDebugBounds(this, this.techImg)

    }

    updateInfo() {
        this.techImg.setTexture("tech_" + this.userData.techLvl)
        this.techNameInfo.setText(`${techInfo[this.userData.techLvl].name}\n${techInfo[this.userData.techLvl].info}`)
        this.techPrice.setText(`Price: ${techInfo[this.userData.techLvl].price}`)
    }

    update() {
    }

}