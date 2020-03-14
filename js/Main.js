let ID = window.localStorage.length + 1;
let currentLevel = new GameBoard("default", "game-canvas", 0);
let tableDisplay = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score = 0;
let playerName = "Player " + ID;
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
}

function replayGame() {
    score = 0;
    currentLevel = new GameBoard(playerName, "game-canvas", ID);
    createBoard(currentLevel);
}

function stopGame() {
    window.cancelAnimationFrame(function () {
        renderFrame(currentLevel);
    });
    currentLevel.context.clearRect(0, 0, currentLevel.width, currentLevel.height);
    saveScore(currentLevel.ID,currentLevel.player);
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
    window.requestAnimationFrame(function () {
        renderFrame(board);
    });
    window.addEventListener("keydown", function (event) {
        board.controlShip(event)
    });
}

console.log(window.localStorage);
console.log("LocalStorage length" + window.localStorage.length);