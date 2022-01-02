//Констаны
const btnStart = document.querySelector(".game-start");
const mainScreen = document.querySelector(".main-screen");
const count = document.querySelector(".ball-count");
const click = document.querySelector(".click-count");
const autoclickrt = document.querySelector(".autoclicker");
const divAutoclicker = document.querySelector(".autoclick-div");
const factorBtn = document.querySelector(".factor-clicker");
const gameConteiner = document.querySelector(".game-conteiner");
const level = document.querySelector(".level").firstElementChild;
const reboot = document.querySelector(".end-reboot");

const formatter = new Intl.NumberFormat("ru");

//
let yourCount = 0;
let factorCount = 100000;
let myLevel = 1;

//Random number
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

// Клик на кнопку
function clicker() {
  yourCount += factorCount;
  count.textContent = formatter.format(yourCount);

  count.style.fontSize = `${random(50, 40)}px `;
  count.style.background = randomColor();
  audipPlay("audio/click2.mp3");
  // document.querySelector(".audio2").play();
}

function autoclickerRepeat() {
  yourCount += factorCount;
  count.textContent = formatter.format(yourCount);
}
//аудио
function audipPlay(search) {
  const audio = new Audio();
  // audio.preload = "auto";

  audio.src = search;

  // audio.autoplay = true;
  audio.play();
}

function gameLose() {
  myLevel = "Ты проиграл";
  level.parentElement.innerHTML = myLevel;
  audipPlay("audio/lose.mp3");
  // document.querySelector(".lost").play();
}

function repeat() {
  document.querySelector(".game-end").classList.remove("hidden");
}
//НАчать игру
btnStart.addEventListener("click", (event) => {
  mainScreen.classList.add("scroll-top");
  gameConteiner.classList.add("scroll-top");
});

count.addEventListener("click", clicker);
//Автокликер функция

function autoclickerFunc(param) {
  audipPlay("audio/click.mp3");
  // document.querySelector(".audio1").play();
  if (yourCount >= currentCount) {
    setInterval(autoclickerRepeat, 1000);
    yourCount -= currentCount;
    currentCount += 100000;
    count.textContent = formatter.format(yourCount);
    ///Увеличение количества покупки уровней
    let countSpan = +param.nextElementSibling.innerHTML.match(/\d+/gi).join("");
    param.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
    //

    let currentPirce = currentCount;

    param.firstElementChild.innerHTML = formatter.format(currentPirce);
  } else {
    yourCount -= "Lose";
    count.textContent = yourCount;
    gameLose();
    repeat();
  }
}
//Автокликер
let currentCount = 100000;
divAutoclicker.addEventListener("click", (event) => {
  if (event.target.className === "autoclicker") {
    autoclickerFunc(event.target);
  }
  //При нажатии на span в блоке autoclick-div
  //Костыль, который нужно будет пофкисить
  if (event.target.className === "autoclicker__count") {
    let parent = event.target.parentElement;
    autoclickerFunc(parent);
  }
});
//Если проиграл
reboot.addEventListener("click", () => {
  location.reload();
});

function randomColor() {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;
}

//ДЕЛЕГИРОВАНИЕ

gameConteiner.addEventListener("click", (event) => {
  try {
    if (event.target.className === "factor-clicker") {
      clickConteiner(event.target);
      //Жирный КОСТЫЛЬ из повторяющиегося кода(стать СЕНЬЕРОМ - пофиксить)
    }
    if (event.target.tagName === "SPAN") {
      let parent = event.target.parentElement;
      clickConteiner(parent);
    }
  } catch (error) {}
});

function clickConteiner(param) {
  let dataPrice = +param.dataset.price;
  const datasetCount = +param.dataset.count;
  const datasetLvl = +param.dataset.level;
  audipPlay("audio/click.mp3");
  // document.querySelector(".audio1").play();
  if (param.className === "factor-clicker") {
    if (yourCount >= dataPrice) {
      // event.stopPropagation();
      factorCount += datasetLvl;
      myLevel += datasetLvl;
      level.innerHTML = myLevel;

      yourCount -= dataPrice;
      //change ball with num
      count.textContent = formatter.format(yourCount);

      ///Увеличение количества покупки уровней
      let countSpan = +param.nextElementSibling.innerHTML
        .match(/\d+/gi)
        .join("");
      param.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;

      //Увеличение
      let priceLvl = param.firstElementChild;
      dataPrice += datasetCount;
      let formatPrice =
        +priceLvl.innerHTML.match(/\d+/gi).join("") + datasetCount;

      priceLvl.textContent = formatter.format(formatPrice);
      param.dataset.price = +param.dataset.price + datasetCount;
    } else {
      yourCount -= "Lose";
      count.textContent = yourCount;
      gameLose();
      setTimeout(repeat, 100);
    }
  }
}
