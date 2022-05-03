import { drawDebugBounds } from "../debug.js";
import { textInfo } from "../info.js";

const COLOR_PRIMARY = 0x502C88;
const COLOR_LIGHT = 0xA574EB;
const COLOR_DARK = 0xB92AD4;

export class BlockchainLibrary extends Phaser.Scene {
    constructor (handle, parent) {
        super(handle);
        this.parent = parent
    }

    init () {
        this.userData = this.registry.get("userdata")
        this.counter = this.registry.get("texts_counter")
        this.playerTexts = this.registry.get("player_texts")
        this.textInfo = textInfo
    }

    create (data) {
        this.add.image(0, 0, "pc_shop_bg").setOrigin(0, 0)
        this.add.image(0, 0, "logo").setScale(0.04).setOrigin(0, 0)

        this.cam = this.cameras.main.setViewport(0, 0, this.game.renderer.width, this.game.renderer.height);

        //setting scene rounded
        //const camShape = this.make.graphics();
        //camShape.fillStyle(0xffffff);
        //camShape.fillStyle(0xffffff, 0.3);
        //camShape.fillRoundedRect(this.parent.x - BlockchainLibrary.WIDTH / 2, this.parent.y - BlockchainLibrary.HEIGHT / 2, BlockchainLibrary.WIDTH, BlockchainLibrary.HEIGHT, 32);
        //camShape.fillStyle(0xff00ff, 1)
        //this.cam.setMask(camShape.createGeometryMask())

       
        let exitBtn = this.add.sprite(this.game.renderer.width + 1, 0, "exit_btn").setOrigin(1, 0).setInteractive()    
        /* rounded exit btn
        const exitBtnShape = this.make.graphics();
        exitBtnShape.fillStyle(0xffffff);
        exitBtnShape.fillStyle(0xffffff, 0.3);
        exitBtnShape.fillRoundedRect(exitBtn.x - exitBtn.width, exitBtn.y, exitBtn.width, exitBtn.height, {tl: 0, tr: 32, br: 0, bl: 32});
        exitBtnShape.fillStyle(0xff00ff, 1)
        const exitBtnMask = exitBtnShape.createGeometryMask();
        exitBtn.setMask(exitBtnMask)
        */

        
        console.log("size: " + this.registry.get("player_texts").size)
        
        
        this.scrollablePanel = this.rexUI.add.scrollablePanel({
            x: this.game.renderer.width * 0.3 / 2,
            y: this.game.renderer.height / 2 + this.game.renderer.height * 0.05,
            width: this.game.renderer.width * 0.3,
            height: this.game.renderer.height - this.game.renderer.height * 0.1,

            scrollMode: 0,

            background: this.add.rectangle(this.x, this.y, this.width, this.height, COLOR_PRIMARY),

            panel: {
                child: createGrid(this),
                mask: {
                    mask: true,
                    padding: 10,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 40, 5, COLOR_LIGHT),
                thumb: this.rexUI.add.roundRectangle(0, 0, 25, 40, 5, COLOR_DARK),
                // position: 'left'
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,
                orientation: 0,
                text: this.add.text(0, 0, 'Blockchain for everyone', { fontSize: '14px', fontFamily: 'Montserrat'}),
            }),

            footer: this.rexUI.add.label({
                height: 30,
                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_PRIMARY),
            }),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                header: 10,
                footer: 10,
            }
        }).layout()

        let textStyle = {
            width: "67%",
            height: "80%",
            top: "44%",
            left: "35%",
            border: "dashed red",
            fontSize: '14px',
            fontFamily: 'Montserrat'
        }

        let textPanel = this.add.rectangle(this.scrollablePanel.x + this.scrollablePanel.width / 2, this.scrollablePanel.y,
            this.game.renderer.width * 0.7,  this.game.renderer.height - this.game.renderer.height * 0.1,
            0xFFFFFF).setOrigin(0, 0.5).setStrokeStyle(5, 0xFFFFFF)

        let text = this.add.dom(textPanel.x, textPanel.y - textPanel.height / 2).createElement('p', textStyle, "")
        text.setText(this.textInfo[0].text);
        console.log(text);

        /* var print = this.add.text(textPanel.x + 6, textPanel.y - textPanel.height / 2 + 6, this.textInfo[0].text, {
            fontSize: '14px',
            fontFamily: 'Montserrat',
            color: '#000000',
            align: 'left',
            lineSpacing: 3,
            maxLines: 100
        }).setOrigin(0, 0);
        */

        this.scrollablePanel.setChildrenInteractive()
        .on('child.click', (child, pointer, event) => {
            child.setScale(0.95)

            let id = this.playerTexts.get(child.text)
            console.log(id, this.textInfo[id - 1].id, this.textInfo[id - 1].text);
            if (this.textInfo[id - 1].id == id) {
                text.setText(this.textInfo[id - 1].text);
                console.log(text);
            }
            setTimeout(() => {child.setScale(1)}, 50)
 
        })
        
        const mainMenuBtns = this.registry.get("mainSceneBtns")
        
        exitBtn.on("pointerdown", () => {
            exitBtn.setScale(0.95)
            mainMenuBtns.forEach((el) => {el.setInteractive()})

            const deleteText = document.querySelectorAll("p")
            console.log(deleteText);
            deleteText.forEach(el => el.remove());
        }).on("pointerup", () => {
            exitBtn.setScale(1)
            this.scene.sleep()
            this.scene.setVisible(false)
        }).on("pointerover", () => {
            
        }).on("pointerout", () => {
            exitBtn.setScale(1)
        })

        //debug
        drawDebugBounds(this, exitBtn)
        drawDebugBounds(this, this.cam)
        drawDebugBounds(this, this.scrollablePanel)
        drawDebugBounds(this, textPanel)

    }

    addLabel(themeId) {
        this.scrollablePanel.getElement('panel').add(this.rexUI.add.label({
            width: this.game.renderer.width * 0.25, height: 60,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
            text: this.add.text(0, 0, `Theme ${this.counter}`, {
                fontSize: 18
            }),

            align: 'center',
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        }))
        this.scrollablePanel.layout()

        this.playerTexts.set(`Theme ${this.counter}`, themeId)
        this.counter++
    }

    update() {
        this.registry.set("player_texts", this.playerTexts)
        this.registry.set("texts_counter", this.counter)
    }

}

var createGrid = function (scene) {
    // Create table body
    var sizer = scene.rexUI.add.fixWidthSizer({
        space: {
            left: 3,
            right: 3,
            top: 5,
            bottom: 5,
            item: 8,
            line: 30,
        },
    }).addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY))

    for (let i = 1; i <= scene.registry.get("player_texts").size; i++) {
        sizer.add(scene.rexUI.add.label({
            width: scene.game.renderer.width * 0.25, height: 60,
            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
            text: scene.add.text(0, 0, `Theme ${i}`, {
                fontSize: 18
            }),
    
            align: 'center',
            space: {
                   left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        }));
        
    }
        
    

    return sizer;
}