function draw(board, object) {
    let image = object.getImage();
    let xPosition = object.xPosition;
    let yPosition = object.yPosition;
    board.context.beginPath();
    board.context.drawImage(image, xPosition, yPosition);
    board.context.closePath();
}

function renderFrame(board) {
    if (!board.isOver) {
        board.context.clearRect(0, 0, board.width, board.height);
        draw(board, board.ship);
        if (board.ship.bullet.state) {
            draw(board, board.ship.bullet);
        }
        for (let row = board.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < board.swarmCols; col++) {
                if (board.swarm[row][col].state) {
                    draw(board, board.swarm[row][col]);
                }
            }
        }
        board.watchDog();
        board.checkWin();
        board.checkLose();
        scoreDisplay.innerHTML = "Điểm số: " + score;
        requestAnimationFrame(function () {
            renderFrame(board);
        });
    }
}

