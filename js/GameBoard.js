const DEFAULT_SCORE_INCREMENT = 10;
let GameBoard = function (playerName, canvasID,gameBoardID) {
    this.player = playerName;
    this.ID = gameBoardID;
    this.width = document.getElementById(canvasID).width;
    this.height = document.getElementById(canvasID).height;
    this.context = document.getElementById(canvasID).getContext('2d');
    this.swarmCols = Math.floor((this.width - 2 * DEFAULT_SWARM_X + DEFAULT_SWARM_SPACE) /
        (DEFAULT_SHIP_WIDTH + DEFAULT_SWARM_SPACE));
    this.swarmRows = DEFAULT_SWARM_ROWS;
    this.swarmxPostion = DEFAULT_SWARM_X;
    this.swarmyPosition = DEFAULT_SWARM_Y;
    this.moveThresholdLeft = DEFAULT_SHIP_SPEED - DEFAULT_SHIP_WIDTH / 2;
    this.moveThresholdRight = this.width - DEFAULT_SHIP_SPEED - DEFAULT_SHIP_WIDTH / 2;
    this.isOver = false;
    this.score = 0;

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

    this.start = function () {
        this.ship = new Ship("Player");
        this.ship.bullet = new Bullet();
        this.createSwarm();
    };

    this.saveScore = function () {
        let score = new Score();
        score.setData(this.player,this.score);
        window.localStorage.setItem(this.ID,JSON.stringify(score));
    };


    this.controlShip = function (event) {
        let direction = "";
        let action = "";
        switch (event.code) {
            case "ArrowLeft":
                if (this.ship.xPosition >= this.moveThresholdLeft) {
                    direction = DIRECTION_LEFT;
                }
                break;
            case "ArrowRight":
                if (this.ship.xPosition <= this.moveThresholdRight) {
                    direction = DIRECTION_RIGHT;
                }
                break;
            case "Space":
                action = ACTION_SHOOT;
                break;
        }
        if (direction !== "") {
            this.ship.move(direction);
        }
        if (action === ACTION_SHOOT) {
            this.ship.shoot();
            this.ship.bullet.travel(0);
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
                        this.score += DEFAULT_SCORE_INCREMENT;
                        console.log(this.score);
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
                        this.saveScore();
                        this.isOver = true;
                        this.score = 0;
                        alert("You Lost");
                        return;
                    }
                }
            }
        }
    };


    this.swarmDrop = function () {
        let board = this;
        let drop = setInterval(function () {
            if (board.isOver) {
                clearInterval(drop);
            }
            for (let row = board.swarm.length - 1; row >= 0; row--) {
                for (let col = 0; col < board.swarmCols; col++) {
                    board.swarm[row][col].yPosition += DEFAULT_SWARM_TRAVEL;
                }
            }
        }, DEFAULT_SWARM_VELOCITY);
    };

    this.invaderDrop = function () {
        let board = this;
        let randRows = this.swarmRows;
        let randCols = this.swarmCols;
        let drop = setInterval(function () {
            console.log("board status" + board.isOver);
            if (board.isOver) {
                clearInterval(drop);
            }
            let row = Math.abs(Math.floor(Math.random() * randRows - 1));
            let col = Math.abs(Math.floor(Math.random() * randCols - 1));
            board.swarm[row][col].travel(board.height);
        }, DEFAULT_TIME_INVADER_DROP)
    };
};

//Global Function

function isCrash(object1, object2) {
    let distSubX = (object1.xPosition + object1.width / 2) - (object2.xPosition + object2.width / 2);
    let distSubY = (object1.yPosition + object1.height / 2) - (object2.yPosition + object2.height / 2);
    let distW = (object1.width + object2.width) / 2;
    let distH = (object1.height + object2.height) / 2;
    return Math.abs(distSubX) <= distW && Math.abs(distSubY) <= distH;
}
