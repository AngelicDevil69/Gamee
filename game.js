// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage('Please enter a valid number between 1 and 100.');
        return;
    }
    
    attempts++;
    
    if (userGuess === secretNumber) {
        setMessage(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`);
        disableInput();
    } else if (userGuess < secretNumber) {
        setMessage('Too low. Try again.');
    } else {
        setMessage('Too high. Try again.');
    }
    
    document.getElementById('userGuess').value = '';
    document.getElementById('userGuess').focus();
}

function setMessage(message) {
    document.getElementById('message').textContent = message;
}

function disableInput() {
    document.getElementById('userGuess').disabled = true;
    document.querySelector('button').disabled = true;
}
