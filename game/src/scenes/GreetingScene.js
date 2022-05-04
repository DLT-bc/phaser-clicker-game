import { CST } from "../CST.js";

const COLOR_PRIMARY = 0x502C88;
const COLOR_LIGHT = 0xA574EB;
const COLOR_DARK = 0xB92AD4;

export class GreetingScene extends Phaser.Scene {
    constructor () {
        super({
            key: CST.SCENES.GREETING
        });
        
    }
    init() {
        
    }
    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }
    // djfkjfjkgjg

    create() {
        console.log("Greeting!");

        let arrow = this.add.image(0, 0, "arrow").setVisible(false)

        var scene = this;
        Alert(scene, 'Hello!', 'This is learning blockchain game.\nThis is a small guide')
            .then(function () {
                arrow.setVisible(true)
                arrow.x = scene.game.renderer.width * 0.35
                arrow.y = scene.game.renderer.height * 0.4
                return Alert(scene, 'Clicking', 'This is your Main PC\nClick on it and get crypto currency', scene.game.renderer.width * 0.8);
            })
            .then(function () {
                arrow.x = scene.game.renderer.width * 0.1
                arrow.y = scene.game.renderer.height * 0.8
                arrow.angle = 90
                return Alert(scene, 'PC Shop', 'This is PC Shop\nHere you can buy and upgrade your PCs', scene.game.renderer.width * 0.2, scene.game.renderer.height * 0.6);
            })
            .then(function () {
                arrow.x = scene.game.renderer.width * 0.25

                return Alert(scene, 'Tech Shop', 'This is Tech Shop\nHere you can buy new technologies to upgrade the Blockchain', scene.game.renderer.width * 0.4, scene.game.renderer.height * 0.6);
            })
            .then(function () {
                arrow.x = scene.game.renderer.width * 0.38

                return Alert(scene, 'Blockchain Library', 'This page contains unlocked information\nabout Blockchain', scene.game.renderer.width * 0.6, scene.game.renderer.height * 0.6);
            })
            .then(function () {
                arrow.x = scene.game.renderer.width * 0.85
                arrow.y = scene.game.renderer.height * 0.75
                
                return Alert(scene, 'Exchanger', 'This is an exchanger\nIt allows you to exchange Crypto currency to Money\nYou can exchange 100% of your Crypto or 50%', scene.game.renderer.width * 0.64, scene.game.renderer.height * 0.55);
            })
            .then(function () {
                arrow.setVisible(false)
                return Alert(scene, 'Currency', 'On the top you can see your currencies: Money and Crypto\nMoney is using for upgrading PCs, Crypto - for buying new technologies', scene.game.renderer.width * 0.5, scene.game.renderer.height * 0.3);
            })
            .then(function () {
                return Alert(scene, "That's all", 'Play. Click. Earn. Learn.', scene.game.renderer.width * 0.5, scene.game.renderer.height * 0.5);
            })
            .then(function () {
                localStorage.setItem("isFirstStart", 0)
                scene.scene.resume(CST.SCENES.MAIN);
                scene.scene.stop()
            })

        
    }

    update() { }
}

var CreateAlertDialog = function (scene) {
    var dialog = scene.rexUI.add.dialog({
        width: 300,
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, COLOR_PRIMARY),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, COLOR_LIGHT),
            text: scene.add.text(0, 0, '', {
                fontSize: '20px'
            }),
            space: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }),

        content: scene.add.text(0, 0, '', {
            fontSize: '20px'
        }),

        actions: [
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),

                text: scene.add.text(0, 0, 'OK', {
                    fontSize: '20px'
                }),

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            })
        ],

        space: {
            title: 25,
            content: 25,
            action: 15,

            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false,  // Content is a pure text object
        }
    })
        .on('button.over', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle();
        });

    return dialog;
}

var SetAlertDialog = function (dialog, title, content) {
    if (title === undefined) {
        title = '';
    }
    if (content === undefined) {
        content = '';
    }
    dialog.getElement('title').text = title;
    dialog.getElement('content').text = content;
    return dialog;
}

var AlertDialog;
var Alert = function (scene, title, content, x, y) {
    if (x === undefined) {
        x = scene.game.renderer.width * 0.3;
    }
    if (y === undefined) {
        y = scene.game.renderer.height / 3;
    }
    if (!AlertDialog) {
        AlertDialog = CreateAlertDialog(scene)
    }
    SetAlertDialog(AlertDialog, title, content);
    AlertDialog
        .setPosition(x, y)
        .setVisible(true)
        .layout();

    return AlertDialog
        .moveFromPromise(1000, undefined, '-=500', 'Bounce')
        .then(function () {
            return scene.rexUI.waitEvent(AlertDialog, 'button.click');
        })
        .then(function () {
            return AlertDialog.moveToPromise(1000, undefined, '-=500', 'Back');
        })
        .then(function () {
            AlertDialog.setVisible(false);
            return Promise.resolve();
        })
}