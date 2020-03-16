let playerID;
let level;
let levelID;
let tableDisplay = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let levelDisplay = document.getElementById("level");
let score;
let playerName;
let playerScore = new Score();
let render;
drawScoreBoard();

function startGame() {
    playerID = window.localStorage.length + 1;
    score = 0;
    levelID = 1;
    playerName = prompt("Bạn gì ơi, nhập tên của mình vào đây nhé: ", "Player " + playerID);
    if (playerName === null) {
        playerName = "Player " + playerID;
    }
    level = new GameBoard(playerName, "game-canvas", playerID);
    stopGame();
    createBoard(level);
    drawScoreBoard();
}

function replayGame() {
    score = 0;
    levelID = 1;
    level = new GameBoard(playerName, "game-canvas", playerID);
    createBoard(level);
}

function stopGame() {
    window.cancelAnimationFrame(render);
    level.context.clearRect(0, 0, level.width, level.height);
    saveScore(level.ID, level.player);
    drawScoreBoard();
}

function nextGame() {
    levelID++;
    level = new GameBoard(playerName, "game-canvas", playerID);
    level.enemyTravel += 10;
    level.enemyVelocity -= 10;
    level.swarmTravel += 20;
    level.enemyVelocity -= 30;
    createBoard(level);
}

function createBoard(board) {
    board.init();
    board.invaderDrop();
    board.invaderAttack();
    render = window.requestAnimationFrame(function () {
        renderFrame(board)
    });
    window.addEventListener("keydown", function (event) {
        board.controlShip(event)
    });
}