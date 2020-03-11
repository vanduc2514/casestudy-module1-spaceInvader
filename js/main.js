let gameBoard = new GameBoard("game", "game-canvas");
gameBoard.start();
gameBoard.swarmDrop();
gameBoard.enemyDrop();

function draw(object) {
    let image = object.getImage();
    let xPosition = object.xPosition;
    let yPosition = object.yPosition;
    // gameBoard.context.beginPath();
    gameBoard.context.drawImage(image, xPosition, yPosition);
    // gameBoard.context.closePath();
}

function renderFrame() {
    gameBoard.context.clearRect(0, 0, gameBoard.width, gameBoard.height);
    draw(gameBoard.player);
    if (gameBoard.player.bullet.state) {
        draw(gameBoard.player.bullet);
    }
    for (let row = gameBoard.swarm.length - 1; row >= 0; row--) {
        for (let col = 0; col < gameBoard.swarmCols; col++) {
            if (gameBoard.swarm[row][col].state) {
                draw(gameBoard.swarm[row][col]);
            }
        }
    }
    requestAnimationFrame(renderFrame);
}

requestAnimationFrame(renderFrame);

window.addEventListener("keydown", function (event) {
    gameBoard.controlPlayer(event)
});

