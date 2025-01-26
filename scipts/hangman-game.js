const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const quitBtn = document.getElementById('quit-button');
const popup = document.getElementById('popup');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const keyboard = document.getElementById('keyboard');
const guessCounter = document.getElementById('guess-counter');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['design', 'javascript', 'landscape', 'game', 'hangman'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

let wrongGuessCount = 0;
const maxWrongGuesses = 6;

function displayWord() {
    while (wordEl.firstChild) {
        wordEl.removeChild(wordEl.firstChild);
    }

    selectedWord.split('').forEach(letter => {
        const letterEl = document.createElement('span');
        letterEl.classList.add('letter');
        letterEl.textContent = correctLetters.includes(letter) ? letter : '';
        wordEl.appendChild(letterEl);
    });

    const innerWord = Array.from(wordEl.children).map(el => el.textContent).join('');

    if (innerWord === selectedWord) {
        finalMessage.textContent = 'Congrats, you won! 😃';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    while (wrongLettersEl.firstChild) {
        wrongLettersEl.removeChild(wrongLettersEl.firstChild);
    }

    wrongLetters.forEach(letter => {
        const letterEl = document.createElement('span');
        letterEl.textContent = letter;
        wrongLettersEl.appendChild(letterEl);
    });

    figureParts.forEach((part, index) => {
        if (index < wrongGuessCount) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    guessCounter.textContent = `Wrong guesses: ${wrongGuessCount}/${maxWrongGuesses}`;

    if (wrongGuessCount === maxWrongGuesses) {
        finalMessage.textContent = 'You lost! Do better!';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            wrongGuessCount++;
            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }
}

function generateKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const keyEl = document.createElement('button');
        keyEl.classList.add('key');
        keyEl.textContent = letter;
        keyEl.addEventListener('click', () => {
            keyEl.classList.add('disabled');
            handleGuess(letter);
        });
        keyboard.appendChild(keyEl);
    });
}

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    wrongGuessCount = 0;

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';

    Array.from(keyboard.children).forEach(key => {
        key.classList.remove('disabled');
    });

    figureParts.forEach(part => {
        part.style.display = 'none';
    });

    guessCounter.textContent = `Wrong guesses: ${wrongGuessCount}/${maxWrongGuesses}`;
});

$('#quit-button').on('click', function () {
    $('#popup').html('<h2>Thanks for playing!</h2>');

    setTimeout( () => {
        $('#popup').fadeOut(1000);
    }, 2000);
});

generateKeyboard();
displayWord();