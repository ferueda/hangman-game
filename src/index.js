import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.createElement('div');
puzzleEl.className = 'puzzle';
const guessesEl = document.createElement('p');
guessesEl.style.textAlign = 'center';
const startBtn = document.querySelector('#start');
const container = document.querySelector('.container');
const label = document.querySelector('label');
const select = document.querySelector('select');

let game1;

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  render();
});

const render = () => {
  puzzleEl.innerHTML = '';
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split('').forEach(letter => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async () => {
  const puzzle = await getPuzzle(select.value);
  const lives = {
    2: 5,
    3: 6,
    4: 7,
    5: 8,
    6: 9,
    7: 9,
    8: 10
  };
  game1 = new Hangman(puzzle, lives[select.value]);
  render();
};

startBtn.addEventListener('click', () => {
  if (document.querySelector('label')) label.parentNode.removeChild(label);
  if (document.querySelector('select')) select.parentNode.removeChild(select);

  container.appendChild(puzzleEl);
  container.appendChild(guessesEl);
  startBtn.textContent = 'Reset Game';
  startGame();
});
