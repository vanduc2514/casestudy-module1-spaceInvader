let Invader = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_INVADER_X;
    this.yPosition = DEFAULT_INVADER_Y;
    this.width = DEFAULT_INVADER_WIDTH;
    this.height = DEFAULT_INVADER_HEIGHT;
    this.state = true;
    this.isTimedrop = false;
    this.travel = 0;
    this.velocity = 0;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/InvaderA1.png";
        return image;
    };

    this.drop = function (boundary) {
        let invader = this;
        let drop = setInterval(function () {
            if (!invader.state) {
                clearInterval(drop);
            }
            invader.yPosition += invader.travel;
            if (invader.yPosition > boundary) {
                invader.state = false;
                clearInterval(drop);
            }
        }, invader.velocity)
    };
};