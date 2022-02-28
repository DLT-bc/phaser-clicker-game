export function calculateClickingMultiplier(mainPcLvl, mainPcTechnologiesAmount) {
    return mainPcLvl + mainPcTechnologiesAmount * 1.2
}

export function calculateAutoMining(miningPcLvl, miningPcTechsLvl) {
    let x = 0
    if (miningPcLvl !== 0) { x = 1 }
    return miningPcLvl + (Math.pow(2, miningPcLvl) * x) + miningPcTechsLvl * 1.2
}

export function calculatePcPrice(pcLvl) {
    return 100 + (50 * pcLvl * 1.5)
}

export function calculateExchangeRate(reputation) {
    return Math.floor(((Math.random() * (1.1 - 0.7) + 0.7) + reputation / 10) * 100) / 100;
}
