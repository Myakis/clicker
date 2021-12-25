//Констаны
const btnStart = document.querySelector(".game-start");
const mainScreen = document.querySelector(".main-screen");
const gameScreen = document.querySelector(".game-screen");
const count = document.querySelector(".ball-count");
const click = document.querySelector(".click-count");
//
let yourCount = 0;

function clicker() {
  yourCount += 1;
  count.textContent = yourCount;
}

btnStart.addEventListener("click", (event) => {
  mainScreen.classList.add("scroll-top");
  gameScreen.classList.add("scroll-top");
});

click.addEventListener("click", clicker);
