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

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Background.jpg";
        return image;
    };

    this.removeFrame = function (object) {
        let xPosition = object.xPosition;
        let yPosition = object.yPosition;
        let clearWidth = object.width;
        let clearHeight = object.height;
        this.context.clearRect(xPosition, yPosition, clearWidth, clearHeight);
        requestAnimationFrame(this.remove);
    };

    this.render = function (object) {
        let image = object.getImage();
        let xPosition = object.xPosition;
        let yPosition = object.yPosition;
        let board = this;
        image.onload = function () {
            board.context.drawImage(image, xPosition, yPosition);
        };
        requestAnimationFrame(this.draw);
    };


    this.checkCollision = function (object1, object2) {
        let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
        let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
        let distW = (object1.width + object2.width) / 2;
        let distH = (object1.height + object2.height) / 2;
        return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
    };

    this.drawFrame = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.player = new Player("player");
        for (let indexOuter = 0; indexOuter < DEFAULT_ENEMY_ROWS; indexOuter++) {
            let row = [];
            this.enemyZone.push(row);
            for (let indexInner = 1; indexInner <= this.enemyCols; indexInner++) {
                this.enemy = new Enemy("enemy " + indexOuter + "-" + (indexInner - 1));
                row.push(this.enemy);
                this.enemy.xPosition = DEFAULT_ENEMY_X + indexInner * (DEFAULT_ENEMY_WIDTH + DEFAULT_ENEMY_SPACE);
                this.enemy.yPosition = DEFAULT_ENEMY_Y + indexOuter * (DEFAULT_ENEMY_HEIGHT + DEFAULT_ENEMY_SPACE);
                this.draw(this.enemy);
            }
        }
        this.draw(this.player);
        this.firstEnemy = this.enemyZone[3][0]
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
            this.remove(this.player);
            this.player.move(direction);
            this.draw(this.player);
        }
        if (action !== "") {
            let height = this.player.yPosition - 30;
            let firstContact = this.firstEnemy.yPosition + this.firstEnemy.height;
            let xPosition = this.player.xPosition + this.player.width / 2;
            this.bullet = new Bullet();
            this.bullet.xPosition = xPosition;
            let board = this;
            let shoot = setInterval(function () {
                board.remove(board.bullet);
                board.bullet.yPosition = height;
                board.draw(board.bullet);
                height -= DEFAULT_BULLET_TRAVEL;
                if (height <= firstContact) {
                    for (let row = 3; row >= 0; row--) {
                        for (let col = 0; col < 8; col++) {
                            let isHit = board.checkCollision(board.bullet, board.enemyZone[row][col]);
                            if (isHit) {
                                board.remove(board.bullet);
                                board.remove(board.enemyZone[row][col]);
                                clearInterval(shoot);
                            }
                            if (board.bullet.xPosition <= 0) {
                                clearInterval(shoot);
                            }
                        }
                    }

                }
            }, DEFAULT_BULLET_SPEED);
        }
    };
};

let gameBoard = new GameBoard("game", "game-canvas");
gameBoard.start();
window.addEventListener("keydown", function (event) {
    gameBoard.controlPlayer(event)
});