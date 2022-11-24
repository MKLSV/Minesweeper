
var minutes = 00;
var seconds = 00;
var milsec = 00;
var appendSeconds = document.getElementById("seconds")
var appendMinutes = document.getElementById("minutes")

var Interval;

function startTime() {

    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
}

function stopTimer() {
    clearInterval(Interval);
}


function resetTimer() {
    clearInterval(Interval);
    minutes = 00;
    seconds = 00;

    appendSeconds.innerHTML = "00";
    appendMinutes.innerHTML = "00";

}



function startTimer() {
    seconds++;

    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;

    }

    if (seconds > 59) {
        console.log("seconds");
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }

}
