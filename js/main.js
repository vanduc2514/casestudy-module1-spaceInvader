let GameBoard = function (name, elementID) {
    this.name = name;
    this.width;
    this.height;
    this.canvas = document.getElementById(elementID);
    this.context = this.canvas.getContext('2d');
    this.score;

    this.removeFrame = function (object) {
        object.delete(this.context);
    };

    this.render = function (object) {
        object.draw(this.context);
    };

    this.start = function () {
        this.context.clearRect(0,0,DEFAULT_GAMEBOARD_X,DEFAULT_GAMEBOARD_Y);
        this.context.fillStyle = "rgb(0,0,0)";
        this.context.fill();
        this.player = new Player("player");
        this.enemy = new Enemy("enemy");
        this.render(this.player);
        this.render(this.enemy);
    };

    this.movePlayer = function (event) {
        let direction = "stop";
        switch (event.key) {
            case "ArrowRight":
                direction = DIRECTION_RIGHT;
                break;
            case "ArrowLeft":
                direction = DIRECTION_LEFT;
                break;
        }
        if (direction !== "stop") {
            this.removeFrame(this.player);
            this.player.move(direction);
            this.render(this.player);
        }
    };
};

let gameBoard = new GameBoard("game","game-canvas");
gameBoard.start();
window.addEventListener("keydown", function (event) {
    gameBoard.movePlayer(event)
});