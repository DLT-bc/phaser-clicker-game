//earn
export function calculateClickingMultiplier(mainPcLvl, mainPcTechnologiesAmount) {
    return Math.floor(Math.pow(mainPcLvl, 1.5) + 1 * (mainPcLvl - 1) + mainPcTechnologiesAmount * 1.2)
}

export function calculateAutoMining(miningPcLvl, miningPcTechsLvl) {
    return Math.max(Math.floor(Math.pow(miningPcLvl, 1.5) + 5 * (miningPcLvl - 1) + miningPcTechsLvl * 1.2), 0)
}

export function calculateServerStorage(serverPcLvl, serverPcTechsLvl) {
    return 120 * Math.pow(1.2, serverPcLvl - 1) 
}

//price
export function calculateMainPrice(pcLvl) {
    return Math.floor(100 * Math.pow(1.07, pcLvl - 1))
}
export function calculateMiningPrice(pcLvl) {
    return Math.floor(150 * Math.pow(1.07, pcLvl - 1))
}
export function calculateServerPrice(pcLvl) {
    return Math.floor(120 * Math.pow(1.2, pcLvl - 1))
}

//exchanger
export function calculateExchangeRate(reputation) {
    return Math.floor(((Math.random() * (1.1 - 0.7) + 0.7) + reputation / 10) * 100) / 100;
}
