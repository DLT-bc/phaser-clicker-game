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


var targetWidth = 960 // идеальная ширина приложения (под неё рисуем спрайты и т.п.)
var targetHeight = 640 // 640х960 - это iPhone 4, под меньшее разрешение наверно нет смысла делать

var deviceRatio = window.innerWidth / window.innerHeight
var newRatio = (targetHeight / targetWidth) * deviceRatio
            
var newWidth = targetWidth * newRatio
var newHeight = targetHeight

console.log(newWidth, newHeight)

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