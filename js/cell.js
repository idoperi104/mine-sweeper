'use strict'

const MINE = '💣'
const EMPTY = ' '

var gEmptyLocations = []

function createCell(i, j) {
    var cell = {
        isMine: false,
        isShown: false,
        minesNegsCount: 0,
        isMarked: true
    }
    return cell
}


function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var count = minesNegsCount(i, j)
            gBoard[i][j].minesNegsCount = count
        }
    }
}

function setMinesNegsCount2() {
    for (var i = 0; i < gCells.length; i++) {
        var currCell = gCells[i]
        var row = currCell.location.i
        var col = currCell.location.j
        var count = MinesNegsCount(row, col)
        currCell.minesNegsCount = count


        // update board
        if (!currCell.isMine && currCell.minesNegsCount > 0) {
            gBoard[row][col] = currCell.minesNegsCount
        }
    }
}

function minesNegsCount(roxIdx, colIdx) {
    var mineCount = 0
    for (var i = roxIdx - 1; i <= roxIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === roxIdx && j === colIdx) continue
            var currCell = gBoard[i][j]
            if (currCell.isMine) mineCount++
        }
    }
    return mineCount
}



function setMines(){
    gBoard[1][1].isMine = true
    gBoard[2][2].isMine = true
    gBoard[6][7].isMine = true
    gBoard[6][6].isMine = true
    // setEmptyLocations()
    // for (var i = 0; i < gLevel.MINES; i++) {
    //     var loc = getRandomLocation()
    //     gBoard[loc.i][loc.j].isMine = true
    // }

}

function setEmptyLocations() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gEmptyLocations.push({ i, j })
        }
    }
}

function getRandomLocation() {
    var index = getRandomIntInclusive(0, gEmptyLocations.length - 1)
    var loc = gEmptyLocations[index]
    gEmptyLocations.splice(index, 1)
    return loc
}