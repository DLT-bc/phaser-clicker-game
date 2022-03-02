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

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: this.game.renderer.width * 0.3 / 2,
            y: this.game.renderer.height / 2 + this.game.renderer.height * 0.05,
            width: this.game.renderer.width * 0.3,
            height: this.game.renderer.height - this.game.renderer.height * 0.1,

            scrollMode: 0,

            background: this.add.rectangle(this.x, this.y, this.width, this.height, COLOR_PRIMARY).setStrokeStyle(1, 0xFFFFFF),

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
                text: this.add.text(0, 0, 'Blockchain for everyone'),
            }),

            // footer: this.rexUI.add.label({
            //     height: 30,

            //     orientation: 0,
            //     background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
            //     text: this.add.text(0, 0, 'Footer'),
            // }),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                header: 10,
                footer: 10,
            }
        })
            .layout()

        var print = this.add.text(0, 0, '');

        scrollablePanel.setChildrenInteractive()
        .on('child.click', function (child, pointer, event) {
                print.text += `Click ${child.text}\n`;
        })
        .on('child.pressstart', function (child, pointer, event) {
                print.text += `Press ${child.text}\n`;
        })

        var textPanel = this.add.rectangle(scrollablePanel.x + scrollablePanel.width / 2, scrollablePanel.y,
            this.game.renderer.width * 0.7,  this.game.renderer.height - this.game.renderer.height * 0.1,
            0xFFFFFF).setOrigin(0, 0.5).setStrokeStyle(5, 0xFFFFFF)


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
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY))

    for (var i = 0; i < 30; i++) {
        sizer.add(scene.rexUI.add.label({
            width: scene.game.renderer.width * 0.25, height: 60,

            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
            text: scene.add.text(0, 0, `${i}`, {
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