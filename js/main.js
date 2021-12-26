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
}
function gameLose() {
  myLevel = "Ты проиграл";
  level.parentElement.innerHTML = myLevel;
}

function repeat() {
  document.querySelector(".game-end").classList.remove("hidden");
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
    repeat();
  }
});

reboot.addEventListener("click", () => {
  location.reload();
});

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
      setTimeout(repeat, 100);
    }
  }
});
