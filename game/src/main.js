/** @type {import("../typings/phaser")} */

import { LoadScene } from "./scenes/LoadScene.js";
import { MainScene } from "./scenes/MainScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { PcShop } from "./scenes/PcShop.js";

const gameFieldWidth = document.documentElement.clientWidth
const gameFieldHeight = document.documentElement.clientHeight
console.log(gameFieldWidth, gameFieldHeight);

const config = {
    type: Phaser.AUTO,
    width: gameFieldWidth * 0.9,
    height: gameFieldHeight * 0.9,
    autoCenter: true,
    backgroundColor: "#444444",
    scene: [
        LoadScene, MenuScene, MainScene, PcShop
    ]
    
};

let game = new Phaser.Game(config)