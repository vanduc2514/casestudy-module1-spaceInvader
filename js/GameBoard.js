let GameBoard = function (playerName, canvasID, gameBoardID) {
    this.player = playerName;
    this.ID = gameBoardID;
    this.width = document.getElementById(canvasID).width;
    this.height = document.getElementById(canvasID).height;
    this.context = document.getElementById(canvasID).getContext('2d');
    this.score = DEFAULT_SCORE;
    this.scoreIncrease = DEFAULT_SCORE_INCREMENT;
    this.swarmCols = Math.floor((this.width - 2 * DEFAULT_SWARM_X + DEFAULT_SWARM_SPACE) /
        (DEFAULT_SHIP_WIDTH + DEFAULT_SWARM_SPACE));
    this.swarmRows = DEFAULT_SWARM_ROWS;
    this.swarmxPostion = DEFAULT_SWARM_X;
    this.swarmyPosition = DEFAULT_SWARM_Y;
    this.swarmTravel = DEFAULT_BOARD_SWARM_TRAVEL;
    this.swarmVelocity = DEFAULT_BOARD_SWARM_VELOCITY;
    this.enemyTravel = DEFAULT_BOARD_INVADER_TRAVEL;
    this.enemyVelocity = DEFAULT_BOARD_INVADER_VELOCITY;
    this.enemyTimeDrop = DEFAULT_TIME_INVADER_DROP;
    this.bulletTravel = DEFAULT_BOARD_BULLET_TRAVEL;
    this.bulletVelocity = DEFAULT_BOARD_BULLET_VELOCITY;
    this.moveThresholdLeft = DEFAULT_SHIP_SPEED - DEFAULT_SHIP_WIDTH / 2;
    this.moveThresholdRight = this.width - DEFAULT_SHIP_SPEED - DEFAULT_SHIP_WIDTH / 2;
    this.isOver = false;
    this.isVictory = false;
    this.isSwarmDrop = false;
    this.isTimeDrop = false;


    this.createSwarm = function () {
        this.swarm = [];
        for (let row = 0; row < this.swarmRows; row++) {
            let enemyRow = [];
            this.swarm.push(enemyRow);
            for (let col = 1; col <= this.swarmCols; col++) {
                this.invader = new Invader("enemy " + row + "-" + (col - 1));
                enemyRow.push(this.invader);
                this.invader.xPosition = this.swarmxPostion + col * (DEFAULT_INVADER_WIDTH + DEFAULT_SWARM_SPACE);
                this.invader.yPosition = this.swarmyPosition + row * (DEFAULT_INVADER_HEIGHT + DEFAULT_SWARM_SPACE);
            }
        }
        return this.swarm;
    };

    this.init = function () {
        this.ship = new Ship("Player");
        this.ship.bullet = new Bullet();
        this.createSwarm();
    };

    this.controlShip = function (event) {
        let direction = "";
        let action = "";
        switch (event.code) {
            case KEYBOARD_LEFT:
                if (this.ship.xPosition >= this.moveThresholdLeft) {
                    direction = DIRECTION_LEFT;
                }
                break;
            case KEYBOARD_RIGHT:
                if (this.ship.xPosition <= this.moveThresholdRight) {
                    direction = DIRECTION_RIGHT;
                }
                break;
            case KEYBOARD_SPACE:
                action = ACTION_SHOOT;
                break;
            case "KeyS":
                nextLevel();
                break;
        }
        if (direction !== "") {
            this.ship.move(direction);
        }
        if (action === ACTION_SHOOT) {
            this.ship.shoot();
            this.ship.bullet.travel = this.bulletTravel;
            this.ship.bullet.velocity = this.bulletVelocity;
            this.ship.bullet.fly(0);
        }
    };

    this.invaderDrop = function () {
        if (this.isSwarmDrop) {
            for (let row = this.swarm.length - 1; row >= 0; row--) {
                for (let col = 0; col < this.swarmCols; col++) {
                    this.swarm[row][col].travel = this.swarmTravel;
                    this.swarm[row][col].velocity = this.swarmVelocity;
                    this.swarm[row][col].drop(this.height);
                }
            }
        }
        if (this.isTimeDrop) {
            let board = this;
            let randRows = this.swarmRows;
            let randCols = this.swarmCols;
            let timeDrop = setInterval(function () {
                if (board.isOver) {
                    clearInterval(timeDrop);
                }
                let row = Math.abs(Math.floor(Math.random() * randRows - 1));
                let col = Math.abs(Math.floor(Math.random() * randCols - 1));
                board.swarm[row][col].travel = board.enemyTravel;
                board.swarm[row][col].velocity = board.enemyVelocity;
            }, board.enemyTimeDrop)
        }
    };

    this.checkBulletHit = function () {
        for (let row = this.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.swarmCols; col++) {
                if (this.swarm[row][col].state) {
                    let isHit = isCrash(this.ship.bullet, this.swarm[row][col]);
                    if (isHit) {
                        this.ship.bullet.state = false;
                        this.swarm[row][col].state = false;
                        this.score += this.scoreIncrease;
                        score += this.scoreIncrease;
                    }
                }
            }
        }
    };

    this.checkShipHit = function () {
        for (let row = this.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.swarmCols; col++) {
                if (this.swarm[row][col].state) {
                    let isHit = isCrash(this.ship, this.swarm[row][col]);
                    if (isHit) {
                        this.ship.state = false;
                        this.swarm[row][col].state = false;
                        this.isOver = true;
                        return;
                    }
                }
            }
        }
    };

    this.watchDog = function () {
        if (this.ship.bullet.state) {
            this.checkBulletHit();
        }
        if (this.ship.state) {
            this.checkShipHit();
        }
    };

    this.checkWin = function () {
        let count = 0;
        for (let row = this.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.swarmCols; col++) {
                if (!this.swarm[row][col].state) {
                    count++;
                }
            }
        }
        if (count >= this.swarmRows * this.swarmCols) {
            this.isVictory = true;
            this.isOver = true;
            alert("Thắng rồi. Hurrayy!!");
            let choice = confirm("Các màn sau sẽ thử thách hơn. Chơi tiếp hông ?");
            if (choice) {
                nextLevel();
            } else {
                saveScore(this.ID.toString(), this.player);
                stopGame();
                return true;
            }
        }
    };


    this.checkLose = function () {
        if (this.isOver && !this.isVictory) {
            alert("Tiếc quá không cứu được Trái Đất rùi :(");
            let choice = confirm("Không sao đâu. Chơi lại hông ??");
            if (choice) {
                this.isOver = false;
                replayGame();
            } else {
                saveScore(this.ID.toString(), this.player);
                stopGame();
                return true;
            }
        }
    };
};