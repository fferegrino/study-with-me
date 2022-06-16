let timeBox = $("#time")
let debug = $("#debug")
let myBar = $("#myBar")
let bigProgress = $("#bigProgress")

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});


var MS_PER_MINUTE = 60000;

let hour = parseInt(params.time.slice(0, 2))
let minute = parseInt(params.time.slice(3))


let startTime = new Date(
    new Date().setHours(0, 0, 0, 0) + ((hour * 3600) + (minute * 60)) * 1000
);

console.log(startTime)

let workMinutes = parseInt(params.work ?? 45);
let restMinutes = parseInt(params.rest ?? 15);
let cycles = parseInt(params.cycles ?? -1);

let _restSeconds = restMinutes * 60;
let _workSeconds = workMinutes * 60;
let fullCycle = (_restSeconds + _workSeconds)

console.log(fullCycle)


function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours == 0)
        return minutes + ':' + seconds; // Return is HH : MM : 
    else
        return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

function setBigProgress() {

    var sharePerCycle = parseInt(100 / cycles)

    for (var i = 0; i < cycles; i++) {
        var workDiv = document.createElement("div");
        workDiv.className = "work"
        var restDiv = document.createElement("div");
        restDiv.className = "rest"

        workWidth = (sharePerCycle / fullCycle) * _workSeconds;
        restWidth = (sharePerCycle / fullCycle) * _restSeconds;

        workDiv.style.width = workWidth + "%"
        restDiv.style.width = restWidth + "%"
        bigProgress.append(workDiv, restDiv)
    }
    var cycleIndicator = document.createElement("div");
    cycleIndicator.id = "cycleIndicator"
    cycleIndicator.className = "progressIndicator"
    if (cycles > 0) {
        cycleIndicator.style.visibility = "visible";
        cycleIndicator.style.display = "block";
    }
    bigProgress.append(cycleIndicator)
    return cycleIndicator;
}



let cycleIndicator = $(setBigProgress())

function increaseTime() {
    let currentTime = new Date();
    var elapsedSeconds = currentTime.getTime() - startTime.getTime();

    elapsedSeconds = parseInt(elapsedSeconds / 1000)

    var quotient = Math.floor(elapsedSeconds / fullCycle);
    var remainder = elapsedSeconds % fullCycle;

    // Show overall progress
    let allProgress = 100 / (fullCycle * cycles) * elapsedSeconds;
    cycleIndicator.css("width", allProgress + "%");


    // Calculate on what part of the cycle we are
    var width = 0;
    var displayText = ""
    if (remainder >= _workSeconds) {
        // We must be on a break
        width = (100 / restMinutes) * ((remainder - _workSeconds) / 60)
        displayText = "remaining for break time"
        remainder = _workSeconds - remainder;
    } else {
        width = (100 / workMinutes) * (remainder / 60)
        displayText = "to go before the break"
        remainder = _workSeconds - remainder;
    }
    debug.text(quotient + " cycles")

    myBar.css("width", width + "%");

    let hms = convertHMS(remainder)

    timeBox.text(`${hms} ${displayText}`);
}

var id = setInterval(increaseTime, 1000);