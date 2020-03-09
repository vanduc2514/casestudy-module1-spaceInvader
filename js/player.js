let Player = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_PLAYER_X;
    this.yPosition = DEFAULT_PLAYER_Y;
    this.width = DEFAULT_PLAYER_WIDTH;
    this.height = DEFAULT_PLAYER_HEIGHT;
    this.speed = DEFAULT_SPEED;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/ship.png";
        return image;
    };

    this.move = function (direction) {
        switch (direction) {
            case "left":
                this.xPosition -= this.speed;
                break;
            case "right":
                this.xPosition += this.speed;
                break;
        }
    };

    this.shoot = function (object) {
        console.log("shoot");
    };

    this.delete = function (context) {
        context.clearRect(this.xPosition,this.yPosition,this.width,this.height);
    };

    this.draw = function (context) {
        let image = this.getImage();
        let xPosition = this.xPosition;
        let yPosition = this.yPosition;
        image.onload = function () {
            context.drawImage(image,xPosition,yPosition);
        }
    };
};