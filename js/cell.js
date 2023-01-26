'use strict'

const MINE = '💣'
const EMPTY = ' '

var gEmptyLocations

function createCell(i, j) {
    var cell = {
        isMine: false,
        isShown: false,
        minesNegsCount: 0,
        isMarked: false
    }
    return cell
}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var count = minesNegsCount(i, j)

            // set model
            gBoard[i][j].minesNegsCount = count

            // set DOM
            renderCell({ i, j })
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

function setMines(clickedLoc) {
    setEmptyLocations(clickedLoc)
    for (var i = 0; i < gLevel.MINES; i++) {
        // update model
        var loc = getRandomLocation()
        gBoard[loc.i][loc.j].isMine = true

        //update DOM
        renderCell(loc)
    }
}

function setEmptyLocations(clickedLoc) {
    gEmptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (clickedLoc.i === i && clickedLoc.j === j) continue
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

function renderBoard() {
    var strHTML = '<table><tbody>'

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < gBoard[i].length; j++) {

            var className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="onCellClicked(this, ${i}, ${j})"
             oncontextmenu="onCellMarked(this, ${i}, ${j})" 
             class="${className}"><span></span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}

function renderCell(location) {
    // Select the elCell and set the value
    var value
    var className = 'hidden'
    var cell = gBoard[location.i][location.j]

    if (cell.isMarked) {
        value = FLAG
        className = ''
    }
    else if (cell.isMine) value = MINE
    else if (cell.minesNegsCount > 0) value = cell.minesNegsCount
    else value = EMPTY   

    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = getHTML(value, className)
}

