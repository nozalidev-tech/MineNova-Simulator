
// ==========================
// MINENOVA VARIABLES
// ==========================

let coins = Number(localStorage.getItem("coins")) || 0;
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

let maxEnergy = Number(localStorage.getItem("maxEnergy")) || 500;
let energy = Number(localStorage.getItem("energy")) || maxEnergy;

let mining = false;
let miningTimer;

let miningTime =
Number(localStorage.getItem("miningTime")) || 2000;

let upgradeCost = 300;
let upgradeLevel = 1;
// ==========================
// AUTO MINER
// ==========================

let autoMinerExpiry =
Number(localStorage.getItem("autoMinerExpiry")) || 0;

let autoMinerActive = false;
// Check Auto Miner

// ==========================
// CHECK AUTO MINER
// ==========================

function checkAutoMiner(){

    if(Date.now() < autoMinerExpiry){

        autoMinerActive = true;

    }else{

        autoMinerActive = false;

        localStorage.removeItem("autoMinerExpiry");

    }

}

checkAutoMiner();


// ==========================
// HTML ELEMENTS
// ==========================

let coinText = document.getElementById("coins");
let xpText = document.getElementById("xp");
let levelText = document.getElementById("level");
let energyText = document.getElementById("energy");

let startBtn = document.getElementById("startMining");

// ==========================
// SHOW DATA
// ==========================

if(coinText){

    coinText.innerHTML = coins;

}

if(xpText){

    xpText.innerHTML = xp;

}

if(levelText){

    levelText.innerHTML = level;

}

if(energyText){

    energyText.innerHTML = energy;

}
// ==========================
// START MINING
// ==========================

if(startBtn){

startBtn.addEventListener("click", function(){

    if(mining){

        return;

    }

    if(energy <= 0){

        alert("⚡ Energy Finished");

        return;

    }

    mining = true;

    startBtn.innerHTML = "MINING...";



    miningTimer = setInterval(function(){

        if(energy <= 0){

            clearInterval(miningTimer);

            mining = false;

            startBtn.innerHTML = "START MINING";

            return;

        }


        coins += 1;
        console.log("Mining Working");
        localStorage.setItem("coins", coins);
        saveTransaction("⛏️ Mining", "+1");
localStorage.setItem("xp", xp);
localStorage.setItem("level", level);
localStorage.setItem("maxEnergy", maxEnergy);
localStorage.setItem("miningTime", miningTime);

        energy -= 1;


        localStorage.setItem("coins", coins);
        localStorage.setItem("energy", energy);


        coinText.innerHTML = coins;
        energyText.innerHTML = energy;
            checkXP();
            

    }, miningTime);

});

}

                               //3
// ==========================
// XP + LEVEL SYSTEM
// ==========================

let levelXP = {
    1:150,
    2:200,
    3:300,
    4:400,
    5:500,
    6:700,
    7:900,
    8:1100,
    9:1500
};

function checkXP(){

    let newXP = Math.floor(coins / 300);

    if(newXP > xp){

        xp = newXP;

        localStorage.setItem("xp", xp);

        if(xpText){

            xpText.innerHTML = xp;

        }

    }

    while(levelXP[level] && xp >= levelXP[level]){

        level++;

        maxEnergy += 100;

        energy = maxEnergy;

        localStorage.setItem("level", level);
        localStorage.setItem("maxEnergy", maxEnergy);
        localStorage.setItem("energy", energy);

        if(levelText){

            levelText.innerHTML = level;

        }

        if(energyText){

            energyText.innerHTML = energy;
        

        }

        alert("🎉 Level Up! Level " + level);

    }

}

// ==========================
// ENERGY REFILL
// ==========================

setInterval(function(){

    if(energy < maxEnergy){

        energy++;

        localStorage.setItem("energy", energy);

        if(energyText){

            energyText.innerHTML = energy;

        }

    }

},5000);
// ==========================
// AUTO MINER
// ==========================
let autoMinerTimer = null;

function startAutoMiner(){

    if(autoMinerTimer){

        clearInterval(autoMinerTimer);

    }

    let playerLevel =
    Number(localStorage.getItem("level")) || 1;

    let autoSpeed = 3000;

    if(playerLevel >= 5){

        autoSpeed = 1000;

    }
    else if(playerLevel >= 4){

        autoSpeed = 2000;

    }

    autoMinerTimer = setInterval(function(){

        checkAutoMiner();

        if(!autoMinerActive){

            return;

        }

        coins += 1;

        localStorage.setItem("coins",coins);

        if(coinText){

            coinText.innerHTML = coins;

        }

        checkXP();

    },autoSpeed);

}

// ==========================
// UPGRADE SYSTEM
// ==========================

let upgradeBtn = document.getElementById("upgradeBtn");
let upgradeCostText = document.getElementById("upgradeCost");
let speedText = document.getElementById("speed");

if(upgradeCostText){

    upgradeCostText.innerHTML = upgradeCost;

}

if(speedText){

    speedText.innerHTML = miningTime / 1000;

}

if(upgradeBtn){

upgradeBtn.addEventListener("click", function(){

    if(coins < upgradeCost){

        alert("❌ Not enough coins");

        return;

    }

    coins -= upgradeCost;
     localStorage.setItem("xp", xp);
     saveTransaction("⚡ Upgrade", "-" + upgradeCost);
localStorage.setItem("level", level);
localStorage.setItem("maxEnergy", maxEnergy);
localStorage.setItem("miningTime", miningTime);
    localStorage.setItem("coins", coins);

    if(coinText){

        coinText.innerHTML = coins;

    }

    upgradeLevel++;

    upgradeCost += 200;

    miningTime -= 200;

    if(miningTime < 1000){

        miningTime = 1000;

    }

    if(upgradeCostText){

        upgradeCostText.innerHTML = upgradeCost;

    }

    if(speedText){

        speedText.innerHTML = (miningTime / 1000).toFixed(1);

    }

    alert("✅ Upgrade Complete");

});

}

                             //5

// ==========================
// DAILY REWARD SYSTEM
// ==========================

let rewardBtn = document.getElementById("rewardBtn");
let rewardTimer = document.getElementById("rewardTimer");
if(rewardTimer){

    updateRewardTimer();

    setInterval(updateRewardTimer,1000);

}

function updateRewardTimer(){

    let lastReward = Number(localStorage.getItem("lastReward")) || 0;

    let now = Date.now();

    let nextReward = lastReward + 86400000; // 24 Hours

    if(lastReward == 0){
if(rewardTimer){

    rewardTimer.innerHTML = "🎁 Reward Available";

}
        

        return;

    }

    if(now >= nextReward){

        rewardTimer.innerHTML = "🎁 Reward Available";

        return;

    }

    let timeLeft = nextReward - now;

    let hours = Math.floor(timeLeft / (1000 * 60 * 60));

    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

   if(rewardTimer){

    rewardTimer.innerHTML =
    "Next Reward: " + hours + "h " + minutes + "m " + seconds + "s";

}
}

if(rewardBtn){

    rewardBtn.addEventListener("click", function(){

        let lastReward = Number(localStorage.getItem("lastReward")) || 0;
        let now = Date.now();

        // Agar reward already claim ho chuka hai
        if(lastReward != 0 && (now - lastReward) < 86400000){

            alert("⏳ Daily Reward Already Claimed");

            return;

        }

        // Reward available hai
        rewardPopup.style.display = "flex";

    });

}


   
// ==========================
// WALLET
// ==========================

function openWallet(){

    window.location.href = "wallet.html";

}
function openEarn(){

    window.location.href="earn.html";

}
function leaderboard(){

    window.location.href="leaderboard.html";

}


// ==========================
// PROFILE PAGE
// ==========================
let profileLevel = document.getElementById("profileLevel");
let profileXP = document.getElementById("profileXP");
let profileCoins = document.getElementById("profileCoins");
let profileEnergy = document.getElementById("profileEnergy");
let profileSpeed = document.getElementById("profileSpeed");



if(profileLevel){

    profileLevel.innerHTML = level;

}

if(profileXP){

    profileXP.innerHTML = xp;

}

if(profileCoins){

    profileCoins.innerHTML = coins;

}

if(profileEnergy){

    profileEnergy.innerHTML = maxEnergy;

}

if(profileSpeed){

    profileSpeed.innerHTML = (miningTime / 1000).toFixed(1);

}
     //    Date
     let joinDate = document.getElementById("joinDate");

if(localStorage.getItem("joinDate") == null){

    let today = new Date();

    let date =
    today.getDate() + "/" +
    (today.getMonth() + 1) + "/" +
    today.getFullYear();

    localStorage.setItem("joinDate", date);

}

if(joinDate){

    joinDate.innerHTML = localStorage.getItem("joinDate");

}
//    xp bar 
let xpFill = document.getElementById("xpFill");
let  xpProgressText = document.getElementById("xpText");

if(xpFill && xpProgressText ){

    let levelXP = {

        1:100,
        2:250,
        3:350,
        4:500,
        5:650,
        6:800,
        7:1000,
        8:1250,
        9:1500

    };

    let needXP = levelXP[level] || 1500;

    let percent = (xp / needXP) * 100;

    if(percent > 100){

        percent = 100;

    }

    xpFill.style.width = percent + "%";

    let percentage = Math.floor((xp / needXP) * 100);

 xpProgressText.innerHTML =
xp + " / " + needXP + " XP (" + percentage + "%)";

}

// ==========================
// PROFILE PHOTO
// ==========================

let profileImage = document.getElementById("profileImage");
let photoInput = document.getElementById("photoInput");
let changePhotoBtn = document.getElementById("changePhotoBtn");

if (profileImage && photoInput && changePhotoBtn) {

    // Agar pehle photo save hai to dikhao
    let savedPhoto = localStorage.getItem("profilePhoto");

    if (savedPhoto) {
        profileImage.src = savedPhoto;
    }

    // Button click -> file picker open
    changePhotoBtn.addEventListener("click", function () {
        photoInput.click();
    });

    // Photo select hone ke baad
    photoInput.addEventListener("change", function () {

        let file = this.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = function (e) {

            profileImage.src = e.target.result;

            localStorage.setItem("profilePhoto", e.target.result);

        };

        reader.readAsDataURL(file);

    });

}

// ==========================
// USERNAME SYSTEM
// ==========================

let profileName = document.getElementById("profileName");
let homeUsername = document.getElementById("username");
let changeNameBtn = document.getElementById("changeNameBtn");

// Agar pehle se username save hai
let savedUsername = localStorage.getItem("username");

if(savedUsername){

    if(profileName){

        profileName.innerHTML = savedUsername;

    }

    if(homeUsername){

        homeUsername.innerHTML = savedUsername;

    }

}

// Change Username
if(changeNameBtn){

changeNameBtn.addEventListener("click", function(){

    let newName = prompt("Enter your new username:");

    if(newName == null || newName.trim() == ""){

        return;

    }

    localStorage.setItem("username", newName);

    if(profileName){

        profileName.innerHTML = newName;

    }

    if(homeUsername){

        homeUsername.innerHTML = newName;

    }

    alert("✅ Username Updated Successfully");

});

}

// ==========================
// SAVE TRANSACTION
// ==========================

function saveTransaction(type, amount){

    let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.unshift({

        type: type,
        amount: amount,
        time: new Date().toLocaleString()

    });

    if(transactions.length > 20){

        transactions.pop();

    }

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// ==========================
// REWARD POPUP
// ==========================

let rewardPopup = document.getElementById("rewardPopup");
let watchAdBtn = document.getElementById("watchAdBtn");
let claimRewardBtn = document.getElementById("claimRewardBtn");
let adTimer = document.getElementById("adTimer");

// ==========================
// WATCH AD
// ==========================

if(watchAdBtn){

    watchAdBtn.addEventListener("click", function(){

        let timeLeft = 15;

        adTimer.innerHTML = timeLeft;

        watchAdBtn.disabled = true;

        let timer = setInterval(function(){

            timeLeft--;

            adTimer.innerHTML = timeLeft;

            if(timeLeft <= 0){

                clearInterval(timer);

                watchAdBtn.style.display = "none";

                claimRewardBtn.style.display = "block";

            }

        },1000);

    });

}

// ==========================
// CLAIM REWARD
// ==========================

if(claimRewardBtn){

    claimRewardBtn.addEventListener("click", function(){

        let lastReward = Number(localStorage.getItem("lastReward")) || 0;
        let now = Date.now();

        // Already claimed?
        if(lastReward != 0 && (now - lastReward) < 86400000){

            rewardPopup.style.display = "none";

            alert("⏳ Daily Reward Already Claimed");

            return;

        }

        rewardPopup.style.display = "none";

        watchAdBtn.style.display = "block";
        watchAdBtn.disabled = false;

        claimRewardBtn.style.display = "none";

        adTimer.innerHTML = "15";

        let rewardCoins = 100;

        if(level >= 4 && level <= 6){

            rewardCoins = 300;

        }

        if(level >= 7){

            rewardCoins = 500;

        }

        coins += rewardCoins;

        localStorage.setItem("coins", coins);

        if(coinText){

            coinText.innerHTML = coins;

        }

        saveTransaction("🎁 Daily Reward", "+" + rewardCoins);

        localStorage.setItem("lastReward", now);

        updateRewardTimer();

        alert("🎉 Reward Claimed +" + rewardCoins + " Coins");

    });

}

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("loadingScreen").style.opacity = "0";

        setTimeout(function () {

            document.getElementById("loadingScreen").style.display = "none";

        }, 800);

    }, 2500);

});