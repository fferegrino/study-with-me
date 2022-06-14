let timeBox = $("#time")
let debug = $("#debug")
let myBar = $("#myBar")

let thing = new Date();

var MS_PER_MINUTE = 60000;
let startTime = new Date(thing - 10 * MS_PER_MINUTE);

let workMinutes = 1;
let restMinutes = 0.5;

let _restSeconds = restMinutes * 60;
let _workSeconds = workMinutes * 60;
let fullCycle = (_restSeconds + _workSeconds)

let cycles = 4;

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

function increaseTime() {
  let currentTime = new Date();
  var elapsedSeconds = currentTime.getTime() - startTime.getTime();

  elapsedSeconds = parseInt(elapsedSeconds / 1000)

  var quotient = Math.floor(elapsedSeconds / fullCycle);
  var remainder = elapsedSeconds % fullCycle;
  
  // Calculate on what part of the cycle we are
  var width = 0;
  var stage = ""
  if (remainder >= _workSeconds) {
  	// We must be on a break
    width = (100 / restMinutes) * (remainder - _workSeconds) / 60
    stage = "Break"
  }
  else 
  {
  	width = (100 / workMinutes) * remainder / 60
    stage = "Focus"
  }
	debug.text(quotient + " cycles")

  myBar.css("width", width + "%");
  
  let hms = convertHMS(remainder)
  
  timeBox.text(`${hms} – ${stage} time – ${quotient} cycles`);
}


var id = setInterval(increaseTime, 1000);
