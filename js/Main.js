let ID = 1;
let currentLevel = new GameBoard("default", "game-canvas", 0);
let table = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score = 0;
let playerName;
drawTable();

function startGame() {
    score = 0;
    playerName = prompt("Nhập tên người chơi: ");
    currentLevel = new GameBoard(playerName, "game-canvas", ID);
    alert("Bạn là người chơi thứ: " + ID);
    createBoard(currentLevel);
    ID++;
    console.log(ID);
}

function replayGame() {
    score = 0;
    createBoard(currentLevel);
}

function stopGame() {
    currentLevel.context.clearRect(0,0,currentLevel.width,currentLevel.height);
}

function nextLevel() {
    let nextLevel = new GameBoard(playerName,"game-canvas",ID);
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
