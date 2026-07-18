
// ==========================
// WATCH ADS V2
// ==========================

let watchBtn = document.getElementById("watchBtn");
let claimBtn = document.getElementById("claimBtn");
let timerBox = document.getElementById("timerBox");
let timer = document.getElementById("timer");

let coins = Number(localStorage.getItem("coins")) || 0;

watchBtn.addEventListener("click", function () {

    watchBtn.disabled = true;

    timerBox.style.display = "block";

    let seconds = 15;

    timer.innerHTML = seconds;

    let countdown = setInterval(function () {

        seconds--;

        timer.innerHTML = seconds;

        if (seconds <= 0) {

            clearInterval(countdown);

            timer.innerHTML = "Done ✅";

            claimBtn.style.display = "block";

        }

    }, 1000);

});

claimBtn.addEventListener("click", function () {

    coins += 100;

    localStorage.setItem("coins", coins);

    alert("🎉 Congratulations!\n\nYou earned +100 Coins.");

    window.location.href = "wallet.html";

});

