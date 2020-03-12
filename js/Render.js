function draw(object) {
    let image = object.getImage();
    let xPosition = object.xPosition;
    let yPosition = object.yPosition;
    gameBoard.context.beginPath();
    gameBoard.context.drawImage(image, xPosition, yPosition);
    gameBoard.context.closePath();
}

function renderFrame() {
    gameBoard.context.clearRect(0, 0, gameBoard.width, gameBoard.height);
    if (!gameBoard.isOver) {
        draw(gameBoard.ship);
    }
    draw(gameBoard.ship);
    if (gameBoard.ship.bullet.state) {
        gameBoard.checkBulletHit();
    }
    if (!gameBoard.isOver) {
        gameBoard.checkShipHit();
    }
    if (gameBoard.ship.bullet.state) {
        draw(gameBoard.ship.bullet);
    }
    for (let row = gameBoard.swarm.length - 1; row >= 0; row--) {
        for (let col = 0; col < gameBoard.swarmCols; col++) {
            if (gameBoard.swarm[row][col].state && !gameBoard.isOver) {
                draw(gameBoard.swarm[row][col]);
            }
        }
    }
    score.innerHTML = "Điểm của bạn là: " + gameBoard.score;
    drawTable();
    requestAnimationFrame(renderFrame);
}

function drawTable() {
    let html = "<thead><tr><td>Tên Người chơi</td><td>Điểm số</td></tr></thead>";
    html += "<tbody>";
    for (let index = 1; index < localStorage.length - 1; index++) {
        let data = window.localStorage.getItem(index.toString());
        data = JSON.parse(data);
        console.log(data);
        html += "<tr>";
        html += "<td>" + data.name + "</td>";
        html += "<td style='text-align: center'>" + data.score + "</td>";
        html += "</tr>";
    }
    table.innerHTML = html;
}