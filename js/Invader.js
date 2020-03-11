let Invader = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_INVADER_X;
    this.yPosition = DEFAULT_INVADER_Y;
    this.width = DEFAULT_INVADER_WIDTH;
    this.height = DEFAULT_INVADER_HEIGHT;
    this.state = true;
    this.swarm = [];

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/InvaderA1.png";
        return image;
    };

    this.travel = function (boundary) {
        let enemy = this;
        let drop = setInterval(function () {
            if (!enemy.state) {
                console.log("state: " + !enemy.state);
                clearInterval(drop);
            }
            enemy.yPosition += DEFAULT_INVADER_TRAVEL;
            console.log("state: " + !enemy.state);
            if (enemy.yPosition > boundary) {
                clearInterval(drop);
                console.log("stop");
            }
        }, DEFAULT_INVADER_VELOCITY)
    }

};