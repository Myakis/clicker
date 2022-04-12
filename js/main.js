//Констаны
const btnStart = document.querySelector('.game-start');
const btnContinue = document.querySelector('.game-continue');
const mainScreen = document.querySelector('.main-screen');
const count = document.querySelector('.ball-count');
const click = document.querySelector('.click-count');
const autoClicker = document.querySelector('.autoclicker');
const divAutoClicker = document.querySelector('.autoclick-div');
const factorBtn = document.querySelector('.factor-clicker');
const gameContainer = document.querySelector('.game-conteiner');
const level = document.querySelector('.level').firstElementChild;
const reboot = document.querySelector('.end-reboot');
btnContinue.hidden = true;

const formatter = new Intl.NumberFormat('ru');

const initializingVariables = baseData => {
  level.innerHTML = baseData.myLevel;
  count.textContent = formatter.format(baseData.yourCount);
};

//НАчать игру

let history = JSON.parse(localStorage.getItem('values'));

let baseData = {
  yourCount: 0,
  factorCount: 1,
  myLevel: 1,
  countsLevelItems: {
    levelItemOne: 1,
    levelItemTwo: 0,
    levelItemThree: 0,
    levelItemFour: 0,
    levelItemFive: 0,
  },
};
const currentData = [];

if (history !== null) {
  baseData = history[0];
  btnContinue.hidden = false;
  btnContinue.addEventListener('click', () => {
    initializingVariables(baseData);
    mainScreen.classList.add('scroll-top');
    gameContainer.classList.add('scroll-top');
  });
}

btnStart.addEventListener('click', () => {
  baseData = {
    yourCount: 0,
    factorCount: 1,
    myLevel: 1,
  };
  mainScreen.classList.add('scroll-top');
  gameContainer.classList.add('scroll-top');
});

//Random number
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

// Клик на кнопку
function clicker() {
  baseData.yourCount += baseData.factorCount;
  count.textContent = formatter.format(baseData.yourCount);
  count.style.fontSize = `${random(50, 40)}px `;
  count.style.background = randomColor();
  count.style.boxShadow = `1px 0px 15px 6px ${randomColor()}`;
  audioPlay('audio/click2.mp3');

  currentData.push(baseData);

  if (currentData.length > 1) {
    currentData.splice(0, 1);
  }

  localStorage.setItem('values', JSON.stringify(currentData));
}

function autoClickerRepeat() {
  baseData.yourCount += baseData.factorCount;
  count.textContent = formatter.format(baseData.yourCount);
}

//аудио
function audioPlay(search) {
  const audio = new Audio();
  audio.src = search;
  audio.play();
}

function gameLose() {
  baseData.myLevel = 'Ты проиграл';
  level.parentElement.innerHTML = baseData.myLevel;
  audioPlay('audio/lose.mp3');
  localStorage.clear();
}

function repeat() {
  document.querySelector('.game-end').classList.remove('hidden');
}

count.addEventListener('click', clicker);
//Автокликер функция

function autoClickerFunc(param) {
  audioPlay('audio/click.mp3');
  // document.querySelector(".audio1").play();
  if (baseData.yourCount >= currentCount) {
    setInterval(autoClickerRepeat, 1000);
    baseData.yourCount -= currentCount;
    currentCount += 100000;
    count.textContent = formatter.format(baseData.yourCount);
    ///Увеличение количества покупки уровней
    let countSpan = +param.nextElementSibling.innerHTML.match(/\d+/gi).join('');
    param.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
    //
    let currentPrice = currentCount;

    param.firstElementChild.innerHTML = formatter.format(currentPrice);
  } else {
    baseData.yourCount -= 'Lose';
    count.textContent = baseData.yourCount;
    gameLose();
    repeat();
  }
}

//Автокликер
let currentCount = 100000;
divAutoClicker.addEventListener('click', event => {
  if (event.target.className === 'autoclicker') {
    autoClickerFunc(event.target);
  }
  //При нажатии на span в блоке autoclick-div
  //Костыль, который нужно будет пофкисить
  if (event.target.className === 'autoclicker__count') {
    let parent = event.target.parentElement;
    autoClickerFunc(parent);
  }
  localStorage.setItem('values', JSON.stringify(currentData));
  currentData.push(baseData);

  if (currentData.length > 1) {
    currentData.splice(0, 1);
  }
});

//Если проиграл
reboot.addEventListener('click', () => {
  location.reload();
  localStorage.clear();
});

function randomColor() {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255,
  )})`;
}

//ДЕЛЕГИРОВАНИЕ
gameContainer.addEventListener('click', event => {
  if (event.target.closest('.factor-clicker')) {
    const dataValue = event.target.dataset.price ? event.target : event.target.parentElement;
    clickContainer(dataValue);
  }
});

//
function clickContainer(param) {
  let dataPrice = +param.dataset.price;
  const datasetCount = +param.dataset.count;
  const datasetLvl = +param.dataset.level;
  audioPlay('audio/click.mp3');
  if (baseData.yourCount >= dataPrice) {
    baseData.factorCount += datasetLvl;
    baseData.myLevel += datasetLvl;
    level.innerHTML = baseData.myLevel;

    baseData.yourCount -= dataPrice;
    //change ball with num
    count.textContent = formatter.format(baseData.yourCount);

    param.dataset.countsLevel = +param.dataset.countsLevel + 1;
    let upLevel = +param.dataset.countsLevel;

    ///Увеличение количества покупки уровней
    param.nextElementSibling.innerHTML = `x${upLevel}`;

    //Увеличение
    dataPrice += datasetCount;
    let priceLvl = param.firstElementChild;

    let formatPrice = +priceLvl.innerHTML.match(/\d+/gi).join('') + datasetCount;

    priceLvl.textContent = formatter.format(formatPrice);
    param.dataset.price = +param.dataset.price + datasetCount;
    localStorage.setItem('values', JSON.stringify(currentData));
    currentData.push(baseData);

    if (currentData.length > 1) {
      currentData.splice(0, 1);
    }
  } else {
    baseData.yourCount = 0;
    count.textContent = baseData.yourCount;
    gameLose();
    setTimeout(repeat, 100);
  }
}
