function resetManualBtn() {
    var size = gLevel.SIZE
    switch (size) {
        case 4:
            gLevel.MINES = 2
            break;
        case 8:
            gLevel.MINES = 14
            break;
        case 12:
            gLevel.MINES = 32
            break;
        default:
            break;
    }

    var elBtn = document.querySelector('.manually-create')
    elBtn.classList.remove('hinted')
}

function manuallyCreate(elBtn) {
    if (gGame.isOn) {
        elBtn.classList.remove('hinted')
        return
    }
    if (gGame.hadManualMode) {
        gLevel.MINES = gMenualMineCount
        hideMenualMines()
    }
    gGame.hadManualMode = true
    gGame.isManualMode = !gGame.isManualMode
    elBtn.classList.toggle('hinted')
}

function hideMenualMines() {
    for (var i = 0; i < gMenualMinelocs.length; i++) {
        var location = gMenualMinelocs[i]
        var elSpan = document.querySelector(`.cell-${location.i}-${location.j} span`)
        elSpan.classList.add('hidden')
    }
}

function putMine(elCell, i, j) {
    // update model
    gBoard[i][j].isMine = true
    gMenualMineCount++
    // gLevel.MINES = gMenualMineCount
    gMenualMinelocs.push({ i, j })

    // update DOM
    renderCell({ i, j })
    var elSpan = elCell.querySelector('span')
    elSpan.classList.remove('hidden')

}