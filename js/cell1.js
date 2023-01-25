'use strict'

const MINE = '💣'

// var gCells = []
// var gMines = []
var gEmptyLocations = []

// function createCells() {
//     gCells = []
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[i].length; j++) {
//             createCell(i, j)
//         }
//     }
//     console.log(gCells)
// }

function createCell(i, j) {
    var cell = {
        isMine: false,
        isShown: false,
        minesNegsCount: 0,
        isMarked: true
    }
    return cell
}

function createMines() {
    // gCells[0].isMine = true
    // gCells[11].isMine = true
    // gCells[22].isMine = true
    // gCells[23].isMine = true
    // gCells[25].isMine = true
    // gCells[36].isMine = true
    // gMines.push(gCells[0])
    // gMines.push(gCells[11])
    // gMines.push(gCells[22])
    // gMines.push(gCells[23])
    // gMines.push(gCells[25])
    // gMines.push(gCells[36])
    setEmptyLocations()
    for (var i = 0; i < gLevel.MINES; i++) {
        var loc = getRandomLocation()

    }
    renderMines()
}

function renderMines() {
    for (var i = 0; i < gMines.length; i++) {
        renderMine(gMines[i])
    }
}

function renderMine(cell) {
    var i = cell.location.i
    var j = cell.location.j
    gBoard[i][j] = MINE
}


function setMinesNegsCount() {
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

function MinesNegsCount(roxIdx, colIdx) {
    var mineCount = 0
    for (var i = roxIdx - 1; i <= roxIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === roxIdx && j === colIdx) continue
            var currCell = gBoard[i][j]
            if (currCell === MINE) mineCount++
        }
    }
    return mineCount
}

function setEmptyLocations() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            locations.push({ i, j })
        }
    }
}

function getRandomLocation() {
    var index = getRandomIntInclusive(0, gEmptyLocations.length - 1)
    var loc = gEmptyLocations[index]
    gEmptyLocations.splice(index, 1)
    return loc
}