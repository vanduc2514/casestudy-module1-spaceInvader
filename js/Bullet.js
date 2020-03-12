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
        let travel = setInterval(function () {
            if (!bullet.state) {
                clearInterval(travel);
            }
            bullet.yPosition -= bullet.travel;
            if (bullet.yPosition <= boundary) {
                clearInterval(travel);
            }
        }, this.velocity)
    }
};
