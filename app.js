const eventEl = document.querySelector('.event-title');
const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const options = document.querySelectorAll('.options .option');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const dateInput = modal.querySelector('#date-input');
const nameInput = modal.querySelector('#name-input');
const modalExit = modal.querySelector('.modal__exit');

// let ourEvent = { date: '2020-10-20' };
// let ourEvent = { date: '2020-12-10', name: 'My Birthday' };
// let ourEvent = { date: '2022-12-25', name: 'Christmas 2022' }
// let ourEvent = { year: 2022, name: 'Christmas' }
// let ourEvent = { name: 'New Years Eve' }
let ourEvent = { name: 'UEFA Euro 2021' }

startInterval(ourEvent);

options.forEach(option => {
    option.addEventListener('click', () => {
        let countdownEvent;
        switch (option.id) {
            case 'christmas':
                countdownEvent = { name: 'Christmas' }
                break;
            case 'new-years':
                countdownEvent = { name: 'New Years Eve' }
                break;
            case 'euro2021':
                countdownEvent = { name: 'UEFA Euro 2021' }
                break;
            case 'custom':
                modal.classList.add('show');
        }

        if (countdownEvent) {
            startInterval(countdownEvent)
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    countdownEvent = getCustomEvent();
    startInterval(countdownEvent);
    modal.classList.remove('show');
})

modalExit.addEventListener('click', () => {
    modal.classList.remove('show');
})

function getCustomEvent() {
    const date = dateInput.value;
    const name = nameInput.value;
    console.log(dateInput.value);
    return ({ date, name })

}

function startCountdown(event) {
    let currentDate = Date.now();
    const { date, name } = recognizeEvent(event);

    let difference = date - currentDate;
    let countdownDate = calculateCountdown(difference)
    showCountdown(countdownDate, name);
}

function startInterval(countdownEvent) {
    clearInterval(window.intervalId)
    startCountdown(countdownEvent);
    window.intervalId = setInterval(() => startCountdown(countdownEvent), 1000);
}

function recognizeEvent({ date, name, year }) {
    let parsedDate;
    let currentYear = new Date().getFullYear();
    // Check for stored holiday names
    if (name === 'New Years Eve') {
        parsedDate = Date.parse(`${year || currentYear + 1}-1-1`);
    } else if (name === 'Christmas') {
        parsedDate = Date.parse(`${year || currentYear}-12-25`);
    } else if (name === 'UEFA Euro 2021') {
        parsedDate = Date.parse(`2021-6-11`);
    } else {
        // ie '2023-12-10' (Dec 10th 2023)
        parsedDate = Date.parse(date);
    }

    return ({ date: parsedDate, name });
}

function calculateCountdown(difference) {
    let totalSeconds = difference / 1000;

    const days = Math.trunc(totalSeconds / 3600 / 24);
    const hours = Math.trunc(totalSeconds / 3600) % 24;
    const minutes = Math.trunc(totalSeconds / 60) % 60
    const seconds = Math.trunc(totalSeconds) % 60;

    let countdown = { days, hours, minutes, seconds }
    return countdown;
}

function showCountdown({ days, hours, minutes, seconds }, name) {
    if (name === 'New Years Eve') {
        document.body.className = '';
        document.body.classList.add('snow');
    } else if (name === 'Christmas') {
        document.body.className = '';
        document.body.classList.add('christmas');
    } else if (name === 'UEFA Euro 2021') {
        document.body.className = '';
        document.body.classList.add('palms');
    }

    eventEl.innerText = name;
    daysEl.innerText = formatTime(days);
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    secondsEl.innerText = formatTime(seconds);
}

function formatTime(time) {
    if (time <= 0) return time;
    return time < 10 ? `0${time}` : time;
}

