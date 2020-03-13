let ID = window.localStorage.length + 1;
let table = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score;
let playerName = "";
let level = 1;
let beginner = new GameBoard(playerName, "game-canvas", ID);
let intermediate = new GameBoard(playerName, "game-canvas", ID);
let advance = new GameBoard(playerName, "game-canvas", ID);
let expertise = new GameBoard(playerName, "game-canvas", ID);
drawScoreBoard();

function startGame() {
    score = 0;
    level = 1;
    playerName = prompt("Bạn gì ơi, nhập tên của mình vào đây nhé: ", "Để tên trống sẽ mặc định là Loser");
    if (playerName === null || playerName === "") {
        playerName = "Loser";
    }
    alert("Bắt đầu chơi nà");
    createBoard(beginner);
    drawScoreBoard();
    ID++;
}

function replayGame() {
    level = 1;
    score = 0;
    createBoard(beginner);
    drawScoreBoard();
}

function stopGame() {
    beginner.context.clearRect(0, 0, beginner.width, beginner.height);
    drawScoreBoard();
}

function nextLevel() {
    if (level <= 5) {
        createBeginner();
        createBoard(beginner);
    }
    if (level > 5 && level <= 10) {
        createIntermediate();
        createBoard(intermediate);
    }
    if (level > 15 && level <= 20) {
        createAdvance();
        createBoard(advance);
    }
    if (level > 25 && level <= 30) {
        createExpertise();
        createBoard(expertise);
    }
    else {
        saveScore();
        stopGame();
        alert("Bạn đã cố gắng lắm nhỉ, cám ơn bạn đã chơi trò chơi của tôi ^^")
    }
    level++;
    document.getElementById("level").innerHTML = level;
    alert("Bạn đã tới level: " + level);
    drawScoreBoard();
}

function createBoard(board) {
    board.init();
    requestAnimationFrame(function () {
        renderFrame(board);
    });
    window.addEventListener("keydown", function (event) {
        board.controlShip(event)
    });
    board.invaderDrop();
}

function isCrash(object1, object2) {
    let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
    let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
    let distW = (object1.width + object2.width) / 2;
    let distH = (object1.height + object2.height) / 2;
    return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
}