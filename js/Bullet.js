let Bullet = function () {
    this.xPosition;
    this.yPosition;
    this.width = DEFAULT_BULLET_WIDTH;
    this.height = DEFAULT_BULLET_HEIGHT;
    this.state = false;
    this.travel = 0;
    this.velocity = 0;
    this.isShipShoot = true;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Bullet.png";
        return image;
    };

    this.fly = function (boundary) {
        let bullet = this;
        let fly = setInterval(function () {
            if (!bullet.state) {
                clearInterval(fly);
            }
            bullet.yPosition -= bullet.travel;
            if (bullet.isShipShoot) {
                if (bullet.yPosition <= boundary) {
                    bullet.state = false;
                }
            } else {
                if (bullet.yPosition >= boundary) {
                    bullet.state = false;
                }
            }
        }, bullet.velocity)
    };
};
