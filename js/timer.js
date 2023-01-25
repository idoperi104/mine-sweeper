'use strict'

//stopwatch vars
var gTimerInterval
var gSeconds = 0
var gTens = 0
var gMinutes = 0
var elAppendTens = document.getElementById("tens")
var elAppendSeconds = document.getElementById("seconds")
var elAppendMinutes = document.getElementById("minutes")



function startTimer() {
    gTens++;

    if (gTens <= 9) {
        elAppendTens.innerHTML = "0" + gTens
    }

    if (gTens > 9) {
        elAppendTens.innerHTML = gTens
    }

    if (gTens > 99) {
        gSeconds++;
        elAppendSeconds.innerHTML = "0" + gSeconds
        gTens = 0;
        elAppendTens.innerHTML = "0" + 0
    }

    if (gSeconds > 9) {
        elAppendSeconds.innerHTML = gSeconds
    }

    if (gSeconds > 59) {
        gMinutes++;
        elAppendMinutes.innerHTML = "0" + gMinutes
        gSeconds = 0;
        elAppendSeconds.innerHTML = "0" + 0
    } 
}

function stopTimer() {
    clearInterval(gTimerInterval)
}

function resetTimer() {
    clearInterval(gTimerInterval)
    gTens = "00"
    gSeconds = "00"
    gMinutes = "00"
    elAppendTens.innerHTML = gTens
    elAppendSeconds.innerHTML = gSeconds
}