
let GameBoard = function (name, canvasID) {
    this.name = name;
    this.width = document.getElementById(canvasID).width;
    this.height = document.getElementById(canvasID).height;
    this.swarmCols = Math.floor((this.width - 2 * DEFAULT_SWARM_X + DEFAULT_ENEMY_SPACE) /
        (DEFAULT_PLAYER_WIDTH + DEFAULT_ENEMY_SPACE));
    this.swarmRows = DEFAULT_SWARM_ROWS;
    this.swarmxPostion = DEFAULT_SWARM_X;
    this.swarmyPosition = DEFAULT_SWARM_Y;
    this.moveThresholdLeft = DEFAULT_PLAYER_SPEED - DEFAULT_PLAYER_WIDTH / 2;
    this.moveThresholdRight = this.width - DEFAULT_PLAYER_SPEED - DEFAULT_PLAYER_WIDTH / 2;
    this.canvas = document.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.over = true;
    this.score = 0;

    this.createSwarm = function () {
        this.swarm = [];
        for (let row = 0; row < this.swarmRows; row++) {
            let enemyRow = [];
            this.swarm.push(enemyRow);
            for (let col = 1; col <= this.swarmCols; col++) {
                this.enemy = new Enemy("enemy " + row + "-" + (col - 1));
                enemyRow.push(this.enemy);
                this.enemy.xPosition = this.swarmxPostion + col * (DEFAULT_ENEMY_WIDTH + DEFAULT_ENEMY_SPACE);
                this.enemy.yPosition = this.swarmyPosition + row * (DEFAULT_ENEMY_HEIGHT + DEFAULT_ENEMY_SPACE);
            }
        }
        return this.swarm;
    };

    this.start = function () {
        this.player = new Player("Player");
        this.player.bullet = new Bullet();
        this.createSwarm();
        console.log(this.swarm);
        this.firstEnemy = this.swarm[this.swarm.length - 1][0];
    };

    this.checkCollision = function (object1, object2) {
        let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
        let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
        let distW = (object1.width + object2.width) / 2;
        let distH = (object1.height + object2.height) / 2;
        return Math.abs(distSubX) < distW && Math.abs(distSubY) < distH;
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
        if (action === PLAYER_SHOOT) {
            this.player.shoot();
            this.checkHit();
        }
    };

    this.checkHit = function () {
        let nearHit = this.firstEnemy.yPosition + this.firstEnemy.height;
        let board = this;
        let shoot = setInterval(function () {
            board.player.bullet.travel();
            if (board.player.bullet.yPosition <= nearHit) {
                for (let row = board.swarm.length - 1; row >= 0; row--) {
                    for (let col = 0; col < board.swarmCols; col++) {
                        if (board.swarm[row][col].state) {
                            let isHit = board.checkCollision(board.player.bullet, board.swarm[row][col]);
                            if (isHit) {
                                board.swarm[row][col].state = false;
                                board.player.bullet.state = false;
                                clearInterval(shoot);
                            }
                        }
                    }
                }
            }
            if (board.player.bullet.yPosition <= -30) {
                clearInterval(shoot);
            }
        }, DEFAULT_BULLET_VELOCITY)
    };

    this.swarmDrop = function () {
        let board = this;
        let drop = setInterval(function () {
            for (let row = board.swarm.length - 1; row >= 0; row--) {
                for (let col = 0; col < board.swarmCols; col++) {
                   if (board.swarm[row][col].state) {
                       let isHit = board.checkCollision(board.player,board.swarm[row][col]);
                       if (isHit) {
                           board.isOver = true;
                           clearInterval(drop);
                       } else {
                           board.swarm[row][col].yPosition += DEFAULT_SWARM_DROP_SPEED;
                       }
                   }
                }
            }
        }, DEFAULT_SWARM_DROP);
    };

    this.enemyDrop = function () {
        let board = this;
        let rand = setInterval(function () {
            let row = Math.abs(Math.floor(Math.random() * board.swarmRows - 1));
            let col = Math.abs(Math.floor(Math.random() * board.swarmCols - 1));
            let drop = setInterval(function () {
                if (board.swarm[row][col].state) {
                    board.swarm[row][col].yPosition += DEFAULT_ENEMY_DROP_TRAVEL;
                    let isHit = board.checkCollision(board.player, board.swarm[row][col]);
                    if (isHit) {
                        board.swarm[row][col].state = false;
                        board.isOver = true;
                        clearInterval(drop);
                    }
                } else {
                    clearInterval(drop);
                }
            }, DEFAULT_ENEMY_DROP_VELOCITY);
        }, DEFAULT_TIME_ENEMY_DROP);
    };

};