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
    };

    this.render = function (object) {
        let image = object.getImage();
        let xPosition = object.xPosition;
        let yPosition = object.yPosition;
        this.context.drawImage(image, xPosition, yPosition);
    };

    this.start = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.player = new Player("player");
        for (let indexOuter = 0; indexOuter < DEFAULT_ENEMY_ROWS; indexOuter++) {
            let row = [];
            this.enemyZone.push(row);
            for (let indexInner = 1; indexInner <= this.enemyCols; indexInner++) {
                this.enemy = new Enemy("enemy " + indexOuter + "-" + indexInner);
                row.push(this.enemy);
                this.enemy.xPosition = DEFAULT_ENEMY_X + indexInner * (DEFAULT_ENEMY_WIDTH + DEFAULT_ENEMY_SPACE);
                this.enemy.yPosition = DEFAULT_ENEMY_Y + indexOuter * (DEFAULT_ENEMY_HEIGHT + DEFAULT_ENEMY_SPACE);
                this.render(this.enemy);
            }
        }
        this.render(this.player);
    };

    this.movePlayer = function (event) {
        let direction = "stop";
        switch (event.key) {
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
        }
        if (direction !== "stop") {
            this.removeFrame(this.player);
            this.player.move(direction);
            this.render(this.player);
        }
    };
};

let gameBoard = new GameBoard("game", "game-canvas");
gameBoard.start();
window.addEventListener("keydown", function (event) {
    gameBoard.movePlayer(event)
});