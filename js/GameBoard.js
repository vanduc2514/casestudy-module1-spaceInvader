let GameBoard = function (playerName, canvasID, gameBoardID) {
    this.player = playerName;
    this.ID = gameBoardID;
    this.width = document.getElementById(canvasID).width;
    this.height = document.getElementById(canvasID).height;
    this.context = document.getElementById(canvasID).getContext('2d');
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
    this.isLost = false;
    this.isVictory = false;
    this.isOver = false;
    this.bulletArr = [];
    this.bulletIndex = 0;
    this.activeMachineGun = false;

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
            case "KeyW":
                this.isVictory = true;
                break;
            case "KeyQ":
                this.isLost = true;
                break;
        }
        if (direction !== "") {
            this.ship.move(direction);
        }
        if (action === ACTION_SHOOT) {
            this.ship.shoot();
            if (this.activeMachineGun) {
                this.bulletArr.push(this.ship.shoot());
                this.bulletArr[this.bulletIndex].travel = this.bulletTravel;
                this.bulletArr[this.bulletIndex].velocity = this.bulletVelocity;
                this.bulletArr[this.bulletIndex].fly(0);
                this.bulletIndex++;
            } else {
                this.bulletArr[this.bulletIndex] = this.ship.shoot();
                this.bulletArr[this.bulletIndex].travel = this.bulletTravel;
                this.bulletArr[this.bulletIndex].velocity = this.bulletVelocity;
                this.bulletArr[this.bulletIndex].fly(0);
            }
        }
    };

    this.invaderDrop = function () {
        let board = this;
        let randRows = this.swarmRows;
        let randCols = this.swarmCols;
        for (let row = this.swarm.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.swarmCols; col++) {
                this.swarm[row][col].travel = this.swarmTravel;
                this.swarm[row][col].velocity = this.swarmVelocity;
                this.swarm[row][col].drop(this.height);
            }
        }
        let timeDrop = setInterval(function () {
            if (board.isLost) {
                clearInterval(timeDrop);
            }
            let row = Math.abs(Math.floor(Math.random() * randRows - 1));
            let col = Math.abs(Math.floor(Math.random() * randCols - 1));
            board.swarm[row][col].travel = board.enemyTravel;
            board.swarm[row][col].velocity = board.enemyVelocity;
        }, board.enemyTimeDrop)
    };

    this.checkBulletHit = function () {
        for (let index = 0; index < this.bulletArr.length; index++) {
            if (this.bulletArr[index].state) {
                for (let row = this.swarm.length - 1; row >= 0; row--) {
                    for (let col = 0; col < this.swarmCols; col++) {
                        if (this.swarm[row][col].state) {
                            let isHit = checkCollision(this.bulletArr[index], this.swarm[row][col]);
                            if (isHit) {
                                this.bulletArr[index].state = false;
                                this.swarm[row][col].state = false;
                                score += this.scoreIncrease;
                            }
                        }
                    }
                }
            }
        }
    };


    // this.checkBulletHit = function () {
    //     if (this.ship.bullet.state) {
    //         for (let row = this.swarm.length - 1; row >= 0; row--) {
    //             for (let col = 0; col < this.swarmCols; col++) {
    //                 if (this.swarm[row][col].state) {
    //                     let isHit = checkCollision(this.ship.bullet, this.swarm[row][col]);
    //                     if (isHit) {
    //                         this.ship.bullet.state = false;
    //                         this.swarm[row][col].state = false;
    //                         score += this.scoreIncrease;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // };

    this.checkShipHit = function () {
        if (this.ship.state) {
            for (let row = this.swarm.length - 1; row >= 0; row--) {
                for (let col = 0; col < this.swarmCols; col++) {
                    if (this.swarm[row][col].state) {
                        let isHit = checkCollision(this.ship, this.swarm[row][col]);
                        if (isHit) {
                            this.ship.state = false;
                            this.swarm[row][col].state = false;
                            this.isLost = true
                        }
                    }
                }
            }
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
        if (!this.isVictory) {
            if (count >= this.swarmRows * this.swarmCols) {
                this.isOver = true;
                this.isVictory = true;
                alert("Thắng rồi. Hurrayy!!");
                let choice = confirm("Các màn sau sẽ thử thách hơn. Chơi tiếp hông ?");
                if (choice) {
                    stopGame();
                    nextGame();
                } else {
                    stopGame();
                }
            }
        }
    };


    this.checkLose = function () {
        if (this.isLost) {
            this.isOver = true;
            alert("Tiếc quá không cứu được Trái Đất rùi :(");
            let choice = confirm("Không sao đâu. Chơi lại hông ??");
            if (choice) {
                stopGame();
                replayGame();
            } else {
                stopGame();
            }
        }
    };
};

function checkCollision(object1, object2) {
    let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
    let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
    let distW = (object1.width + object2.width) / 2;
    let distH = (object1.height + object2.height) / 2;
    return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
}