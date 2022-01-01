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

const formatter = new Intl.NumberFormat("ru");

//
let yourCount = 0;
let factorCount = 100000;
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
let currentCount = 100000;
autoclickrt.addEventListener("click", (event) => {
  console.log(currentCount);
  function name() {
    if (yourCount >= currentCount) {
      setInterval(clicker, 1000);
      yourCount -= currentCount;
      count.textContent = formatter.format(yourCount);
      let countSpan = +event.target.nextElementSibling.innerHTML
        .match(/\d+/gi)
        .join("");
      event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
      let currentPirce = currentCount;
      currentCount += 100000;
      event.target.firstElementChild.innerHTML = formatter.format(currentPirce);
    } else {
      yourCount -= "Lose";
      count.textContent = yourCount;
      gameLose();
      repeat();
    }
  }

  name();

  //Повторяющийся код
  // let currentCount = +event.target.firstElementChild.innerHTML;
  // //
  // console.log(currentCount);
  // if (yourCount >= currentCount) {
  //   setInterval(clicker, 1000);
  //   yourCount -= currentCount;
  //   count.textContent = formatter.format(yourCount);
  //   ///Увеличение количества покупки уровней
  //   let countSpan = +event.target.nextElementSibling.innerHTML
  //     .match(/\d+/gi)
  //     .join("");
  //   event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;
  //   ///
  //   let currentPirce = +event.target.firstElementChild.innerHTML + 100000;
  //   event.target.firstElementChild.innerHTML = formatter.format(currentPirce);
  // } else {
  //   yourCount -= "Lose";
  //   count.textContent = yourCount;
  //   gameLose();
  //   repeat();
  // }
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
      if (yourCount >= currentCount) {
        // event.stopPropagation();
        factorCount += datasetLvl;
        myLevel += datasetLvl;
        level.innerHTML = myLevel;

        yourCount -= currentCount;
        //change ball with num
        count.textContent = formatter.format(yourCount);

        ///Увеличение количества покупки уровней
        let countSpan = +event.target.nextElementSibling.innerHTML
          .match(/\d+/gi)
          .join("");
        event.target.nextElementSibling.innerHTML = `x${(countSpan += 1)}`;

        //Увеличение
        let priceLvl = event.target.firstElementChild;

        let formatPrice =
          +priceLvl.innerHTML.match(/\d+/gi).join("") + datasetCount;

        priceLvl.textContent = formatPrice;
      } else {
        yourCount -= "Lose";
        count.textContent = yourCount;
        gameLose();
        setTimeout(repeat, 100);
      }
    }
  } catch (error) {}
});

console.log(formatter.format("100000000"));
