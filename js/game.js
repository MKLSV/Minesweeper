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
    // if(gGame.shownCount === gLevel.SIZE*gLevel.SIZE){
    //     return winGame()
    // } 

    // for (var k = 0; k < mines.length; k++) {
    //     if (!mines[k].isMarked && !mines[k].isShown) return
    // }

    if (gGame.shownCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES + (3 - gGame.livesCount) && gGame.markedCount === gLevel.MINES - (3 - gGame.livesCount)) winGame()
}

function winGame() {
    document.querySelector(`.restart`).innerText = '😎'
    gGame.isOn = false
    checkRecord(minutes, seconds)
    stopTimer()
}
function checkRecord(mins, secs) {
    if (mins < 10) mins = '0' + mins
    if (secs < 10) secs = '0' + secs
    var endTime = mins + ':' + secs
    if (!localStorage.getItem("Record")) {
        document.querySelector('h2').style.display = 'block'
        localStorage.setItem("Record", endTime);
        // document.querySelector('h2').innerHTML = 'Best time: ' + endTime
    }else {
        var time = localStorage.getItem("Record").split(':')
        if (+mins <= +time[0] && +secs < +time[1]) {
            console.log(+time[0])
            console.log(+time[1])
            localStorage.setItem("Record", endTime);
        }
    }
    document.querySelector('h2 span').innerHTML =  localStorage.getItem("Record")
    
    console.log(mins, secs)
    console.log(+mins, +secs)
    console.log(time)
    console.log(time[0])
    console.log(time[1])



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
    document.querySelector('.medium').style.backgroundColor = 'AliceBlue'
    document.querySelector('.expert').style.backgroundColor = 'AliceBlue'
    restart()
}
function medium() {
    gLevel = {
        SIZE: 8,
        MINES: 14
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor = 'Bisque'
    document.querySelector('.expert').style.backgroundColor = 'AliceBlue'
    restart()
}
function expert() {
    gLevel = {
        SIZE: 12,
        MINES: 32
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor = 'AliceBlue'
    document.querySelector('.expert').style.backgroundColor = 'Bisque'
    restart()
}
