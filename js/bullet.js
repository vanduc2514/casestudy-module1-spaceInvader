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

    this.draw = function (context) {
        let image = this.getImage();
        let xPosition = this.xPosition;
        let yPosition = this.yPosition;
        image.onload = function () {
            context.drawImage(image,xPosition,yPosition);
        }
    };
};
