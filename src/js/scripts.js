const gameContainerElement = document.getElementById('game-container');
const userScoreElement = document.getElementById('user-score');
const pcScoreElement = document.getElementById('pc-score');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');
const userPickedImageElement = document.getElementById('user-picked-image');
const pcPickedImageElement = document.getElementById('pc-picked-image');
const button = document.getElementById('button');

const gameOptions = ['paper', 'scissors', 'rock'];
let pcPlay;
let userPlay;
let userScore = 0;
let pcScore = 0;

const srcIcons = {
  paper: './assets/images/icon-paper.svg',
  scissors: './assets/images/icon-scissors.svg',
  rock: './assets/images/icon-rock.svg'
};

const gameRules = {
  paper: {
    rock: true,
    scissors: false
  },
  scissors: {
    paper: true,
    rock: false
  },
  rock: {
    scissors: true,
    paper: false
  }
};
const changeScreen = () => {
  if (gameContainerElement.classList.contains('hidden')) {
    gameContainerElement.classList.remove('hidden');
    resultContainerElement.classList.add('hidden');
  } else {
    gameContainerElement.classList.add('hidden');
    resultContainerElement.classList.remove('hidden');
  }
};
const imagePicked = () => {
  userPickedImageElement.src = srcIcons[userPlay];
  pcPickedImageElement.src = srcIcons[pcPlay];
};

const changeResultText = result => {
  if (result) {
    resultTextElement.textContent = 'YOU WIN';
  } else if (result !== undefined) {
    resultTextElement.textContent = 'YOU LOSE';
  } else {
    resultTextElement.textContent = 'DRAW';
  }
};

const checkPlay = () => {
  if (pcPlay === userPlay) {
    console.log('EMPATE');
  } else if (gameRules[userPlay][pcPlay]) {
    userScore++;
    userScoreElement.textContent = userScore;
  } else {
    pcScore++;
    pcScoreElement.textContent = pcScore;
  }
  changeScreen();
  imagePicked();
  changeResultText(gameRules[userPlay][pcPlay]);
};

const generateRandomOption = () => {
  const random = Math.floor(Math.random() * gameOptions.length);
  pcPlay = gameOptions[random];
  console.log(gameOptions[random]);
  checkPlay();
};

const handleClick = e => {
  userPlay = e.target.dataset.element;
  console.log(e.target.dataset.element);
  generateRandomOption();
};

button.addEventListener('click', changeScreen);
gameContainerElement.addEventListener('click', handleClick);
