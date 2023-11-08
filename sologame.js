const tiles = document.querySelectorAll('.tile');
const bombImage = '<img id="bombimg" src="./assets/bomb.png" alt="Bomb" style="display: none;">';

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
// bgm.play();
bgm.pause();
bgm.loop = true;



var bombBlast = new Audio("./assets/punch-a-rock-161647.mp3")
var bombBlast = new Audio("./assets/cannon-fire-161072.mp3")
var flipSound = new Audio("./assets/flip.mp3")


// creating a function to reveal the tile contents
function revealTile(tile) {
    tile.classList.add("revealed");
    if (tile.innerHTML === bombImage) {
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
let timerBox = document.getElementById("timer")
timerBox.textContent = time;
let interval;

function timerStart() {
    time = 9000; // maximum limit of timer 
    timerBox.textContent = time;
     interval = setInterval(() => {
         if (time == 0) {
             clearInterval(interval)
             localStorage.setItem("status","lose")
             location.href = "./gameover.html"
            }
        timerBox.textContent = time;    
        time--;
        }, 1000)
}   


// Initialzing score and bomb variables and setting them to zero intitially
let score = 0;
var scorebaord =document.getElementById("score-board")
scorebaord.innerHTML=score;
let bombs = 0;
var bombBoard = document.getElementById("bombs")
bombBoard.innerHTML=bombs;


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