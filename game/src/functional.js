//earn
export function calculateClickingMultiplier(mainPcLvl, techLvl) {
    return Math.floor(Math.pow(mainPcLvl, 1.7) + 1 * (mainPcLvl - 1) * techLvl)
}

export function calculateAutoMining(miningPcLvl, techLvl) {
    return Math.max(Math.floor(Math.pow(miningPcLvl, 1.6) + 6 * (miningPcLvl - 1) * techLvl * 0.75), 0)
}

export function calculateServerStorage(serverPcLvl, techLvl) {
    return 120 * Math.pow(1.2, serverPcLvl - 1) 
}

//price
export function calculateMainPrice(pcLvl) {
    return Math.floor(100 * Math.pow(1.2, pcLvl - 1))
}
export function calculateMiningPrice(pcLvl) {
    return Math.floor(150 * Math.pow(1.25, pcLvl - 1))
}
export function calculateServerPrice(pcLvl) {
    return Math.floor(120 * Math.pow(1.26, pcLvl - 1))
}

//exchanger
export function calculateExchangeRate(reputation) {
    return Math.floor(((Math.random() * (1.1 - 0.7) + 0.7) + reputation / 10) * 100) / 100;
}
