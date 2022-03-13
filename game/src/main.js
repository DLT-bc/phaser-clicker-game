/** @type {import("../typings/phaser")} */

import { BlockchainLibrary } from "./scenes/BlockchainLibrary.js";
import { GreetingScene } from "./scenes/GreetingScene.js";
import { LoadScene } from "./scenes/LoadScene.js";
import { MainScene } from "./scenes/MainScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { PcShop } from "./scenes/PcShop.js";
import { TechShop } from "./scenes/TechShop.js";

const gameFieldWidth = document.documentElement.clientWidth
const gameFieldHeight = document.documentElement.clientHeight
console.log(gameFieldWidth, gameFieldHeight);

const config = {
    type: Phaser.AUTO,
    width: gameFieldWidth * 0.94,
    height: gameFieldHeight * 0.94,
    autoCenter: true,
    backgroundColor: "#444444",
    parent: "main_div",
    dom: {
        createContainer: true
    },
    scene: [
        LoadScene, MenuScene, MainScene, GreetingScene
    ]
    
};

let game = new Phaser.Game(config)