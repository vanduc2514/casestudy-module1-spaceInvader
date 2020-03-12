let Bullet = function () {
    this.xPosition;
    this.yPosition;
    this.width = DEFAULT_BULLET_WIDTH;
    this.height = DEFAULT_BULLET_HEIGHT;
    this.state = false;
    this.travel = 0;
    this.velocity = 0;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Bullet.png";
        return image;
    };

    this.fly = function (boundary) {
        let bullet = this;
        this.yPosition -= this.travel;
        if (this.yPosition <= boundary) {
            this.state = false;
        }
        if (this.state) {
            setTimeout(function () {
                bullet.fly(boundary)
            }, bullet.velocity)
        }
    };
};
