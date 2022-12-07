const promiseButton = document.querySelector(".form button");
const form = document.querySelector(".form");

let position = "";
promiseButton.disabled = false;

const {
  elements: { delay, step, amount } } = form;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject ({position, delay})
      }
    }, delay)
  })
}

function submitProcess(event) {
  event.preventDefault();
  promiseButton.disabled = true;
  for (let i = 0; i <= amount.value; i += 1) {
    createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

form.addEventListener("submit", submitProcess);