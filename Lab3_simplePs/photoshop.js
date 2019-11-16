class Photoshop {
    constructor(targetElementId) {
        this.canvas = document.querySelector('#' + targetElementId)
        this.ctx = canvas.getContext('2d')
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e))
        this.brushShapeName = 'square'
    }

    onTouchMove(e) {
        // ustal położenie
        const x = e.touches[0].clientX - this.canvas.offsetLeft
        const y = e.touches[0].clientY - this.canvas.offsetTop
        // pobierz pędzel
        this.brushShape = new Brush(this.brushShapeName, this.ctx, x, y)
    }

    setBrushShape(brushShape) {
        this.brushShapeName = brushShape
    }
}