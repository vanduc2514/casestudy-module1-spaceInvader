let Invader = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_INVADER_X;
    this.yPosition = DEFAULT_INVADER_Y;
    this.width = DEFAULT_INVADER_WIDTH;
    this.height = DEFAULT_INVADER_HEIGHT;
    this.state = true;
    this.travel = 0;
    this.velocity = 0;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/InvaderA1.png";
        return image;
    };

    this.drop = function (boundary) {
        let invader = this;
        this.yPosition += this.travel;
        if (this.yPosition >= boundary) {
            this.state = false;
        }
        if (this.state) {
            setTimeout(function () {
                invader.drop(boundary)
            }, this.velocity)
        }
    }
};