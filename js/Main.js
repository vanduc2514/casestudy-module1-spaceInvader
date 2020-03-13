let ID = window.localStorage.length + 1;
let table = document.getElementById("score-board");
let scoreDisplay = document.getElementById("score");
let score;
let playerName = "";
let level = 1;
let currentLevel;
let beginner = new GameBoard(playerName, "game-canvas", ID);
let intermediate = new GameBoard(playerName, "game-canvas", ID);
let advance = new GameBoard(playerName, "game-canvas", ID);
let expertise = new GameBoard(playerName, "game-canvas", ID);
let god = new GameBoard(playerName, "game-canvas", ID);

drawScoreBoard();

function startGame() {
    score = 0;
    level = 1;
    playerName = prompt("Bạn gì ơi, nhập tên của mình vào đây nhé: ", "Để tên trống sẽ mặc định là Loser");
    if (playerName === null) {
        playerName = "Loser";
    }
    currentLevel = beginner;
    alert("Bắt đầu chơi nà");
    createBoard(currentLevel);
    drawScoreBoard();
    ID++;
}

function replayGame() {
    drawScoreBoard();
    level = 1;
    score = 0;
    createBoard(currentLevel);
}

function stopGame() {
    currentLevel.context.clearRect(0, 0, currentLevel.width, currentLevel.height);
    drawScoreBoard();
}

function nextLevel() {
    drawScoreBoard();
    if (level <= 10) {
        createBeginner();
        createBoard(currentLevel);
    }
    if (level > 10 && level <= 20) {
        createIntermediate();
        createBoard(currentLevel);
    }
    if (level > 20 && level <= 30) {
        createAdvance();
        createBoard(currentLevel);
    }
    if (level > 30 && level <= 40) {
        createExpertise();
        createBoard(currentLevel);
    }
    level++;
    alert("Bạn đã tới level: " + level);

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
    document.getElementById("level").innerHTML = level;
}

function isCrash(object1, object2) {
    let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
    let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
    let distW = (object1.width + object2.width) / 2;
    let distH = (object1.height + object2.height) / 2;
    return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
}