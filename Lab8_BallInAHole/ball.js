class Ball {
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.radius = 30;
        this.size = this.radius * 2;
        this.top;
        this.left;
        this.htmlElement;
        this.centerCoordinates = {
            x: 0,
            y: 0
        }
        this.color = "green";
        this.speed = 0.10;
    }
    createBall() {
        let ball = document.createElementNS(this.svgNS, 'circle');
        ball.setAttributeNS(null, 'fill', this.color);
        return ball;
    }
}