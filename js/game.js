'use strict'

const FLAG = '🚩'
const EASY = 'easy'
const MEDIUM = 'medium'
const HARD = 'hard'

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isDead: false
}

const gLevel = {
    SIZE: 8,
    MINES: 14
}

var gBoard


function init() {
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.isDead = false

    gLivesCount = 3

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
    if (gGame.isDead) return
    if (gBoard[i][j].isMarked) return
    if (!gGame.isOn) {
        setMines({ i, j }) // set mines exept this loc
        setMinesNegsCount()
        gGame.isOn = true
        gTimerInterval = setInterval(startTimer, 1)
    }

    var currCell = gBoard[i][j]
    // update model
    if (currCell.isShown) return
    currCell.isShown = true

    //update DOM
    elCell.style.backgroundColor = 'lightBlue'
    var elSpan = elCell.querySelector('span')
    elSpan.classList.remove('hidden')

    if (currCell.isMine) {
        gLivesCount--
        if (gLivesCount === 0) {
            // looser
            gGame.isDead = true
            renderSmiley(SMILEY_DEAD)
            stopTimer()
            showMines()
        } else {
            renderSmiley(SMILEY_LOSE)
            setTimeout(renderSmiley, 1000, SMILEY_NORMAL)
        }
        renderLives()
    }
    else {
        gGame.shownCount++
        renderScore()
    }

    if (currCell.minesNegsCount === 0 && !currCell.isMine) {
        onCellWithoutNegsClicked({ i, j })
    }

    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        // victory
        stopTimer()
        gGame.isDead = true
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
            var currCell = gBoard[i][j]
            // currCell.isShown = true
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


function changeLevel(elBtn) {
    var level = elBtn.dataset.level
    switch (level) {
        case EASY:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break
        case MEDIUM:
            gLevel.SIZE = 8
            gLevel.MINES = 14
            break
        case HARD:
            gLevel.SIZE = 12
            gLevel.MINES = 32
            break
        default:
            console.log('there is somthing wrong...')
    }
    init()
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