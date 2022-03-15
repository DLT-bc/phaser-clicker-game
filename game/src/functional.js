//earn
export function calculateClickingMultiplier(mainPcLvl, mainPcTechnologiesAmount) {
    return Math.pow(calculateClickingMultiplier(mainPcLvl - 1, mainPcTechnologiesAmount), 1.01) + 1 * (mainPcLvl - 1) + mainPcTechnologiesAmount * 1.2
}

export function calculateAutoMining(miningPcLvl, miningPcTechsLvl) {
    return calculateAutoMining(miningPcLvl - 1, miningPcTechsLvl) + 5 * (miningPcLvl - 1)
}

export function calculateServerStorage(serverPcLvl, serverPcTechsLvl) {
    return calculateServerStorage(serverPcLvl - 1, serverPcTechsLvl) * Math.pow(1.2, serverPcLvl - 1) 
}

//price
export function calculateMainPrice(pcLvl) {
    return calculateMainPrice(pcLvl) * pow(1.07, pcLvl - 1);
}
export function calculateMiningPrice(pcLvl) {
    return calculateMiningPrice(pcLvl) * pow(1.07, pcLvl - 1);
}
export function calculateServerPrice(pcLvl) {
    return calculateServerPrice(pcLvl) * pow(1.2, pcLvl - 1);
}

//exchanger
export function calculateExchangeRate(reputation) {
    return Math.floor(((Math.random() * (1.1 - 0.7) + 0.7) + reputation / 10) * 100) / 100;
}
