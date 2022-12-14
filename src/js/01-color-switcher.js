function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");

let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
      body.style.cssText = `background-color: ${getRandomHexColor()}`
      startBtn.disabled = true;
  }, 1000);
});


stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
});