'use strict'

const MINE = '💣'

var gBoard
var gGame
var gLevel = {
    SIZE: 4,
    MINES: 2
}


function initGame() {
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


function createMines(board,firstI,firstJ) {
    var randomCells = randomLocations(gLevel.MINES)
    for (var i = 0; i < randomCells.length; i++) {
        board[randomCells[i].i][randomCells[i].j].isMine = true
    }
    console.log(board)
}

function setMinesNegsCount(board,cellI,cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length-1) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            console.log(i,j)
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j > board.length-1) continue
            if(board[i][j].isMine) neighborsCount ++   
        }
    }
    return neighborsCount
}

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell
            if (board[i][j].isMine) cell = MINE
            else cell = board[i][j].minesAroundCount
            strHTML += `\t<td class = "cell-${location.i}-${location.j}" onclick = "cellClicked(this,${i},${j})"> ${cell}</td>`
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>'
    console.log(strHTML)
    const elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    if (gGame.firstClick) {
        gBoard[i][j].isShown = true
        console.log('sds')
        createMines(gBoard, i, j)

        for (var cellI = 0; cellI < gLevel.SIZE; cellI++) {
            for (var cellJ = 0; cellJ < gLevel.SIZE; cellJ++) {
                gBoard[cellI][cellJ].minesAroundCount = setMinesNegsCount(gBoard, cellI, cellJ)
            }
        }
        gGame.firstClick = false
    }

}
function cellMarked(elCell) {

}
function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

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


