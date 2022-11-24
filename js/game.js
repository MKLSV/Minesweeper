'use strict'

const MINE = '💣'
const FLAG = '🚩'
var mines = []
var minesLocation = []
var time

var gBoard
var gGame
var gLevel = {
    SIZE: 4,
    MINES: 2
}


function initGame() {
    mines = []
    minesLocation = []
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        firstClick: true,
        livesCount: 3
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


function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell
            if (board[i][j].isMine) cell = MINE
            else cell = board[i][j].minesAroundCount
            strHTML += `\t<td class = "cell cell-${i}-${j}" oncontextmenu="cellMarked(this,${i},${j})" onclick = "cellClicked(this,${i},${j})"> </td>`
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>'
    const elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    // elCell.style.backgroundColor = 'Gainsboro'
}

function checkGameOver() {
    var check = true
    if(gGame.shownCount === gLevel.SIZE*gLevel.SIZE){
        return winGame()
    } 

    for (var k = 0; k < mines.length; k++) {
        if (!mines[k].isMarked) {
            return
        }
    }

    if(gGame.shownCount === gLevel.SIZE*gLevel.SIZE - gLevel.MINES) winGame()
}

function winGame() {
    stopTimer()
    document.querySelector(`.restart`).innerText = '😎'
    gGame.isOn = false
}

function gameOver() {
    stopTimer()
    document.querySelector('.lives').innerText = 'Game Over'
    document.querySelector(`.restart`).innerText = '🤯'
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) document.querySelector(`.cell-${i}-${j}`).innerText = MINE
        }
    }
    gGame.isOn = false

}

function restart() {
    resetTimer()
    document.querySelector(`.restart`).innerText = '😀'
    document.querySelector('.lives').innerText = 'Lives: 🧡🧡🧡' 
    initGame()
}

function easy() {
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    document.querySelector('.easy').style.backgroundColor = 'Bisque'
    document.querySelector('.medium').style.backgroundColor ='AliceBlue'
    document.querySelector('.expert').style.backgroundColor ='AliceBlue'
    restart()
}
function medium() {
    gLevel = {
        SIZE: 8,
        MINES: 14
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor ='Bisque'
    document.querySelector('.expert').style.backgroundColor ='AliceBlue'
    restart()
}
function expert() {
    gLevel = {
        SIZE: 12,
        MINES: 32
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor ='AliceBlue'
    document.querySelector('.expert').style.backgroundColor ='Bisque'
    restart()
}

