'use strict'

const FLAG = '🚩'


const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isDead: false,
    isHint: false,
    isManualMode: false,
    hadManualMode: false
}

const gLevel = {
    SIZE: 8,
    MINES: 14
}

var gBoard

var gStartTime

var gMenualMineCount
var gMenualMinelocs


function init() {
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.isDead = false
    gGame.isHint = false
    gGame.isManualMode = false
    gGame.hadManualMode = false

    gMenualMineCount = 0
    gMenualMinelocs = []
    resetManualBtn()

    gBoard = buildBoard()

    renderBoard()

    renderInfoSection()

    resetTimer()
}

function buildBoard() {
    const board = []
    const size = gLevel.SIZE

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }
    }

    return board
}

function onCellClicked(elCell, i, j) {
    var currCell = gBoard[i][j]

    if (gGame.isDead) return

    if (gGame.isManualMode) {
        putMine(elCell, i, j)
        return
    }

    if (gGame.isHint) {
        toggleHint(i, j)
        setTimeout(toggleHint, 2000, i, j)
        return
    }

    if (currCell.isMarked) return // if has flag on it

    if (!gGame.isOn) firsClick(i, j)

    if (currCell.isShown) return

    if (currCell.isMine) mineClicked()
    else {
        gGame.shownCount++
        renderScore()
    }

    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        onVictory()
    }

    // update model
    currCell.isShown = true

    //update DOM
    elCell.style.backgroundColor = 'lightBlue'
    var elSpan = elCell.querySelector('span')
    elSpan.classList.remove('hidden')

    if (currCell.minesNegsCount === 0 && !currCell.isMine) {
        onCellWithoutNegsClicked({ i, j })
    }
}

function onCellWithoutNegsClicked(location) {
    var roxIdx = location.i
    var colIdx = location.j
    for (var i = roxIdx - 1; i <= roxIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === roxIdx && j === colIdx) continue
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            onCellClicked(elCell, i, j)
        }
    }
}

function onCellMarked(elCell, i, j) {

    if (!gGame.isOn) return

    var cell = gBoard[i][j]
    if (cell.isShown) return

    // update model
    cell.isMarked = !cell.isMarked
    gGame.markedCount++

    // update DOM
    var elSpan = elCell.querySelector('span')
    renderCell({ i, j })
    elSpan.classList.remove('hidden')

}

function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]

            if (currCell.isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j} span`)
                elCell.classList.remove('hidden')
            }
        }
    }
}

function onVictory() {
    stopTimer()
    gGame.isDead = true
    renderSmiley(SMILEY_WIN)
    showMines()
    setBestTime()
}

function firsClick(i, j) {
    // at the first click. puts mines randomaly and starts timer
    if (!gGame.hadManualMode) setMines({ i, j }) // set mines exept this loc
    setMinesNegsCount()
    gGame.isOn = true
    gTimerInterval = setInterval(startTimer, 10)
    gStartTime = Date.now()
}

function mineClicked() {
    gLivesCount--
    if (gLivesCount === 0) {
        onLose()
    } else {
        renderSmiley(SMILEY_MINE)
        setTimeout(renderSmiley, 2000, SMILEY_NORMAL)
    }
    renderLives()
}

function onLose() {
    gGame.isDead = true
    renderSmiley(SMILEY_DEAD)
    stopTimer()
    showMines()
}

function toggleHint(rowIdx, colIdx) {
    gGame.isHint = false

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (gBoard[i][j].isShown) continue
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.toggle('panted')
            var elSpan = elCell.querySelector(`span`)
            elSpan.classList.toggle('hidden')
        }
    }
}