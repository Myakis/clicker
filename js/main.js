//Констаны
const btnStart = document.querySelector(".game-start");
const mainScreen = document.querySelector(".main-screen");
const count = document.querySelector(".ball-count");
const click = document.querySelector(".click-count");
const autoclickrt = document.querySelector(".autoclicker");
const factorBtn = document.querySelector(".factor-clicker");
const gameConteiner = document.querySelector(".game-conteiner");
const level = document.querySelector(".level").firstElementChild;

//
let yourCount = 0;
let factorCount = 1;
let myLevel = 1;

function clicker() {
  yourCount += factorCount;
  count.textContent = yourCount;
  count.style.fontSize = `${Math.floor(Math.random() * (130 - 80) + 80)}px `;
}
function gameLose() {
  myLevel = "Ты проиграл";
  level.parentElement.innerHTML = myLevel;
}
btnStart.addEventListener("click", (event) => {
  mainScreen.classList.add("scroll-top");
  gameConteiner.classList.add("scroll-top");
});

count.addEventListener("click", clicker);

autoclickrt.addEventListener("click", () => {
  if (yourCount > 100000) {
    setInterval(clicker, 1000);
    yourCount -= 100000;
    count.textContent = yourCount;
  } else {
    yourCount -= "Lose";
    count.textContent = yourCount;
    gameLose();
  }
});

// factorBtn.addEventListener("click", () => {
//   if (yourCount >= 100) {
//     factorCount += 1;
//     myLevel += 1;
//     level.innerHTML = myLevel;
//     console.log(level);
//     yourCount -= 100;
//     count.textContent = yourCount;
//   } else {
//     yourCount -= "Lose";
//     count.textContent = yourCount;
//     gameLose();
//   }
// });

// window.reload = () => {
//   mainScreen.classList.add("scroll-bottom");
//   gameScreen.classList.add("scroll-bottom");
// };

//ДЕЛЕГИРОВАНИЕ

gameConteiner.addEventListener("click", (event) => {
  const currentCount = event.target.dataset.count;
  const currentLvl = event.target.dataset.level;
  console.dir(event.target);
  ////
  if (event.target.className === "factor-clicker") {
    if (yourCount >= +currentCount) {
      event.stopPropagation();
      factorCount += +currentLvl;
      myLevel += +currentLvl;
      console.log(currentLvl);
      level.innerHTML = myLevel;

      yourCount -= +currentCount;
      count.textContent = yourCount;
    } else {
      yourCount -= "Lose";
      count.textContent = yourCount;
      gameLose();
    }
  }
});
