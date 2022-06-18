const urlParams = new URLSearchParams(window.location.search);

// Pomodoro values
const defaultWorkMinutes = 25
const defaultRestMinutes = 5
const workMinutes = parseInt(urlParams.get('work') ?? defaultWorkMinutes)
const restMinutes = parseInt(urlParams.get('rest') ?? defaultRestMinutes)
const showProgress = urlParams.get("progress") != null

// Get UI elements
let clock = document.getElementById("clock")
let info = document.getElementById("info")
let mainProgressBar = document.getElementById("mainProgressBar")
let barContainer = document.getElementById("barContainer")

let startTime = new Date();
let elapsedSeconds = 0

function tick() {
    elapsedSeconds += 1
    let {remainingSeconds, residualSeconds, onBreak} = calculateSeconds(elapsedSeconds, workMinutes, restMinutes);
    info.innerText = onBreak ? "break time" : "focus time"
    clock.innerText = convertHMS(remainingSeconds)

    let percentage = 0
    if (onBreak) {
        percentage = (100 / restMinutes) * (residualSeconds / 60)
    } else {
        percentage = (100 / workMinutes) * (residualSeconds / 60)
    }
    console.log(percentage)
    mainProgressBar.style.width = percentage + "%"
}


let interval = {}

if (showProgress) {
    barContainer.style.visibility = "visible"
    barContainer.style.display = "block"
}
clock.innerText = convertHMS(workMinutes * 60)
info.innerText = "focus time"