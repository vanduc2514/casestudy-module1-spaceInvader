let Bullet = function (name) {
    this.name = name;
    this.xPosition;
    this.yPosition;

    this.delete = function (context) {
        context.clearRect(this.xPosition,this.yPosition,this.width,this.height);
    };

    this.getImage = function () {
        let image = new Image();
        image.src = "./assets/images/Bullet.png";
        return image;
    };
};
