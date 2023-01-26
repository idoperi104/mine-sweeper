'use strict'
// כרגע לא עובד... מתקן את זה!

var gLastBoard
// gLastBoard = buildBoard()

function undo(elBtn) {
    if (!gGame.isOn) {
        init()
        return
    }

    console.log(gLastBoard);
    for (var i = 0; i < gLastBoard.length; i++) {
        for (var j = 0; j < gLastBoard[i].length; j++) {
            gBoard[i][j] = gLastBoard[i][j]
            // gBoard[i][j].isShown = false
            renderCell({ i, j })
        }
    }

}

function copyBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gLastBoard[i][j]
            var cell = {
                isMine: currCell.isMine,
                isShown: currCell.isShown,
                minesNegsCount: currCell.minesNegsCount,
                isMarked: currCell.isMarked
            }
            gLastBoard[i][j] = cell
        }
    }
}