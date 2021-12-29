//Констаны
const btnStart = document.querySelector(".game-start");
const mainScreen = document.querySelector(".main-screen");
const count = document.querySelector(".ball-count");
const click = document.querySelector(".click-count");
const autoclickrt = document.querySelector(".autoclicker");
const factorBtn = document.querySelector(".factor-clicker");
const gameConteiner = document.querySelector(".game-conteiner");
const level = document.querySelector(".level").firstElementChild;
const reboot = document.querySelector(".end-reboot");

//
let yourCount = 0;
let factorCount = 1;
let myLevel = 1;

function clicker() {
  yourCount += factorCount;
  count.textContent = yourCount;
  count.style.fontSize = `${Math.floor(Math.random() * (80 - 50) + 50)}px `;
  randomColor();
}
function gameLose() {
  myLevel = "Ты проиграл";
  level.parentElement.innerHTML = myLevel;
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
//Автокликер
autoclickrt.addEventListener("click", (event) => {
  //Повторяющийся код
  let currentCount = +event.target.firstElementChild.innerHTML;
  //
  console.log(currentCount);
  if (yourCount >= currentCount) {
    setInterval(clicker, 1000);
    yourCount -= currentCount;
    count.textContent = yourCount;
    ///Увеличение количества покупки уровней
    let countSpan = +event.target.nextElementSibling.innerHTML
      .match(/\d+/gi)
      .join("");
    event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
    ///
    event.target.firstElementChild.innerHTML =
      +event.target.firstElementChild.innerHTML + 100000;
  } else {
    yourCount -= "Lose";
    count.textContent = yourCount;
    gameLose();
    repeat();
  }
});
//Если проиграл
reboot.addEventListener("click", () => {
  location.reload();
});

function randomColor() {
  count.style.background = `rgb(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;
}

//ДЕЛЕГИРОВАНИЕ

gameConteiner.addEventListener("click", (event) => {
  try {
    let currentCount = +event.target.firstElementChild.innerHTML;
    const datasetCount = +event.target.dataset.count;
    const datasetLvl = +event.target.dataset.level;
    ////
    if (
      event.target.className === "factor-clicker"
      // || event.target.nodeName === "SPAN"
    ) {
      if (yourCount >= currentCount) {
        // event.stopPropagation();
        factorCount += datasetLvl;
        myLevel += datasetLvl;
        level.innerHTML = myLevel;

        yourCount -= currentCount;
        count.textContent = yourCount;
        event.target.dataset.count = +event.target.dataset.count;

        ///Увеличение количества покупки уровней
        let countSpan = +event.target.nextElementSibling.innerHTML
          .match(/\d+/gi)
          .join("");
        event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
        //Увеличение
        event.target.firstElementChild.innerHTML =
          +event.target.firstElementChild.innerHTML + datasetCount;
      } else {
        yourCount -= "Lose";
        count.textContent = yourCount;
        gameLose();
        setTimeout(repeat, 100);
      }
    }
  } catch (error) {}
});
