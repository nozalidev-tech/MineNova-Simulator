// ==========================
// SETTINGS POPUP
// ==========================

let settingsPopup = document.getElementById("settingsPopup");
let settingsPopupTitle = document.getElementById("settingsPopupTitle");
let settingsPopupMessage = document.getElementById("settingsPopupMessage");
let settingsOkBtn = document.getElementById("settingsOkBtn");

function showSettingsPopup(title, message){

    settingsPopupTitle.innerHTML = title;
    settingsPopupMessage.innerHTML = message;

    settingsPopup.style.display = "flex";

}

settingsOkBtn.addEventListener("click", function(){

    settingsPopup.style.display = "none";

});
// ==========================
// DARK MODE
// ==========================

// let darkModeBtn = document.getElementById("darkModeBtn");

// if(darkModeBtn){

//     darkModeBtn.addEventListener("click", function(){

//         showSettingsPopup(
//             "🌙 Dark Mode",
//             "Dark Mode will be available in the next MineNova update."
//         );

//     });

// }
// ==========================
// NOTIFICATIONS
// ==========================

let notificationBtn = document.getElementById("notificationBtn");

if(notificationBtn){

    notificationBtn.addEventListener("click", function(){

        showSettingsPopup(
            "🔔 Notifications",
            "Notifications feature is coming in the next update."
        );

    });

}

// ==========================
// LANGUAGE
// ==========================

let languageBtn = document.getElementById("languageBtn");

if(languageBtn){

    languageBtn.addEventListener("click", function(){

        showSettingsPopup(
            "🌐 Language",
            "Multiple languages will be available soon."
        );

    });

}

// ==========================
// CONTACT
// ==========================

let contactBtn = document.getElementById("contactBtn");

if(contactBtn){

    contactBtn.addEventListener("click",function(){

        window.location.href="contact.html";

    });

}

// ==========================
// PRIVACY
// ==========================

let privacyBtn = document.getElementById("privacyBtn");

if(privacyBtn){

    privacyBtn.addEventListener("click",function(){

        window.location.href="privacy.html";

    });

}

// ==========================
// ABOUT
// ==========================

let aboutBtn = document.getElementById("aboutBtn");

if(aboutBtn){

    aboutBtn.addEventListener("click", function(){

       window.location.href = "about.html";

    });

}

// ==========================
// RATE APP
// ==========================

let rateBtn = document.getElementById("rateBtn");

if(rateBtn){

    rateBtn.addEventListener("click", function(){

        showSettingsPopup(
            "⭐ Rate MineNova",
            "Rating feature will be available after Play Store release."
        );

    });

}

// ==========================
// DARK MODE
// ==========================

let darkModeBtn = document.getElementById("darkModeBtn");
let darkModeText = document.getElementById("darkModeText");

let darkMode = localStorage.getItem("darkMode") || "off";

// Page load
if(darkMode == "on"){

    document.body.classList.add("dark-mode");

    darkModeText.innerHTML = "🌙 Dark Mode : ON";

}else{

    darkModeText.innerHTML = "🌙 Dark Mode : OFF";

}

// Button Click
darkModeBtn.addEventListener("click",function(){

    if(darkMode == "off"){

        darkMode = "on";

        document.body.classList.add("dark-mode");

        darkModeText.innerHTML = "🌙 Dark Mode : ON";

    }else{

        darkMode = "off";

        document.body.classList.remove("dark-mode");

        darkModeText.innerHTML = "🌙 Dark Mode : OFF";

    }

    localStorage.setItem("darkMode",darkMode);

});