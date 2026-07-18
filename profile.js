

let coins = Number(localStorage.getItem("coins")) || 0;
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let maxEnergy = Number(localStorage.getItem("maxEnergy")) || 500;
let miningTime = Number(localStorage.getItem("miningTime")) || 2000;

// ==========================
// PROFILE PHOTO
// ==========================

let profileImage = document.getElementById("profileImage");
let photoInput = document.getElementById("photoInput");
let changePhotoBtn = document.getElementById("changePhotoBtn");

if(profileImage && photoInput && changePhotoBtn){

    // Load saved photo
    let savedPhoto = localStorage.getItem("profilePhoto");

    if(savedPhoto){

        profileImage.src = savedPhoto;

    }

    // Open gallery
    changePhotoBtn.addEventListener("click", function(){

        photoInput.click();

    });

    // Save selected photo
    photoInput.addEventListener("change", function(){

        let file = this.files[0];

        if(!file) return;

        let reader = new FileReader();

        reader.onload = function(e){

            profileImage.src = e.target.result;

            localStorage.setItem("profilePhoto", e.target.result);

        };

        reader.readAsDataURL(file);

    });

}

// ==========================
// USERNAME
// ==========================

let profileName = document.getElementById("profileName");
let changeNameBtn = document.getElementById("changeNameBtn");

if(profileName && changeNameBtn){

    // Agar username pehle se save hai
    let savedName = localStorage.getItem("username");

    if(savedName){

        profileName.innerHTML = savedName;

    }

    // Change Username
    changeNameBtn.addEventListener("click", function(){

        let newName = prompt("Enter your username:");

        if(newName == null) return;

        newName = newName.trim();

        if(newName == "") return;

        profileName.innerHTML = newName;

        localStorage.setItem("username", newName);

        alert("✅ Username Updated");

    });

}
// ==========================
// PROFILE INFO
// ==========================

let profileLevel = document.getElementById("profileLevel");
let profileXP = document.getElementById("profileXP");
let profileCoins = document.getElementById("profileCoins");
let profileEnergy = document.getElementById("profileEnergy");
let profileSpeed = document.getElementById("profileSpeed");
let profileRank = document.getElementById("profileRank");
let joinDate = document.getElementById("joinDate");

// Join Date
if(joinDate){

    if(localStorage.getItem("joinDate") == null){

        let today = new Date();

        let date =
        today.getDate() + "/" +
        (today.getMonth() + 1) + "/" +
        today.getFullYear();

        localStorage.setItem("joinDate", date);

    }

    joinDate.innerHTML = localStorage.getItem("joinDate");

}

// Profile Data
if(profileLevel) profileLevel.innerHTML = level;
if(profileXP) profileXP.innerHTML = xp;
if(profileCoins) profileCoins.innerHTML = coins;
if(profileEnergy) profileEnergy.innerHTML = maxEnergy;
if(profileSpeed) profileSpeed.innerHTML = (miningTime / 1000).toFixed(1) + " sec";

// Rank
if(profileRank){

    let rank = "Beginner";

    if(level >= 5) rank = "Silver Miner";
    if(level >= 10) rank = "Gold Miner";
    if(level >= 15) rank = "Diamond Miner";
    if(level >= 20) rank = "Legendary Miner";

    profileRank.innerHTML = rank;

}

// ==========================
// XP PROGRESS BAR
// ==========================

let xpFill = document.getElementById("xpFill");
let xpProgressText = document.getElementById("xpText");

if(xpFill && xpProgressText){

    let levelXP = {
        1:150,
        2:250,
        3:350,
        4:500,
        5:650,
        6:800,
        7:1000,
        8:1250,
        9:1500
    };

    let needXP = levelXP[level] || 150;

    let percent = Math.floor((xp / needXP) * 100);

    if(percent > 100){
        percent = 100;
    }

    xpFill.style.width = percent + "%";

    xpProgressText.innerHTML =
    xp + " / " + needXP + " XP (" + percent + "%)";
}