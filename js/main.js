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
const items = document.querySelectorAll('.factor-clicker');
btnContinue.hidden = true;

const formatter = new Intl.NumberFormat('ru');

const initializingVariables = baseData => {
  const counts = Object.values(baseData.itemCounts);
  const prices = Object.values(baseData.itemsPrice);
  level.innerHTML = baseData.myLevel;
  count.textContent = formatter.format(baseData.yourCount);
  items.forEach((el, i) => {
    el.dataset.counts = counts[i];
    el.dataset.price = prices[i];
    initializingItems(el, counts[i]);
  });
};

//Начать игру

let history = JSON.parse(localStorage.getItem('values'));
let baseData = {
  yourCount: 0,
  factorCount: 1,
  myLevel: 1,
  itemCounts: {
    1: 1,
    10: 0,
    100: 0,
    1000: 0,
  },
  itemsPrice: {
    1: 100,
    10: 1000,
    100: 10000,
    1000: 1000000,
  },
};

if (history !== null) {
  btnContinue.hidden = false;
}

btnStart.addEventListener('click', () => {
  localStorage.clear();

  mainScreen.classList.add('scroll-top');
  gameContainer.classList.add('scroll-top');
});

btnContinue.addEventListener('click', () => {
  baseData = history;
  initializingVariables(baseData);
  mainScreen.classList.add('scroll-top');
  gameContainer.classList.add('scroll-top');
});

// Клик на кнопку
function clicker() {
  baseData.yourCount += baseData.factorCount;
  count.textContent = formatter.format(baseData.yourCount);
  count.style.fontSize = `${random(50, 40)}px `;
  count.style.background = randomColor();
  count.style.boxShadow = `1px 0px 15px 6px ${randomColor()}`;
  audioPlay('audio/click2.mp3');

  localStorage.setItem('values', JSON.stringify(baseData));
}

function autoClickerRepeat() {
  baseData.yourCount += baseData.factorCount;
  count.textContent = formatter.format(baseData.yourCount);
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
    toLostInGame();
  }
}

//Автокликер
let currentCount = 100000;
divAutoClicker &&
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
    localStorage.setItem('values', JSON.stringify(baseData));
    currentData.push(baseData);

    if (currentData.length > 1) {
      currentData.splice(0, 1);
    }
  });

//Делегирование при клике на покупку уровня
gameContainer.addEventListener('click', event => {
  if (event.target.closest('.factor-clicker')) {
    const dataValue = event.target.dataset.price ? event.target : event.target.parentElement;
    clickContainer(dataValue);
  }
});

function initializingItems(param, upLevel, isClick = false) {
  let priceLvl = param.firstElementChild;
  param.nextElementSibling.innerHTML = `x${upLevel}`;
  upLevel = upLevel ? upLevel : 1;

  if (upLevel === 1) {
    const upCount = +param.dataset.price + param.dataset.price / upLevel;
    const formatPrice = upCount;
    if (isClick) {
      priceLvl.textContent = formatter.format(formatPrice);
      param.dataset.price = upCount;
    }
  } else {
    const expression = +param.dataset.level === 1 ? upLevel - 1 : upLevel;
    const upCount = +param.dataset.price + param.dataset.price / expression;
    const formatPrice = upCount;

    if (isClick) {
      priceLvl.textContent = formatter.format(formatPrice);
      param.dataset.price = upCount;
    }
  }
}

//Логика при клике на покупку уровня
function clickContainer(param) {
  const datasetLvl = +param.dataset.level;
  let dataPrice = +param.dataset.price;

  audioPlay('audio/click.mp3');
  if (baseData.yourCount >= dataPrice) {
    baseData.factorCount += datasetLvl;
    baseData.myLevel += datasetLvl;
    level.innerHTML = baseData.myLevel;

    baseData.yourCount -= dataPrice;

    //change ball with num
    count.textContent = formatter.format(baseData.yourCount);

    //Значение на которое будет увеличиваться lvl
    // let upCountLvl = dataPrice / +param.dataset.counts;

    if (+param.dataset.counts === 0) {
      upCountLvl = dataPrice;
    }

    //Увеличение купленных бустов на один
    param.dataset.counts = +param.dataset.counts + 1;
    let upLevel = +param.dataset.counts;

    ///Увеличение количества покупки уровней
    param.nextElementSibling.innerHTML = `x${upLevel}`;

    //Увеличение

    initializingItems(param, upLevel, true);

    baseData.itemCounts[datasetLvl] = upLevel;
    baseData.itemsPrice[datasetLvl] = dataPrice;
    console.log(dataPrice);
    localStorage.setItem('values', JSON.stringify(baseData));
  } else {
    toLostInGame();
  }
}

///==========================================================================================================

//UTILS

//Random number
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

//Random color
function randomColor() {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255,
  )})`;
}

//Перезагрузка страницы при проигрыше
reboot.addEventListener('click', () => {
  location.reload();
  localStorage.clear();
});

//audioPlay
function audioPlay(search) {
  const audio = new Audio();
  audio.src = search;
  audio.play();
}

//При проигрыше предлагать начать сначала
function toLostInGame() {
  baseData.yourCount = 0;
  count.textContent = baseData.yourCount;
  gameLose();
  setTimeout(repeat, 100);
}
