'use strict'

const HEART = '<img src="img/heart.png" alt="heart">'

const SMILEY_NORMAL = '😄'
const SMILEY_MINE = '🤯'
const SMILEY_WIN = '🥳'
const SMILEY_DEAD = '😵'

const HINT = '💡'

var gLivesCount
var gHintsCount
var gSafeClicksCount

const EASY = 'easy'
const MEDIUM = 'medium'
const HARD = 'hard'

var gStorageName = "bestTimeMedium"


function renderInfoSection() {
    // called at init section

    renderSmiley(SMILEY_NORMAL)

    gLivesCount = 3
    renderLives()

    renderScore()

    gHintsCount = 3
    renderHints()

    renderBestTime()

    gSafeClicksCount = 3
    renderSafeClickDiv()
}

function renderSmiley(smiley) {
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

function renderScore() {
    var elScore = document.querySelector('.score span')
    elScore.innerHTML = gGame.shownCount
}

function changeLevel(elBtn) {
    var level = elBtn.dataset.level
    switch (level) {
        case EASY:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gStorageName = "bestTimeEasy"
            break
        case MEDIUM:
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gStorageName = "bestTimeMedium"
            break
        case HARD:
            gLevel.SIZE = 12
            gLevel.MINES = 32
            gStorageName = "bestTimeHard"
            break
        default:
            console.log('there is somthing wrong...')
    }
    init()
}

function renderHints() {
    var elHints = document.querySelector('.hints')
    var strHTML = ''
    for (var i = 0; i < gLivesCount; i++) {
        var str = `<button data-clicked="false" class="hint-${i}" onclick="onHintClicked(this)">💡</button>`
        strHTML += str
    }
    elHints.innerHTML = strHTML
}

function onHintClicked(elHint) {
    if (!gGame.isOn) return
    if (gHintsCount === 0) return
    if (elHint.dataset.clicked === 'true') return
    elHint.dataset.clicked = true
    elHint.style.backgroundColor = 'green'
    gGame.isHint = 'true'
    gHintsCount--
}

function setBestTime() {
    var endTime = Date.now()
    var totalTime = (endTime - gStartTime) / 1000
    var bestTime = localStorage.getItem(gStorageName)
    if (bestTime === null || bestTime > totalTime) {
        bestTime = totalTime
        localStorage.setItem(gStorageName, totalTime)
    }

    renderBestTime()
}

function renderBestTime() {
    var bestTime = localStorage.getItem(gStorageName)
    if (!bestTime) return
    var elSpan = document.querySelector('.bestTime span')
    if (bestTime < 10) bestTime = '0' + bestTime
    elSpan.innerHTML = bestTime
}

function renderSafeClickDiv(){
    var elSpan = document.querySelector('.safe-click span')
    elSpan.innerHTML = gSafeClicksCount
}

function safeClickButtonClicked(elBtn) {
    if (!gGame.isOn) return
    if (gSafeClicksCount === 0) return
    gSafeClicksCount--

    // get random safe loc
    var loc = getRandomSafeLoc()

    //mark it for a 3 sec
    var elCell = document.querySelector(`.cell-${loc.i}-${loc.j}`)
    elCell.classList.toggle('hinted')
    setTimeout(() => {elCell.classList.toggle('hinted')}, 2000, elCell)

    // update DOM safe clicks count
    renderSafeClickDiv()
}

function getRandomSafeLoc() {
    var locs = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!currCell.isMine && !currCell.isShown && !currCell.isMarked) {
                locs.push({ i, j })
            }
        }
    }

    var loc = locs[getRandomIntInclusive(0, locs.length - 1)]
    return loc
}