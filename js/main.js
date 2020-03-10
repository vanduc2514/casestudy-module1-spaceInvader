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
        // if (action !== "") {
        //     let height = this.player.yPosition - 30;
        //     let firstContact = this.firstEnemy.yPosition + this.firstEnemy.height;
        //     let xPosition = this.player.xPosition + this.player.width / 2;
        //     this.bullet = new Bullet();
        //     this.bullet.xPosition = xPosition;
        //     let board = this;
        //     let shoot = setInterval(function () {
        //         board.remove(board.bullet);
        //         board.bullet.yPosition = height;
        //         board.draw(board.bullet);
        //         height -= DEFAULT_BULLET_TRAVEL;
        //         if (height <= firstContact) {
        //             for (let row = 3; row >= 0; row--) {
        //                 for (let col = 0; col < 8; col++) {
        //                     let isHit = board.checkCollision(board.bullet, board.enemyZone[row][col]);
        //                     if (isHit) {
        //                         board.remove(board.bullet);
        //                         board.remove(board.enemyZone[row][col]);
        //                         clearInterval(shoot);
        //                     }
        //                     if (board.bullet.xPosition <= 0) {
        //                         clearInterval(shoot);
        //                     }
        //                 }
        //             }
        //
        //         }
        //     }, DEFAULT_BULLET_SPEED);
        // }
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
    draw(gameBoard.player);
    for (let row = 3; row >= 0; row--) {
        for (let col = 0; col < 8; col ++) {
            draw(gameBoard.enemyZone[row][col])
        }
    }
    requestAnimationFrame(renderFrame());
}

renderFrame();

window.addEventListener("keydown", function (event) {
    gameBoard.controlPlayer(event)
});