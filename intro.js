// Geting the input elements for names
var nameInput = document.getElementById('name');
var nicknameInput = document.getElementById('nickname');

// function for storing the name and nickname in local storage
function storeNameAndNickname() {
    // Getting the values entered by the user
    var Name = nameInput.value;
    var nickname = nicknameInput.value;

 
    // Storing the values in local storage
    localStorage.setItem("Name",Name);
    localStorage.setItem("nickname",nickname);
}

// Getting  the Start button element
var startButton = document.querySelector('.start-btn');

// Attaching a click event listener to the "Start Game" button
startButton.addEventListener('click',()=>{
    storeNameAndNickname()

     // Getting the selected game mode option
    var selectedOption = document.querySelector('input[name="mode"]:checked');

    if (selectedOption) {
        var optionValue = selectedOption.value;
        localStorage.setItem('selectedOption', optionValue);
         // Redirect to the "game.html" page
        window.location.href = './game.html';
    } else {
        alert('Please select an option before submitting.');
    }
}
);
    

