// ==========================
// WALLET PAGE
// ==========================

// Load Coins
let coins = Number(localStorage.getItem("coins")) || 0;

// Wallet Elements
let walletCoins = document.getElementById("walletCoins");
let walletBalance = document.getElementById("walletBalance");

if(walletCoins){

    walletCoins.innerHTML = coins;

}

if(walletBalance){

    walletBalance.innerHTML = (coins / 50000).toFixed(2);

}

// ==========================
// DEPOSIT
// ==========================

let depositBtn = document.getElementById("depositBtn");

depositBtn.addEventListener("click", function(){

    showWalletPopup(
        "💰 Deposit",
        "Deposit feature is coming soon."
    );

});

// ==========================
// WITHDRAW
// ==========================

let withdrawBtn = document.getElementById("withdrawBtn");

withdrawBtn.addEventListener("click", function(){

    showWalletPopup(
        "💸 Withdraw",
        "Withdraw feature is coming soon."
    );

});

// ==========================
// RECENT TRANSACTIONS
// ==========================

let activityList = document.getElementById("activityList");

if(activityList){

    let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

    if(transactions.length == 0){

        activityList.innerHTML =
        "<p>No Transactions Yet</p>";

    }

    else{

        activityList.innerHTML = "";

        transactions.forEach(function(item){

            activityList.innerHTML += `
            <p>
            ${item.type}
            <br>
            <strong>${item.amount}</strong>
            <br>
            <small>${item.time}</small>
            </p>
            `;

        });

    }

}
// ==========================
// WALLET POPUP
// ==========================

let walletPopup = document.getElementById("walletPopup");
let popupTitle = document.getElementById("popupTitle");
let popupMessage = document.getElementById("popupMessage");
let popupOkBtn = document.getElementById("popupOkBtn");

function showWalletPopup(title, message){

    popupTitle.innerHTML = title;
    popupMessage.innerHTML = message;

    walletPopup.style.display = "flex";

}

popupOkBtn.addEventListener("click", function(){

    walletPopup.style.display = "none";

});
// ==========================
// WALLET HISTORY
// ==========================

let walletHistory = document.getElementById("walletHistory");

if(walletHistory){

    let history = JSON.parse(localStorage.getItem("transactions")) || [];

    if(history.length == 0){

        walletHistory.innerHTML =
        "<p>No Wallet Transactions Yet</p>";

    }else{

        walletHistory.innerHTML = "";

          history.slice().reverse().forEach(function(item){

    // Sirf Wallet Transactions dikhani hain
    if(
        item.type !== "💰 Deposit" &&
        item.type !== "💸 Withdraw"
    ){
        return;
    }

    let div = document.createElement("div");

    div.className = "history-item";

    div.innerHTML = `
        <strong>${item.type}</strong><br>
        <span>${item.amount}</span>
    `;

    walletHistory.appendChild(div);
    

});

    }

}
if(walletHistory.innerHTML == ""){

    walletHistory.innerHTML = `
        <p style="text-align:center;color:#999;">
            No Wallet Transactions Yet
        </p>
    `;

}