function createMines(board, i, j) {

    var randomCells = randomLocations(gLevel.MINES, i, j)
    for (var i = 0; i < randomCells.length; i++) {
        board[randomCells[i].i][randomCells[i].j].isMine = true
        mines.push(board[randomCells[i].i][randomCells[i].j])
    }
    console.log(mines)
}

function setMinesNegsCount(board, cellI, cellJ) {
    var neigsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j > board.length - 1) continue
            if (board[i][j].isMine) neigsCount++
        }
    }
    console.log(neigsCount)
    return neigsCount
}

function neighborsCount(board, i, j) {

    for (var cellI = 0; cellI < gLevel.SIZE; cellI++) {
        for (var cellJ = 0; cellJ < gLevel.SIZE; cellJ++) {
            board[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
        }
    }
}


function cellClicked(elCell, i, j) {
    if (gGame.firstClick) {
        createMines(gBoard, i, j)
        gGame.firstClick = false
        gGame.isOn = true
        startTime()
    }

    if (!gGame.isOn) return
    if (gBoard[i][j].isShown) return
    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false
        renderCell({ i, j }, ' ')
    }

    gBoard[i][j].isShown = true
    console.log(gBoard[i][j].isShown)

    if (gBoard[i][j].isMine) {
        gGame.shownCount ++
        document.querySelector('.score').innerText = `Score :${gGame.shownCount}`
        gBoard[i][j].isShown = true
        console.log('bbooom')
        renderCell({ i, j }, MINE)
        console.log(elCell)
        document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'OrangeRed'
        gGame.livesCount--
        document.querySelector('.lives').innerText = 'Lives : ' +  ('🧡').repeat(gGame.livesCount)
        console.log(gGame.livesCount)
        console.log(gGame.shownCount)
        checkGameOver()
        if (gGame.livesCount === 0) gameOver()
        return
    }

    gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)


    if (gBoard[i][j].minesAroundCount != 0) {
        gGame.shownCount++
        document.querySelector('.score').innerText = `Score :${gGame.shownCount}`
        gBoard[i][j].isShown = true
        renderCell({ i, j }, gBoard[i][j].minesAroundCount)
    }

    else {
        expandShown(gBoard, elCell, i, j)
        document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'gray'
        gGame.shownCount++
        document.querySelector('.score').innerText = `Score :${gGame.shownCount}`
        gBoard[i][j].isShown = true
        
    }
    console.log(gGame.shownCount)
    checkGameOver()

}
function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    if (!gGame.isOn) return
    console.log(gBoard)

    if (gBoard[i][j].isMarked) {
        gGame.markedCount--
        gBoard[i][j].isMarked = false
        renderCell({ i, j }, '')
        console.log('unmark')
    }

    else {
        console.log('mark')
        gGame.markedCount++
        gBoard[i][j].isMarked = true
        renderCell({ i, j }, FLAG)
        if (gBoard[i][j].isMine) checkGameOver()
    }
    console.log(gGame.markedCount)
}

function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (gBoard[cellI][cellJ].isShown) continue
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j > board.length - 1) continue
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
            if (gBoard[i][j].minesAroundCount != 0) {
                if(!gBoard[i][j].isShown)gGame.shownCount++
                gBoard[i][j].isShown = true
                console.log(gGame.shownCount)
                renderCell({ i, j }, gBoard[i][j].minesAroundCount)
            }
            else {
                
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'gray'
                if(!gBoard[i][j].isShown)gGame.shownCount++
                console.log(gGame.shownCount)
                board[i][j].isShown = true
                renderCell({ i, j }, ' ')
                // expandShown(board, elCell, i, j)
            }
        }
    }
}
