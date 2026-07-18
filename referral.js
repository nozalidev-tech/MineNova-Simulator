// ==========================
// MINENOVA REFERRAL
// ==========================

// Elements

let refCode = document.getElementById("refCode");
let copyBtn = document.getElementById("copyBtn");

let totalReferrals = document.getElementById("totalReferrals");
let refCoins = document.getElementById("refCoins");

// ==========================
// REFERRAL CODE
// ==========================

let myCode = localStorage.getItem("myReferralCode");

if(!myCode){

    myCode = "MN" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("myReferralCode", myCode);

}

refCode.innerHTML = myCode;

// ==========================
// REFERRAL DATA
// ==========================

let total = Number(localStorage.getItem("totalReferrals")) || 0;
let coins = Number(localStorage.getItem("referralCoins")) || 0;
const MAX_REFERRALS = 5;
totalReferrals.innerHTML = total;
refCoins.innerHTML = coins;

// ==========================
// COPY BUTTON
// ==========================

copyBtn.addEventListener("click", function(){

    navigator.clipboard.writeText(myCode);

    copyBtn.innerHTML = "✅ Copied";

    setTimeout(function(){

        copyBtn.innerHTML = "📋 Copy Code";

    },2000);

});
// ==========================
// CLAIM REFERRAL
// ==========================

let inviteCode = document.getElementById("inviteCode");
let claimReferralBtn = document.getElementById("claimReferralBtn");

let alreadyUsed =
Number(localStorage.getItem("referralUsed")) || 0;

claimReferralBtn.addEventListener("click",function(){
     if(total >= MAX_REFERRALS){

    alert("❌ Referral Limit Reached");

    return;

}
    if(alreadyUsed == 1){

        alert("❌ Referral Already Used");

        return;

    }

    let code = inviteCode.value.trim();

    if(code == ""){

        alert("⚠ Enter Referral Code");

        return;

    }

    if(code == myCode){

        alert("❌ You Can't Use Your Own Code");

        return;

    }

    // Reward

    let walletCoins =
    Number(localStorage.getItem("coins")) || 0;

    walletCoins += 200;

    localStorage.setItem("coins",walletCoins);

    coins += 200;

    localStorage.setItem("referralCoins",coins);

    total++;

    localStorage.setItem("totalReferrals",total);
    // ==========================
// 5 Referral Bonus
// ==========================

let bonusClaimed =
Number(localStorage.getItem("bonusClaimed")) || 0;

if(total == 5 && bonusClaimed == 0){

    walletCoins += 500;

    localStorage.setItem("coins",walletCoins);

    coins += 500;

    localStorage.setItem("referralCoins",coins);

    localStorage.setItem("bonusClaimed",1);

    alert("🏆 Congratulations!\n5 Referrals Complete\n+500 Bonus Coins");

}

    localStorage.setItem("referralUsed",1);

    totalReferrals.innerHTML = total;

    refCoins.innerHTML = coins;

    alert("🎉 Referral Successful\n+200 Coins");

});