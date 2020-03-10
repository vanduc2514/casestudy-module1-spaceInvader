let GameBoard = function (name, canvasID) {
    this.name = name;
    this.width = document.getElementById(canvasID).width;
    this.height = document.getElementById(canvasID).height;
    this.enemyZone = [];
    this.enemyCols = Math.floor((this.width - 2 * DEFAULT_ENEMY_START + DEFAULT_ENEMY_SPACE) /
        (DEFAULT_PLAYER_WIDTH + DEFAULT_ENEMY_SPACE));
    this.moveThresholdLeft = DEFAULT_PLAYER_SPEED - DEFAULT_PLAYER_WIDTH / 2;
    this.moveThresholdRight = this.width - DEFAULT_PLAYER_SPEED - DEFAULT_PLAYER_WIDTH / 2;
    this.canvas = document.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.score = 0;
    this.player = {};

    this.remove = function (object) {
        let xPosition = object.xPosition;
        let yPosition = object.yPosition;
        let clearWidth = object.width;
        let clearHeight = object.height;
        this.context.clearRect(xPosition, yPosition, clearWidth, clearHeight);
    };

    this.checkCollision = function (object1, object2) {
        let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
        let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
        let distW = (object1.width + object2.width) / 2;
        let distH = (object1.height + object2.height) / 2;
        return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
    };

    this.start = function () {
        this.player = new Player("Player");
        this.bullet = new Bullet();
        for (let row = 0; row < DEFAULT_ENEMY_ROWS; row++) {
            let enemyRow = [];
            this.enemyZone.push(enemyRow);
            for (let col = 1; col <= this.enemyCols; col++) {
                this.enemy = new Enemy("enemy " + row + "-" + (col - 1));
                enemyRow.push(this.enemy);
                this.enemy.xPosition = DEFAULT_ENEMY_X + col * (DEFAULT_ENEMY_WIDTH + DEFAULT_ENEMY_SPACE);
                this.enemy.yPosition = DEFAULT_ENEMY_Y + row * (DEFAULT_ENEMY_HEIGHT + DEFAULT_ENEMY_SPACE);
            }
        }
        this.firstEnemy = this.enemyZone[3][0];
    };

    this.controlPlayer = function (event) {
        let direction = "";
        let action = "";
        switch (event.code) {
            case "ArrowLeft":
                if (this.player.xPosition >= this.moveThresholdLeft) {
                    direction = DIRECTION_LEFT;
                }
                break;
            case "ArrowRight":
                if (this.player.xPosition <= this.moveThresholdRight) {
                    direction = DIRECTION_RIGHT;
                }
                break;
            case "Space":
                action = PLAYER_SHOOT;
                break;
        }
        if (direction !== "") {
            // this.remove(this.player);
            this.player.move(direction);
        }
        if (action !== "") {
            let board = this;
            let nearHit = this.firstEnemy.yPosition + this.firstEnemy.height;
            this.bullet = new Bullet();
            let yPosition = this.player.yPosition - 30;
            let xPosition = this.player.xPosition + this.player.width / 2;
            this.bullet.xPosition = xPosition;
            this.bullet.yPosition = yPosition;
            let shoot = setInterval(function () {
                board.bullet.yPosition -= DEFAULT_BULLET_TRAVEL;
                for (let row = 3; row >= 0; row--) {
                    for (let col = 0; col < 8; col++) {
                        if (board.bullet.yPosition <= nearHit) {
                            if (board.enemyZone[row][col].state) {
                                let isHit = board.checkCollision(board.bullet, board.enemyZone[row][col]);
                                if (isHit) {
                                    board.enemyZone[row][col].state = false;
                                    board.bullet.state = false;
                                    clearInterval(shoot);
                                }
                            }
                        }
                    }
                }
                if (board.bullet.yPosition <= -30) {
                    clearInterval(shoot);
                }
            }, DEFAULT_BULLET_VELOCITY)
        }
    };
};

let gameBoard = new GameBoard("game", "game-canvas");
gameBoard.start();

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
    draw(gameBoard.player);
    if (gameBoard.bullet.state) {
        draw(gameBoard.bullet);
    }
    for (let row = 3; row >= 0; row--) {
        for (let col = 0; col < 8; col++) {
            if (gameBoard.enemyZone[row][col].state) {
                draw(gameBoard.enemyZone[row][col]);
            }
        }
    }
    requestAnimationFrame(renderFrame);
}

requestAnimationFrame(renderFrame);

window.addEventListener("keydown", function (event) {
    gameBoard.controlPlayer(event)
});