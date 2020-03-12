let ID = 1;
let gameBoard = new GameBoard("default", "game-canvas", 0);
let table = document.getElementById("score-board");
let score = document.getElementById("score");
drawTable();

function startGame() {
    let playerName = prompt("Nhập tên người chơi: ");
    alert("Bạn là người chơi thứ: " + ID);
    gameBoard = new GameBoard(playerName, "game-canvas", ID);
    gameBoard.start();
    gameBoard.swarmDrop();
    gameBoard.invaderDrop();
    requestAnimationFrame(renderFrame);
    window.addEventListener("keydown", function (event) {
        gameBoard.controlShip(event)
    });
    ID++;
}
