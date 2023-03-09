import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector(".timer");
const daysField = document.querySelector("span[data-days]");
const hoursField = document.querySelector("span[data-hours]");
const minutesField = document.querySelector("span[data-minutes]");
const secondsField = document.querySelector("span[data-seconds]");
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");

let date = new Date;
let actualDateTime = date.getTime();
let timerOnSite = 0;
let countTime = 0;

startBtn.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
        if (value.length < 2) {
            return value.padStart(2, `0`);
        } else {
            return value;
        }
    };

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let selectedDateTime = selectedDates[0].getTime();

        if (actualDateTime >= selectedDateTime) {
            window.alert("Please choose a date in the future.");
        } else {
            startBtn.disabled = false;
            countTime = selectedDateTime - actualDateTime;
            startBtn.addEventListener("click", convertMs(countTime));
        }
    }
};

flatpickr(input, options);
startBtn.addEventListener("click", clickHandle);

clickHandle = () => {
    startBtn.disabled = true;

    timerOnSite = setInterval(() => {
        let settingTime = convertMs(countTime);

        const { days, hours, minutes, seconds } = settingTime;

        daysField.textContent = addLeadingZero(days.toString());
        hoursField.textContent = addLeadingZero(hours.toString());
        minutesField.textContent = addLeadingZero(minutes.toString());
        secondsField.textContent = addLeadingZero(seconds.toString());

        countTime -= 1000;
    }, 1000);
}
