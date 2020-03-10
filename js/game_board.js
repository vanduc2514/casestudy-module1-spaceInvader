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

    this.start = function () {
        this.player = new Player("Player");
        this.player.bullet = new Bullet();
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
        this.firstEnemy = this.enemyZone[this.enemyZone.length - 1][0];
    };

    this.checkCollision = function (object1, object2) {
        let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
        let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
        let distW = (object1.width + object2.width) / 2;
        let distH = (object1.height + object2.height) / 2;
        return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
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
            this.player.move(direction);
        }
        if (action !== "") {
            this.player.shoot();
            this.player.bullet.fly(result);
        }
    };

    let result;

    this.hitEnemy = function () {
        // let nearHit = this.firstEnemy.yPosition + this.firstEnemy.height;
        // if (this.player.bullet.yPosition <= nearHit) {
            for (let row = this.enemyZone.length - 1; row >= 0; row--) {
                for (let col = 0; col < this.enemyCols; col++) {
                    if (this.enemyZone[row][col].state) {
                        console.log("Check đạn bay: " + this.player.bullet.yPosition);
                        console.log("Check kẻ thù: " + this.enemyZone[row][col].yPosition);
                        result = this.checkCollision(this.player.bullet, this.enemyZone[row][col]);
                        if (result) {
                            this.enemyZone[row][col].state = false;
                            return result;
                        }
                    }
                }
            }
        // }
        // return false;
    };

    this.checkHit = function () {
        let nearHit = this.firstEnemy.yPosition + this.firstEnemy.height;
        let board = this;
        let shoot = setInterval(function () {
            board.player.bullet.travel();
            if (board.player.bullet.yPosition <= nearHit) {
                for (let row = 3; row >= 0; row--) {
                    for (let col = 0; col < 8; col++) {
                        if (board.enemyZone[row][col].state) {
                            let isHit = board.checkCollision(board.player.bullet, board.enemyZone[row][col]);
                            if (isHit) {
                                board.enemyZone[row][col].state = false;
                                board.player.bullet.state = false;
                                clearInterval(shoot);
                            }
                        }
                    }
                }
            }
            if (this.bullet.yPosition <= -30) {
                clearInterval(shoot);
            }
        }, DEFAULT_BULLET_VELOCITY)
    }
};