// ==========================
// MINENOVA LEADERBOARD
// ==========================

let leaderboardBody = document.getElementById("leaderboardBody");

// Demo Data
// let players = [

//     {
//         name:"Noz Ali",
//         level:12,
//         coins:8500
//     },

//     {
//         name:"Ahmed",
//         level:10,
//         coins:7200
//     },

//     {
//         name:"Hamza",
//         level:9,
//         coins:6400
//     },

//     {
//         name:"Bilal",
//         level:8,
//         coins:5100
//     },

//     {
//         name:"Usman",
//         level:7,
//         coins:4300
//     }

// ];
let players = [

    {

        name: localStorage.getItem("username"),

        level: Number(localStorage.getItem("level")),

        coins: Number(localStorage.getItem("coins"))

    }

];

// Coins ke hisaab se sort
players.sort(function(a,b){

    return b.coins - a.coins;

});

// Show Table
players.forEach(function(player,index){

    let rank = index + 1;

    let row = document.createElement("tr");

    let rankClass = "";

    if(rank == 1) rankClass = "rank1";
    if(rank == 2) rankClass = "rank2";
    if(rank == 3) rankClass = "rank3";

    row.innerHTML = `

        <td class="${rankClass}">#${rank}</td>

        <td>${player.name}</td>

        <td>${player.level}</td>

        <td>${player.coins}</td>

    `;

    leaderboardBody.appendChild(row);

});