let Bullet = function () {
    this.xPosition = DEFAULT_BULLET_X;
    this.yPosition = DEFAULT_BULLET_Y;
    this.width = DEFAULT_BULLET_WIDTH;
    this.height = DEFAULT_BULLET_HEIGHT;
    this.state = false;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Bullet.png";
        return image;
    };

    this.travel = function () {
        this.yPosition -= DEFAULT_BULLET_TRAVEL;
    }
};
