"use strict" 
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const daysField = document.querySelector("span[data-days]");
const hoursField = document.querySelector("span[data-hours]");
const minutesField = document.querySelector("span[data-minutes]");
const secondsField = document.querySelector("span[data-seconds]");
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");

let actualDateTime;
let timerOnSite = 0;
let countTime = 0;
let selectedDateTime;

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

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        actualDateTime = new Date().getTime();
        selectedDateTime = selectedDates[0].getTime();
 
        if (selectedDateTime < actualDateTime) {
            window.alert("Please choose a date in the future.");
            clearInterval(timerOnSite);
        } else {
            startBtn.disabled = false;
            clearInterval(timerOnSite);
            console.log(new Date());
        }
    }
});

function handleClick() {
    startBtn.disabled = true;
    //startBtn.addEventListener("click", convertMs(countTime));
    // 
    // 
    // console.log(convertMs(countTime));
    // console.log(settingTime)
    actualDateTime = new Date().getTime();
    
    countTime = selectedDateTime - actualDateTime;
    console.log(convertMs(countTime))

    timerOnSite = setInterval(() => {
        let settingTime = convertMs(countTime);
        const { days, hours, minutes, seconds } = settingTime;
    
        console.log(convertMs(countTime))
        countTime -= 1000;
        


        daysField.textContent = addLeadingZero(days.toString());
        hoursField.textContent = addLeadingZero(hours.toString());
        minutesField.textContent = addLeadingZero(minutes.toString());
        secondsField.textContent = addLeadingZero(seconds.toString());

        if (settingTime.days && settingTime.hours && settingTime.minutes && settingTime.seconds <= 0) {
            clearInterval(timerOnSite);
            
            daysField.textContent = "00";
            hoursField.textContent = "00";
            minutesField.textContent = "00";
            secondsField.textContent = "00";
        }
    }, 1000);
};


startBtn.addEventListener("click", handleClick);
