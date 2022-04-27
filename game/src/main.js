/** @type {import("../typings/phaser")} */

import { BlockchainLibrary } from "./scenes/BlockchainLibrary.js";
import { GreetingScene } from "./scenes/GreetingScene.js";
import { LoadScene } from "./scenes/LoadScene.js";
import { MainScene } from "./scenes/MainScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { PcShop } from "./scenes/PcShop.js";
import { TechShop } from "./scenes/TechShop.js";

import { calcScale } from "./scale.js"

export let { newWidth, newHeight, newRatio } = calcScale()

const config = {
    type: Phaser.AUTO,
    width: newWidth,
    height: newHeight,
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