import { drawDebugBounds } from "../debug.js";
import { textInfo } from "../info.js";
import { newRatio } from "../main.js";
import { localization } from '../localization.js';


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
        this.textInfo = textInfo
    }

    create (data) {
        this.add.image(0, 0, "pc_shop_bg").setOrigin(0, 0)
        this.add.image(0, 0, "logo").setScale(newRatio * 0.03).setOrigin(0, 0)

        this.cam = this.cameras.main.setViewport(0, 0, this.game.renderer.width, this.game.renderer.height);
       
    
        
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
                text: this.add.text(0, 0, localization.getLocale('blockchainLibrary1'), { fontSize: '14px', fontFamily: 'Montserrat'}),
            }),

            footer: this.rexUI.add.label({
                height: 0,
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
            //border: "dashed red",
            fontSize: '80%',
            fontFamily: 'Montserrat',
            color: '#ffffff'
        }

        let textPanel = this.add.rectangle(this.scrollablePanel.x + this.scrollablePanel.width / 2, this.scrollablePanel.y,
            this.game.renderer.width * 0.7,  this.game.renderer.height - this.game.renderer.height * 0.1).setOrigin(0, 0.5)

        let text = this.add.dom(textPanel.x, textPanel.y - textPanel.height / 2).createElement('p', textStyle, "")
        text.setHTML(localization.variant === 'ru' ? this.textInfo[0].textRU : this.textInfo[0].text);
        //console.log(text);

        this.scrollablePanel.setChildrenInteractive()
        .on('child.click', (child, pointer, event) => {
            child.setScale(0.95)

            let id = parseInt(child.text.slice(-1)) - 1
            if(parseInt(child.text.slice(-2)) == 10) {
                id = 9
            }
            
            if (this.textInfo[id].id == id) {
                text.setHTML(localization.variant === 'ru' ? this.textInfo[id].textRU : this.textInfo[id].text);
                console.log(text);
            }
            setTimeout(() => {child.setScale(1)}, 50)
 
        })
        
        const mainMenuBtns = this.registry.get("mainSceneBtns")
        
        let exitBtn = this.add.sprite(this.game.renderer.width * 0.98, this.game.renderer.height * 0.03, "exit_btn").setOrigin(1, 0).setInteractive().setScale(newRatio * 0.7)  

        exitBtn.on("pointerdown", () => {
            exitBtn.setScale(newRatio * 0.7 * 0.95)
            
        }).on("pointerup", () => {
            exitBtn.setScale(newRatio * 0.7)
            
            mainMenuBtns.forEach((el) => {el.setInteractive()})
            
            const deleteText = document.querySelectorAll("p")
            deleteText.forEach(el => el.remove());
            
            this.scene.sleep()
            this.scene.setVisible(false)
        }).on("pointerover", () => {
            
        }).on("pointerout", () => {
            exitBtn.setScale(newRatio * 0.7)
        })

        //debug
        //drawDebugBounds(this, exitBtn)
        //drawDebugBounds(this, this.cam)
        //drawDebugBounds(this, this.scrollablePanel)
        //drawDebugBounds(this, textPanel)

    }

    addLabel(themeId) {
        this.scrollablePanel.getElement('panel').add(this.rexUI.add.label({
            width: this.game.renderer.width * 0.25, height: 60,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
            text: this.add.text(0, 0, `${localization.getLocale('blockchainLibrary2')} ${this.counter}`, {
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

        this.playerTexts.set(`${localization.getLocale('blockchainLibrary2')} ${this.counter}`, themeId)
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

    for (let i = 0; i <= scene.userData.techLvl - 1; i++) {
        sizer.add(scene.rexUI.add.label({
            width: scene.game.renderer.width * 0.25, height: 60,
            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
            text: scene.add.text(0, 0, `${localization.getLocale('blockchainLibrary2')} ${i + 1}`, {
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