function draw(board,object) {
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
        draw(board,board.ship);
        board.watchDog();
        board.checkWin();
        board.checkLose();
        if (board.ship.bullet.state) {
            draw(board,board.ship.bullet);
        }
        for (let row = board.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < board.swarmCols; col++) {
                if (board.swarm[row][col].state) {
                    draw(board,board.swarm[row][col]);
                }
            }
        }
        scoreDisplay.innerHTML = "Điểm của bạn là: " + score;
        requestAnimationFrame(function () {
            renderFrame(board);
        });
    }
    drawTable();
}

function drawTable() {
    let html = "<thead><tr><td>Tên Người chơi</td><td>Điểm số</td></tr></thead>";
    html += "<tbody>";
    for (let index = 1; index < localStorage.length - 1; index++) {
        let data = window.localStorage.getItem(index.toString());
        console.log(data);
        data = JSON.parse(data);
        console.log(data);
        html += "<tr>";
        html += "<td>" + data.name + "</td>";
        html += "<td style='text-align: center'>" + score + "</td>";
        html += "</tr>";
    }
    table.innerHTML = html;
}