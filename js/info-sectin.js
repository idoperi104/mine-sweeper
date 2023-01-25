'use strict'

const HEART = '<img src="img/heart.png" alt="heart">'

const SMILEY_NORMAL = '😄'
const SMILEY_LOSE = '🤯'
const SMILEY_WIN = '🥳'
const SMILEY_DEAD = '😵'

var gLivesCount



function renderInfoSection(){
    renderSmiley(SMILEY_NORMAL)
    renderLives()
    renderScore()
}

function renderSmiley(smiley){
    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = smiley
}


function renderLives() {
    var elLives = document.querySelector('.lives')
    var strHTML = ''
    for (var i = 0; i < gLivesCount; i++) {
        strHTML += HEART
    }
    elLives.innerHTML = strHTML
}

function renderScore(){
    var elScore = document.querySelector('.score span')
    elScore.innerHTML = gGame.shownCount
}


