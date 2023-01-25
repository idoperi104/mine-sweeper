'use strict'

const FLAG = '🚩'

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
    gGame.shownCount= 0
    gGame.markedCount= 0
    gGame.secsPassed= 0
    gGame.isDead= false

    gLivesCount = 3

    gBoard = buildBoard()

    renderBoard()

    renderInfoSection()




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
            gGame.isDead = true
            renderSmiley(SMILEY_DEAD)
        } else {
            renderSmiley(SMILEY_LOSE)
            setTimeout(renderSmiley, 1000, SMILEY_NORMAL)
        }
        renderLives()
    } 
    else gGame.shownCount++

    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES){
        gGame.isDead = true
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

