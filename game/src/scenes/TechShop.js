const COLOR_PRIMARY = 0x502C88;
const COLOR_LIGHT = 0xA574EB;
const COLOR_DARK = 0xB92AD4;

import { CST } from "../CST.js";
import { drawDebugBounds } from "../debug.js";

export class TechShop extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init() {
        this.userData = this.registry.get("userdata")
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

       
        let buyMainTech = this.add.sprite(TechShop.WIDTH / 2, TechShop.HEIGHT * 0.3, "buy_tech_btn").setInteractive()

        

        

        


        buyMainTech.on("pointerdown", () => {
            buyMainTech.setScale(0.95)
            
        }).on("pointerup", () => {
            buyMainTech.setScale(1)
        }).on("pointerout", () => {
            buyMainTech.setScale(1)
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

    }
    update() {
    }

}



TechShop.WIDTH = document.documentElement.clientWidth * 0.7
TechShop.HEIGHT = document.documentElement.clientHeight * 0.7