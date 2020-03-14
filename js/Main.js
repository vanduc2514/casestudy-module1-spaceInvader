let playerID;
let currentLevel = new GameBoard("default", "game-canvas", 0);
let tableDisplay = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score = 0;
let playerName = "Player " + playerID;
let playerScore = new Score();
drawScoreBoard();

function startGame() {
    playerID = window.localStorage.length + 1;
    score = 0;
    playerName = prompt("Bạn gì ơi, nhập tên của mình vào đây nhé: ","Player " + playerID);
    if (playerName === null) {
        playerName = "Player " + playerID;
    }
    currentLevel = new GameBoard(playerName, "game-canvas", playerID);
    createBoard(currentLevel);
    drawScoreBoard();
}

function replayGame() {
    score = 0;
    currentLevel = new GameBoard(playerName, "game-canvas", playerID);
    createBoard(currentLevel);
}

function stopGame() {
    currentLevel.context.clearRect(0, 0, currentLevel.width, currentLevel.height);
    saveScore(currentLevel.ID,currentLevel.player);
    drawScoreBoard();
}

function nextGame() {
    currentLevel = new GameBoard(playerName, "game-canvas", playerID);
    currentLevel.enemyTravel += 10;
    currentLevel.enemyVelocity -= 10;
    currentLevel.swarmTravel += 20;
    currentLevel.enemyVelocity -= 30;
    createBoard(currentLevel);
}

function createBoard(board) {
    board.init();
    board.invaderDrop();
    renderFrame(board);
    window.addEventListener("keydown", function (event) {
        board.controlShip(event)
    });
}