const hangmanImage = document.querySelector(".hangman img");
const letterDisplay = document.querySelector(".letter-display");
const guessText = document.querySelector(".guess b");
const keyboardDiv = document.querySelector(".keyboard");
const resultGif = document.querySelector(".result-gif");
const playAgainbtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 8;


const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `assets/hangman.jpg`;
    guessText.innerText =  `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    letterDisplay.innerHTML = currentWord.split("").map(() => '<li class="word"></li>').join("");
    
    // resultGif.classList.remove("show");

}

const getRandomWord = () => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const gifText = isVictory ? `You found the word:` : `The correct word was:`;
        resultGif.querySelector("img").src = `assets/${isVictory ? 'win' : 'lost'}.gif`;
        resultGif.querySelector("h4").src = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        resultGif.querySelector("p").innerHTML = `${gifText} <b>${currentWord}</b>`;
        // resultGif.classList.add("show"); 
        // resultGif.style.display = 'none'
    }, 300);
}

const initGame = (button, clickedLetter) => {
    correctLetters= []
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                letterDisplay.querySelectorAll("li")[index].innerText = letter;
                letterDisplay.querySelectorAll("li")[index].classList.add("guess");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `assets/hangman${wrongGuessCount}.jpg`;
    }
    if(wrongGuessCount === maxGuesses) {
        resultGif.style.display = 'block'
    }

    button.disabled = true;
    guessText.innerText =  `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <=122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
    keyboardDiv.appendChild(button);
}

getRandomWord(); 
playAgainbtn.addEventListener('click', () => { 
    getRandomWord, resultGif.style.display = 'none'
    if(wrongGuessCount >= 8) {
        location.reload();
    }
}) ;