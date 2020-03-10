let Bullet = function () {
    this.xPosition;
    this.yPosition;
    this.width = DEFAULT_BULLET_WIDTH;
    this.height = DEFAULT_BULLET_HEIGHT;
    this.state = true;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Bullet.png";
        return image;
    };

    this.travel = function () {
        this.yPosition -= DEFAULT_BULLET_TRAVEL;
    };

    this.fly = function (isCollideCheck) {
        let bullet = this;
        let shoot = setInterval(function () {
            bullet.yPosition -= DEFAULT_BULLET_TRAVEL;
            console.log("Đạn bay: " + bullet.yPosition);
            if (isCollideCheck) {
                bullet.state = false;
                clearInterval(shoot);
            }
            if (bullet.yPosition <= 0) {
                console.log("Đạn bay: " + bullet.yPosition);
                clearInterval(shoot);
            }
        }, DEFAULT_BULLET_VELOCITY)
    };
};
