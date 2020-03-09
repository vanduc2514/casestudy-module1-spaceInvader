let Enemy = function (name) {
    this.name = name;
    this.xPosition = DEFAULT_ENEMY_X;
    this.yPosition = DEFAULT_ENEMY_Y;
    this.width = DEFAULT_ENEMY_WIDTH;
    this.height = DEFAULT_ENEMY_HEIGHT;

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/InvaderA1.png";
        return image;
    };
};