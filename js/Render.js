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

function drawScoreBoard() {
    let scoreBoard = getAndSortScore();
    let html = "<thead><tr><td>Tên Người chơi</td><td>Điểm số</td></tr></thead>";
    html += "<tbody>";
    for (let index = 0; index < scoreBoard.length; index++) {
        html += "<tr>";
        html += "<td>" + scoreBoard[index].name + "</td>";
        html += "<td style='text-align: center'>" + scoreBoard[index].score + "</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    table.innerHTML = html;
}

function getAndSortScore() {
    let scoreArr = [];
    for (let index = 1; index <= localStorage.length; index++) {
        let data = window.localStorage.getItem(index.toString());
        data = JSON.parse(data);
        scoreArr.push(data);
    }
    console.log(scoreArr.length);
    console.log(scoreArr);
    for (let indexOuter = 0; indexOuter < scoreArr.length; indexOuter++) {
        for (let indexInner = 0; indexInner < scoreArr.length - 1; indexInner++) {
            if (scoreArr[indexInner].score < scoreArr[indexInner + 1].score) {
                let temp = scoreArr[indexInner];
                scoreArr[indexInner] = scoreArr[indexInner + 1];
                scoreArr[indexInner + 1] = temp;
            }
        }
    }
    return scoreArr;
}

