
function convertHMS(value) {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value - (hours * 3600)) / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);

    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;

    return (hours == 0) ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`
}

function calculateSeconds(elapsedSeconds, workMinutes, restMinutes) {
    const workSeconds = workMinutes * 60
    const restSeconds = restMinutes * 60
    const fullCycle = workSeconds + restSeconds

    let completedCycles = Math.floor(elapsedSeconds / fullCycle);
    let residualSeconds = elapsedSeconds % fullCycle;
    let onBreak = false;
    let remainingSeconds = 0
    if (residualSeconds > workSeconds) {
        // We are on a break
        onBreak = true
        residualSeconds = residualSeconds - workSeconds
        remainingSeconds = restSeconds - residualSeconds
    } else {
        remainingSeconds = workSeconds - residualSeconds
    }
    return {onBreak, completedCycles, remainingSeconds, residualSeconds};
}