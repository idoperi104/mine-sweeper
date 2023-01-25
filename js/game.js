'use strict'

const gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0
}

const gLevel = {
    SIZE: 8,
    MINES: 6
}

var gBoard


function init() {
    console.log('hello')

    gBoard = buildBoard()
    setMines()
    setMinesNegsCount()

    console.log(gBoard)

    renderBoard(gBoard, '.board-container')

    hideBoardContant()


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

function hideBoardContant() {
    var elSpans = document.querySelectorAll('.board-container span')
    console.log(elSpans)
    for (var i = 0; i < elSpans.length; i++) {
        var currSpan = elSpans[i]
        currSpan.classList.add('hidden')
    }
}

function onCellClicked(elCell, i, j) {
    // update model
    gBoard[i][j].isShown = true

    //update DOM
    var elSpan = elCell.querySelector('span')
    elSpan.classList.remove('hidden')

    elCell.style.backgroundColor = 'lightBlue'
}

