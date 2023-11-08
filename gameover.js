// Selecting elements from gameover HTML
var winStatus = document.getElementById("win-status");
var suggestionBox = document.getElementById("suggestion");

// Getting data from local storage which was set prviously
var status = localStorage.getItem("status");
var name = localStorage.getItem("Name");
var nickName = localStorage.getItem("nickname");
var player1Score = localStorage.getItem("player1_score");
var player2Score = localStorage.getItem("player2_score");
var selectedOption = localStorage.getItem("selectedOption");

// Defining arrays of winning and losing phrases
const winningPhrases = [
    `Congratulations, ${nickName}! You're a master bomb evader!`,
    `Mission accomplished, ${nickName}!`,
    `Impressive work, ${nickName}! You've emerged victorious!`,
    `Well done, ${nickName}! You've defused all the bombs!`,
];

const losingPhrases = [
    `Mission failed, ${nickName}.`,
    `Better luck next time, ${nickName}!`,
    `You were close, ${nickName}, but not close enough.`,
    `The enemy prevails this time, ${nickName}.`,
];

// Function to select a random phrase from an array
function getRandomPhrase(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Displaying  the appropriate message based on the selected mode
// For solo mode 
if (selectedOption === "solo-mode") {
    if (status === "won") {
        winStatus.textContent = `You Won, ${name}!`;
        suggestionBox.textContent = getRandomPhrase(winningPhrases);
    } else if (status === "lose") {
        winStatus.textContent = `You Lose, ${name}!`;
        suggestionBox.textContent = getRandomPhrase(losingPhrases);
    } else if (status === "tie") {
        winStatus.textContent = `It's a tie, ${name}`;
        suggestionBox.textContent = `Keep pushing, Agent ${nickName}!`;
    }
} // For multiplayer mode 
else if (selectedOption === "multiplayer-mode") {
    if (player1Score > player2Score) {
        winStatus.textContent = "PLAYER1 Won!";
        suggestionBox.textContent = "Better luck next time, Player 2!";
    } else if (player2Score > player1Score) {
        winStatus.textContent = "PLAYER2 Won!";
        suggestionBox.textContent = "Better luck next time, Player 1!";
    } else {
        winStatus.textContent = "Wow, You Both won";
        suggestionBox.textContent = "Clash again to decide";
    }
}
