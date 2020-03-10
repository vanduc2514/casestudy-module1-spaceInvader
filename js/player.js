let Player = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_PLAYER_X;
    this.yPosition = DEFAULT_PLAYER_Y;
    this.width = DEFAULT_PLAYER_WIDTH;
    this.height = DEFAULT_PLAYER_HEIGHT;
    this.speed = DEFAULT_PLAYER_SPEED;

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

    this.shoot = function () {
        this.bullet = new Bullet();
        let yPosition = this.yPosition - DEFAULT_BULLET_START;
        let xPosition = this.xPosition + this.width / 2;
        this.bullet.xPosition = xPosition;
        this.bullet.yPosition = yPosition;
        return this.bullet;
    };
};