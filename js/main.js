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

let formatter = new Intl.NumberFormat("ru");

//
let yourCount = 0;
let factorCount = 1;
let myLevel = 0;

//Random number
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}
function clicker() {
  yourCount += factorCount;
  count.textContent = formatter.format(yourCount);

  count.style.fontSize = `${random(50, 40)}px `;
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
    count.textContent = formatter.format(yourCount);
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
    let currentCount = +event.target.firstElementChild.innerHTML
      .match(/[^\s]+/g)
      .join("");
    const datasetCount = +event.target.dataset.count;
    const datasetLvl = +event.target.dataset.level;
    ////
    if (event.target.className === "factor-clicker") {
      // || event.target.nodeName === "SPAN")
      if (yourCount >= currentCount) {
        // event.stopPropagation();
        factorCount += datasetLvl;
        myLevel += datasetLvl;
        level.innerHTML = myLevel;

        yourCount -= currentCount;
        //change ball with num
        count.textContent = formatter.format(yourCount);
        // event.target.dataset.count = +event.target.dataset.count;

        ///Увеличение количества покупки уровней
        let countSpan = +event.target.nextElementSibling.innerHTML
          .match(/\d+/gi)
          .join("");
        event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;

        //Увеличение
        let priceLvl = event.target.firstElementChild;
        let pric = priceLvl.textContent;
        console.log(pric);

        priceLvl.innerHTML = +priceLvl.innerHTML + datasetCount;
        console.log(pric);
      } else {
        yourCount -= "Lose";
        count.textContent = yourCount;
        gameLose();
        setTimeout(repeat, 100);
      }
    }
  } catch (error) {}
});
// console.log("2 000".match(/[^\s]+/g));
// console.log(5000 > "2 000".match(/[^\s]+/g).join(""));
