let ID = window.localStorage.length + 1;
let currentLevel = new GameBoard("default", "game-canvas", 0);
let table = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score = 0;
let playerName;
drawScoreBoard();

function startGame() {
    score = 0;
    playerName = prompt("Bạn gì ơi, nhập tên của mình vào đây nhé: ","Để tên trống sẽ mặc định là Loser");
    if (playerName === null) {
        playerName = "Loser";
    }
    currentLevel = new GameBoard(playerName, "game-canvas", ID);
    alert("Bạn là người chơi thứ: " + ID);
    createBoard(currentLevel);
    drawScoreBoard();
    ID++;
    console.log(ID);
}

function replayGame() {
    drawScoreBoard();
    score = 0;
    createBoard(currentLevel);
}

function stopGame() {
    currentLevel.context.clearRect(0, 0, currentLevel.width, currentLevel.height);
    drawScoreBoard();
}

function nextLevel() {
    let nextLevel = new GameBoard(playerName, "game-canvas", ID);
    nextLevel.enemyTravel += 10;
    nextLevel.enemyVelocity -= 10;
    nextLevel.swarmTravel += 20;
    nextLevel.enemyVelocity -= 30;
    createBoard(nextLevel);
}

function createBoard(board) {
    board.init();
    board.invaderDrop();
    requestAnimationFrame(function () {
        renderFrame(board);
    });
    window.addEventListener("keydown", function (event) {
        board.controlShip(event)
    });
}

function isCrash(object1, object2) {
    let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
    let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
    let distW = (object1.width + object2.width) / 2;
    let distH = (object1.height + object2.height) / 2;
    return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
}

console.log(localStorage);