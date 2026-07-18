// ==========================
// SHOP VARIABLES
// ==========================

let coins = Number(localStorage.getItem("coins")) || 0;

// Upgrade Levels
let energyLevel = Number(localStorage.getItem("energyLevel")) || 1;
let speedLevel = Number(localStorage.getItem("speedLevel")) || 1;


// Costs
let energyCosts = [
1000,
1500,
3000,
5000,
8000,
15000,
25000,
40000,
60000,
100000
];

let energyCost =
energyCosts[energyLevel - 1] || 100000;

let speedCosts = [
2000,
3000,
7000,
15000,
30000
];

let speedCost =
speedCosts[speedLevel - 1] || 30000;
// ==========================
// AUTO MINER LEVELS
// ==========================

let playerLevel =
Number(localStorage.getItem("level")) || 1;
let autoCosts = {

    1:3000,

    2:6000,

    3:12000,

    4:25000,

    5:50000

};

let autoCost = autoCosts[playerLevel] || 50000;

// Buttons
let energyUpgradeBtn = document.getElementById("energyUpgradeBtn");
let speedUpgradeBtn = document.getElementById("speedUpgradeBtn");
let activateAutoMinerBtn = document.getElementById("activateAutoMiner");


// Cost Text
let energyCostText = document.getElementById("energyCost");
let speedCostText = document.getElementById("speedCost");
let autoCostText = document.getElementById("autoCost");

// Show Costs
energyCostText.innerHTML = energyCost;
speedCostText.innerHTML = speedCost;
if(speedLevel >= 5){

    speedUpgradeBtn.innerHTML = "MAX LEVEL";

    speedUpgradeBtn.disabled = true;

}
autoCostText.innerHTML = autoCost;
if(playerLevel >= 5){

    autoCostText.innerHTML = "MAX";

}


// ==========================
// ENERGY UPGRADE
// ==========================

energyUpgradeBtn.addEventListener("click",function(){

    if(coins < energyCost){

        alert("❌ Not Enough Coins");

        return;

    }

    coins -= energyCost;

    localStorage.setItem("coins",coins);

    energyLevel++;

    localStorage.setItem("energyLevel",energyLevel);
    energyCost =
energyCosts[energyLevel - 1] || 100000;

energyCostText.innerHTML = energyCost;

    let maxEnergy =
    Number(localStorage.getItem("maxEnergy")) || 1000;

    maxEnergy += 100;

    localStorage.setItem("maxEnergy",maxEnergy);

    alert("⚡ Energy Upgraded!\nMax Energy +100");

});
// Max Level

if(energyLevel >= 10){

    energyUpgradeBtn.innerHTML =
    "MAX LEVEL";

    energyUpgradeBtn.disabled = true;

}
// ==========================
// MINING SPEED UPGRADE
// ==========================

speedUpgradeBtn.addEventListener("click",function(){

    if(speedLevel >= 5){

        return;

    }

    if(coins < speedCost){

        alert("❌ Not Enough Coins");

        return;

    }

    coins -= speedCost;

    localStorage.setItem("coins",coins);

    speedLevel++;

    localStorage.setItem("speedLevel",speedLevel);
    
    let miningTime =
Number(localStorage.getItem("miningTime")) || 2000;

    // Mining Time
    miningTime -= 200;

    if(miningTime < 1000){

        miningTime = 1000;

    }

    localStorage.setItem("miningTime",miningTime);

    // Next Cost
    speedCost =
    speedCosts[speedLevel - 1] || 30000;

    speedCostText.innerHTML = speedCost;

    if(speedLevel >= 5){

        speedUpgradeBtn.innerHTML = "🔒 MAX LEVEL";

        speedUpgradeBtn.disabled = true;

    }

    alert("🚀 Mining Speed Upgraded!");

});
// ==========================
// AUTO MINER UPGRADE
// ==========================


let autoLevelText = document.getElementById("autoLevel");
let autoRewardText = document.getElementById("autoReward");
let autoStatusText = document.getElementById("autoStatus");
let autoTimeText = document.getElementById("autoTime");

// ==========================
// AUTO MINER STATUS
// ==========================

function updateAutoMinerStatus(){

    let expiry =
    Number(localStorage.getItem("autoMinerExpiry")) || 0;

    let now = Date.now();

    if(expiry > now){

        autoStatusText.innerHTML = "🟢 Active";

        let remaining = expiry - now;

        let hours = Math.floor(remaining / (1000 * 60 * 60));

        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        autoTimeText.innerHTML =
        hours + "h " +
        minutes + "m " +
        seconds + "s";

    }else{

        autoStatusText.innerHTML = "🔴 Inactive";

        autoTimeText.innerHTML = "00:00:00";

    }

}

// Run Every Second

setInterval(updateAutoMinerStatus,1000);

updateAutoMinerStatus();
// ==========================
// ACTIVATE AUTO MINER
// ==========================

activateAutoMinerBtn.addEventListener("click",function(){

    let expiry =
    Number(localStorage.getItem("autoMinerExpiry")) || 0;

    // Already Active

    if(expiry > Date.now()){

        alert("⚠️ Auto Miner Already Active");

        return;

    }

    // Check Coins

    let walletCoins =
    Number(localStorage.getItem("coins")) || 0;

    if(walletCoins < autoCost){

        alert("❌ Not Enough Coins");

        return;

    }

    // ⚠️ Rewarded Ad Yahan Lagegi (Baad me)

    // Deduct Coins

    walletCoins -= autoCost;

    localStorage.setItem("coins",walletCoins);

    // Activate 10 Hours

    let newExpiry =
    Date.now() + (10 * 60 * 60 * 1000);

    localStorage.setItem(
        "autoMinerExpiry",
        newExpiry
    );

    alert("🤖 Auto Miner Activated!\nValid For 10 Hours");

    updateAutoMinerStatus();

});