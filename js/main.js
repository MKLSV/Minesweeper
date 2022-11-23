'use strict'

const MINE = '💣'
const FLAG = '🚩'
var minesLocation = []

var gBoard
var gGame
var gLevel = {
    SIZE: 4,
    MINES: 2
}


function initGame() {
    minesLocation = []
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        firstClick: true
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}


function createMines(board, i, j) {

    var randomCells = randomLocations(gLevel.MINES, i, j)
    for (var i = 0; i < randomCells.length; i++) {
        board[randomCells[i].i][randomCells[i].j].isMine = true
        minesLocation.push({ i, j })
    }
    console.log(minesLocation)
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

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell
            if (board[i][j].isMine) cell = MINE
            else cell = board[i][j].minesAroundCount
            strHTML += `\t<td class = "cell-${i}-${j}" oncontextmenu="cellMarked(this,${i},${j})" onclick = "cellClicked(this,${i},${j})"> </td>`
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>'
    const elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    if (gGame.firstClick) {
        createMines(gBoard, i, j)
        gGame.firstClick = false
        console.log(gBoard)
    }
    if (gBoard[i][j].isShown) return


    gBoard[i][j].isShown = true
    console.log(gBoard[i][j].isShown)

    if (gBoard[i][j].isMine) {

        console.log('bbooom')
        renderCell({ i, j }, MINE)
        console.log(elCell)
        document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'red'
        document.querySelector(`.restart`).innerText = '🤯'
        // gameOver()
        return
    }

    gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)


    if (gBoard[i][j].minesAroundCount != 0) {
        gBoard[i][j].isShown = true
        renderCell({ i, j }, gBoard[i][j].minesAroundCount)
    }

    else {
        expandShown(gBoard, elCell, i, j)
        document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'gray'
        gBoard[i][j].isShown = true
    }
    console.log(gBoard)

}
function cellMarked(elCell, i, j) {
    console.log(elCell)
    if (gBoard[i][j].isShown) return

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false
        renderCell({ i, j }, '')
        console.log('unmark')
    }

    else {
        console.log('mark')
        gBoard[i][j].isMarked = true
        renderCell({ i, j }, FLAG)
        if (gBoard[i][j].isMine) checkGameOver()
    }

}
function checkGameOver() {
    console.log('flagonbomb')
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
                gBoard[i][j].isShown = true
                renderCell({ i, j }, gBoard[i][j].minesAroundCount)
            }
            else {

                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = 'gray'
                board[cellI][cellJ].isShown = true
                // expandShown(board, elCell, cellI, cellJ)
            }
        }
    }
}



function easy() {
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    initGame()
}
function medium() {
    gLevel = {
        SIZE: 8,
        MINES: 14
    }
    initGame()
}
function expert() {
    gLevel = {
        SIZE: 12,
        MINES: 32
    }
    initGame()
}


