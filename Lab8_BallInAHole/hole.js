class Hole {
    constructor(id) {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.radius = 40;
        this.size = this.radius * 2;
        this.top;
        this.left;
        this.htmlElement;
        this.centerCoordinates = {
            x: 0,
            y: 0
        }
        this.id = id;
        this.color = 'black';
        this.isCurrentTarget = false;
    }
    createHole() {
        let hole = document.createElementNS(this.svgNS, 'circle');
        hole.setAttributeNS(null, 'fill', this.color);
        return hole;
    }
}