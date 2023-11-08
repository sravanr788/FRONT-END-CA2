var selectedOption = localStorage.getItem("selectedOption")

console.log(selectedOption)

if (selectedOption === "solo-mode") {
    console.log("JavaScript code for option 1 is running.");
    // Solo mode code
    var tiles = document.querySelectorAll('.tile');
    var bombImage = '<img id="bombimg" src="./assets/bomb.png" alt="Bomb" style="display: none;">';
    
// Function to randomly place bombs
function placeBombs(bombCount) {
        const randombombIndices = [];

    while (randombombIndices.length < bombCount) {
        const randomNumber = Math.floor(Math.random() * tiles.length); // adding the ran
        if (randombombIndices.includes(randomNumber)==false) {
            randombombIndices.push(randomNumber);
        }
    }

    randombombIndices.forEach((index) => {
        tiles[index].innerHTML = bombImage; // adding  the bomb image to a tile
        tiles[index].classList.add("bomb-image"); 
    });
}

let bgm = new Audio("./assets/countdown-139316.mp3");
bgm.play();
// bgm.pause();
bgm.loop = true;


// var bombBlast = new Audio("./assets/punch-a-rock-161647.mp3")
var bombBlast = new Audio("./assets/cannon-fire-161072.mp3")
var flipSound = new Audio("./assets/flip.mp3")

// Initialzing score and bomb variables and setting them to zero intitially
let score = 0;
var scorebaord =document.getElementById("score-board")
scorebaord.innerHTML=score;
let bombs = 0;
var bombBoard = document.getElementById("bombs")
bombBoard.innerHTML=bombs;

// creating a function to reveal the tile contents
function revealTile(tile) {
    tile.classList.add("revealed");
    if (tile.innerHTML==bombImage) {
        tile.querySelector('img').style.display = "block"; // To show the bomb image in the tile 
        tile.classList.add("danger");
        bombs++;
        bombBoard.innerHTML = bombs;
        bombBlast.pause();
        bombBlast.currentTime = 0;
        bombBlast.play();
    } else if(tile.innerHTML==""){
        tile.classList.add("clicked");
        score++;
        scorebaord.innerHTML=score;
        flipSound.pause();
        flipSound.currentTime = 0.6;
        flipSound.play();
    }
    winningConditions();
}

// Adding event listener click  to all the  tiles

tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        revealTile(tile);
    });
});


// creating a timer for the game 
let time;
let timer = document.getElementById("Timer")
timer.textContent=time;
let interval;

function timerStart() {
    time = 90; // maximum limit of timer 
    timer.textContent = time;
     interval = setInterval(() => {
         if (time == 0) {
             clearInterval(interval)
             localStorage.setItem("status","lose")
             location.href = "./gameover.html"
            }
        timer.textContent = time;    
        time--;
        }, 1000)
}   


// adding winning conditions 
function winningConditions(){
if(score==20){
    localStorage.setItem("status","won")
    window.location.href="./gameover.html"
}
else if (bombs>=4){
    localStorage.setItem("status","lose")
    window.location.href="./gameover.html"
}else if((score==21 )&&(bombs=4)){
    localStorage.setItem("status","tie")
    window.location.href="./gameover.html"
}}

// Adding hint 
var hintbtn = document.getElementById("hint")
hintbtn.onclick = ()=>{
    revealRandomBomb();
    hintbtn.style.border = "1";
}

function revealRandomBomb() {
    var random = Math.floor(Math.random() * tiles.length);
    const tile = tiles[random];
    console.log(tiles.length)
    if (tile.innerHTML === bombImage) {
        tile.querySelector('img').style.display = 'block';
        setTimeout(() => {
            tile.querySelector('img').style.display = 'none';
        }, 1000); // hiding after showing  the bomb after 1 second
    }
}   

var numberOfBombs = 8 // can be adjusted according  to the difficulty 
// Placing bombs randomly when the game starts
placeBombs(numberOfBombs);
// setting the timer to the maximum time when the game starts
timerStart();
}

else if (selectedOption === "multiplayer-mode") {
    // Running JavaScript code for option 2
    console.log("JavaScript code for option 2 is running.");

    // Multiplayer mode code

    const tiles = document.querySelectorAll('.tile');
    const bombImage = '<img id="bombimg" src="./assets/bomb.png" alt="Bomb" style="display: none;">';

    // Function to randomly place bombs
    function placeBombs(bombCount) {
        const randombombIndices = [];

        while (randombombIndices.length < bombCount) {
            const randomNumber = Math.floor(Math.random() * tiles.length);
            if (randombombIndices.includes(randomNumber)==false) {
                randombombIndices.push(randomNumber);
            }
        }

        randombombIndices.forEach((index) => {
            tiles[index].innerHTML = bombImage;
            tiles[index].classList.add("bomb-image");
        });
    }

    let bgm = new Audio("./assets/countdown-139316.mp3");
    // bgm.play();
    bgm.loop = true;

    let bombBlast = new Audio("./assets/punch-a-rock-161647.mp3");
    let cannonFire = new Audio("./assets/cannon-fire-161072.mp3"); // Changed variable name
    let flipSound = new Audio("./assets/flip.mp3");


// Creating a function to reveal the tile contents
function revealTile(tile) {
    tile.classList.add("revealed");
    if (tile.innerHTML === bombImage) {
        tile.querySelector('img').style.display = "block";
        tile.classList.add("danger");
        bombs++;
        bombBoard.innerHTML = bombs;
        bombBlast.pause();
        bombBlast.currentTime = 0;
        bombBlast.play();
    } else if (tile.innerHTML === "") {
        tile.classList.add("clicked");
        if (currentPlayer === player1) {
            player1.score = score;
            localStorage.setItem("player1_score", player1.score);
        } else {
            player2.score = score;
            localStorage.setItem("player2_score", player2.score);
        }
        score++;
        scoreboard.innerHTML = score;
        flipSound.pause();
        flipSound.currentTime = 0.6;
        flipSound.play();
    }
    winningConditions();
}
  // Adding event listener click to all the tiles
  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        revealTile(tile);
    });
});

let time;
var timer = document.getElementById("Timer");
timer.textContent=time;
let interval;

function timerStart() {
    time = 90;
    timer.textContent=time;
    interval = setInterval(() => {
        if (time === 0) {
            clearInterval(interval);
            localStorage.setItem("status", "lose");
            location.href = "./gameover.html";
        }
        timer.textContent =time;
        time--;
    }, 1000);
}

let score = 0;
var scoreboard = document.getElementById("score-board"); // Changed variable name
scoreboard.innerHTML = score;
let bombs = 0;
var bombBoard = document.getElementById("bombs");
bombBoard.innerHTML = bombs;

const player1 = {
    score: 0,
};

const player2 = {
    score: 0,
};

let player1Finished = false; // Flag to check if Player 1 has completed their turn
let player2Finished = false; // Flag to check if Player 2 has completed their turn

// Adding winning conditions
function winningConditions() {
    if (score === 20) {
        // If Player 1 has completed their turn
        if (currentPlayer === player1) {
            player1Finished = true;
            localStorage.setItem("player1_score", player1.score); // Store Player 1's score after their turn
            switchPlayer(); // Switch to the next player's turn
        } else {
            player2Finished = true;
            localStorage.setItem("player2_score", player2.score); // Store Player 2's score after their turn
        }
    } else if (bombs >= 4) {
        if (currentPlayer === player1) {
            player1Finished = true;
            localStorage.setItem("player1_score", player1.score); // Store Player 1's score after their turn
            switchPlayer(); // Switch to the next player's turn
        } else {
            player2Finished = true;
            localStorage.setItem("player2_score", player2.score); // Store Player 2's score after their turn
        }
    }

    // Check if both players have finished their turns
    if (player1Finished && player2Finished) {
        // Both players have completed their turns, compare scores, and set the result
        if (player1.score > player2.score) {
            localStorage.setItem("status", "player1_win");
        } else if (player2.score > player1.score) {
            localStorage.setItem("status", "player2_win");
        } else {
            localStorage.setItem("status", "tie");
        }

        // Redirect to the game over screen
        location.href = "./gameover.html";
    }
}

// Variable to track the current player's turn
let currentPlayer = player2;

var hintbtn = document.getElementById("hint")
hintbtn.onclick = ()=>{
    revealRandomBomb();
    hintbtn.style.border = "1";
}

function revealRandomBomb() {
    var random = Math.floor(Math.random() * tiles.length);
    const tile = tiles[random];
    console.log(tiles.length)
    if (tile.innerHTML === bombImage) {
        tile.querySelector('img').style.display = 'block';
        setTimeout(() => {
            tile.querySelector('img').style.display = 'none';
        }, 1000); // hiding after showing  the bomb after 1 second
    }
}   

// Function to switch turns between players
function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        alert("Player 2's turn");
    } else {
        currentPlayer = player1;
        alert("Player 1's turn");
    }

    // Reseting  scores and bomb counts for the new player's turn
    score = 0;
    scoreboard.innerHTML = score;
    bombs = 0;
    bombBoard.innerHTML = bombs;

    resetGameBoard();
    placeBombs(8); // Adjust the number of bombs according to difficulty
    timerStart();
}

// Initialize the game
placeBombs(8); // can adjust the number of bombs according to difficulty
timerStart();

// Calling switchPlayer to start the game with the first player's turn
switchPlayer();

// Creating a function to reset the game board
function resetGameBoard() {
    tiles.forEach((tile) => {
        tile.innerHTML = ''; // Clearing all tiles content
        tile.classList.remove('bomb-image', 'revealed', 'danger', 'clicked');
});
}

};









