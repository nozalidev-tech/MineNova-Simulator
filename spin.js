// ==========================
// MINENOVA LUCKY SPIN
// ==========================

let wheel = document.getElementById("wheelCanvas");
let ctx = wheel.getContext("2d");

let watchSpinBtn = document.getElementById("watchSpinBtn");

let adBox = document.getElementById("adBox");
let adTimer = document.getElementById("adTimer");

let resultBox = document.getElementById("resultBox");
let resultText = document.getElementById("resultText");

let nextSpinTimer = document.getElementById("nextSpinTimer");

// Wallet

let coins = Number(localStorage.getItem("coins")) || 0;

// Rewards

let rewards = [

    "🪙",
    "💰",
    "💎",
    "🎁",
    "👑",
    "😢"

];

// Colors

let colors = [

    "#ff5252",
    "#ff9800",
    "#ffeb3b",
    "#4caf50",
    "#03a9f4",
    "#9c27b0"

];

let wheelRadius = 175;

let arc = (2 * Math.PI) / rewards.length;

let currentRotation = 0;

let spinning = false;

function drawWheel(){

    ctx.clearRect(0,0,350,350);

    for(let i=0;i<rewards.length;i++){

        let angle = i * arc;

        ctx.beginPath();

        ctx.moveTo(wheelRadius,wheelRadius);

        ctx.arc(

            wheelRadius,
            wheelRadius,
            wheelRadius,
            angle,
            angle + arc

        );

        ctx.closePath();

        ctx.fillStyle = colors[i];

        ctx.fill();

        ctx.strokeStyle = "#fff";

        ctx.lineWidth = 3;

        ctx.stroke();

        // Reward Text

        ctx.save();

        ctx.translate(wheelRadius,wheelRadius);

        ctx.rotate(angle + arc/2);

        ctx.fillStyle = "#fff";

        ctx.font = "bold 18px Arial";

        ctx.textAlign = "right";

        ctx.fillText(

            rewards[i],

            wheelRadius - 20,

            8

        );

        ctx.restore();

    }

}

drawWheel();
// ==========================
// WATCH AD (15 SEC)
// ==========================

watchSpinBtn.addEventListener("click", function () {

    if (spinning) return;

    let lastSpin = Number(localStorage.getItem("lastSpin")) || 0;
    let now = Date.now();

    // 24 Hours = 86400000 ms
    if (lastSpin != 0 && (now - lastSpin) < 86400000) {

        alert("⏳ You already used today's Lucky Spin.");

        return;

    }

    watchSpinBtn.disabled = true;

    adBox.style.display = "block";

    let timeLeft = 15;

    adTimer.innerHTML = timeLeft;

    let timer = setInterval(function () {

        timeLeft--;

        adTimer.innerHTML = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            adBox.style.display = "none";

            startSpin();

        }

    }, 1000);

});
// ==========================
// START SPIN
// ==========================
function startSpin() {

    spinning = true;

    resultBox.style.display = "none";

    let randomIndex = Math.floor(Math.random() * rewards.length);

    // Har slice = 60°
    // Pointer top par hai
    let targetAngle = (randomIndex * 60) + 30;

    // 8 full rounds + exact stop
    currentRotation += (360 * 8) + (360 - targetAngle);

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(function () {

        // Final angle se reward nikalna
        let finalAngle = currentRotation % 360;

        let pointerAngle = (360 - finalAngle + 30) % 360;

        let finalIndex = Math.floor(pointerAngle / 60);

        finishSpin(finalIndex);

    }, 5000);

}
// ==========================
// FINISH SPIN
// ==========================

function finishSpin(randomIndex){
    console.log("Reward Index:", randomIndex);
console.log("Reward:", rewards[randomIndex]);

    spinning = false;

    watchSpinBtn.disabled = false;

    let reward = rewards[randomIndex];

    let rewardCoins = 0;

  if(reward == "🪙") rewardCoins = 10;
if(reward == "💰") rewardCoins = 20;
if(reward == "💎") rewardCoins = 50;
if(reward == "🎁") rewardCoins = 100;
if(reward == "👑") rewardCoins = 500;

    if(reward == "😢"){

        resultText.innerHTML = "😅 TRY AGAIN";

    }else{

        coins += rewardCoins;

        localStorage.setItem("coins", coins);

        resultText.innerHTML =
        "🎉 You Won " + rewardCoins + " Coins";

    }

    resultBox.style.display = "block";

    localStorage.setItem("lastSpin", Date.now());

    updateNextSpin();

}
// ==========================
// NEXT SPIN TIMER
// ==========================

function updateNextSpin(){

    let lastSpin = Number(localStorage.getItem("lastSpin")) || 0;

    if(lastSpin == 0){

        nextSpinTimer.innerHTML = "Ready";

        return;

    }

    let timer = setInterval(function(){

        let remain = 86400000 - (Date.now() - lastSpin);

        if(remain <= 0){

            clearInterval(timer);

            nextSpinTimer.innerHTML = "Ready";

            return;

        }

        let h = Math.floor(remain / 3600000);

        let m = Math.floor((remain % 3600000) / 60000);

        let s = Math.floor((remain % 60000) / 1000);

        nextSpinTimer.innerHTML =
        h + "h " + m + "m " + s + "s";

    },1000);

}

updateNextSpin();