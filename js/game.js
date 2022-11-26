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
    MINES: 2,
    LEVEL: '',
    nightMode: false
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

function createMines(board, i, j) {

    var randomCells = randomLocations(gLevel.MINES, i, j)
    for (var i = 0; i < randomCells.length; i++) {
        board[randomCells[i].i][randomCells[i].j].isMine = true
        mines.push(board[randomCells[i].i][randomCells[i].j])
    }
    console.log(mines)
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
    var level = gLevel.LEVEL
    if (mins < 10) mins = '0' + mins
    if (secs < 10) secs = '0' + secs
    var endTime = mins + ':' + secs
    if (!localStorage.getItem(level)) {

        localStorage.setItem(level, endTime);
        // document.querySelector('h2').innerHTML = 'Best time: ' + endTime
    } else {
        var time = localStorage.getItem(level).split(':')
        if (+mins <= +time[0] && +secs < +time[1]) {
            console.log(+time[0])
            console.log(+time[1])
            localStorage.setItem(level, endTime);
        }
    }
    document.querySelector('h2 span').innerHTML = localStorage.getItem(level)

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
    document.querySelector('.lives').innerText = 'Lives: ❤❤❤'
    initGame()
}

function easy() {
    gLevel = {
        SIZE: 4,
        MINES: 2,
        LEVEL: 'easy'
    }
    document.querySelector('.easy').style.backgroundColor = 'Bisque'
    document.querySelector('.medium').style.backgroundColor = 'AliceBlue'
    document.querySelector('.expert').style.backgroundColor = 'AliceBlue'
    document.querySelector('h2 span').innerHTML = localStorage.getItem('easy')


    restart()
}
function medium() {
    gLevel = {
        SIZE: 8,
        MINES: 14,
        LEVEL: 'medium'
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor = 'Bisque'
    document.querySelector('.expert').style.backgroundColor = 'AliceBlue'
    document.querySelector('h2 span').innerHTML = localStorage.getItem('medium')


    restart()
}
function expert() {
    gLevel = {
        SIZE: 12,
        MINES: 32,
        LEVEL: 'expert'
    }
    document.querySelector('.easy').style.backgroundColor = 'AliceBlue'
    document.querySelector('.medium').style.backgroundColor = 'AliceBlue'
    document.querySelector('.expert').style.backgroundColor = 'Bisque'
    document.querySelector('h2 span').innerHTML = localStorage.getItem('expert')
    restart()
}

function mode(button) {
    var h1 =document.querySelector('h1')
    var h2 =document.querySelector('h2')
    var footer =  document.querySelector('footer')
    var lives =  document.querySelector('.lives')
    if(!gGame.nightMode) {
        gGame.nightMode = true
        button.innerText = '☀️'
        button.style.backgroundColor = 'LightYellow'
        document.querySelector('body').style.backgroundColor = 'rgb(179, 193, 207)'
        h1.style.color = 'white'
        h1.style.textShadow = 'DodgerBlue 1px 0 10px'
        h2.style.color = 'white'
        h2.style.textShadow = 'DodgerBlue 1px 0 10px'
        lives.style.color = 'FloralWhite'
        lives.style.textShadow = 'DodgerBlue 1px 0 10px'
        footer.style.color = 'FloralWhite'
        footer.style.textShadow = 'DodgerBlue 1px 0 10px' 
        document.querySelector('.restart').style.backgroundColor ='AliceBlue'
        document.querySelector('.easy').style.backgroundColor ='AliceBlue'
        document.querySelector('.medium').style.backgroundColor ='AliceBlue'
        document.querySelector('.expert').style.backgroundColor ='AliceBlue'

    }
    else {
        gGame.nightMode = false
        button.innerText = '🌙'
        button.style.backgroundColor = 'LightSlateGray'
        document.querySelector('body').style.backgroundColor = 'rgb(99, 113, 128)'
        h1.style.color = 'rgb(255, 153, 0)'
        h1.style.textShadow = 'rgb(255, 0, 0) 1px 0 10px'
        h2.style.color = 'rgb(255, 153, 0)'
        h2.style.textShadow = 'rgb(255, 0, 0) 1px 0 10px'
        lives.style.color = 'rgb(235, 114, 44)'
        lives.style.textShadow = 'rgb(255, 0, 0) 1px 0 5px'
        footer.style.color = 'rgb(255, 176, 123)'
        footer.style.textShadow = 'rgb(255, 123, 0) 1px 0 10px'
        document.querySelector('.restart').style.backgroundColor ='rgb(182, 195, 207)'
        document.querySelector('.easy').style.backgroundColor ='rgb(182, 195, 207)'
        document.querySelector('.medium').style.backgroundColor ='rgb(182, 195, 207)'
        document.querySelector('.expert').style.backgroundColor ='rgb(182, 195, 207)'
    }
}