let Ship = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_SHIP_X;
    this.yPosition = DEFAULT_SHIP_Y;
    this.width = DEFAULT_SHIP_WIDTH;
    this.height = DEFAULT_SHIP_HEIGHT;
    this.speed = DEFAULT_SHIP_SPEED;
    this.state = true;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Ship.png";
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

    this.shoot = function () {
        this.bullet = new Bullet();
        this.bullet.state = true;
        let yPosition = this.yPosition - DEFAULT_BULLET_SPACE;
        let xPosition = this.xPosition + this.width / 2;
        this.bullet.xPosition = xPosition;
        this.bullet.yPosition = yPosition;
        return this.bullet;
    };
};
