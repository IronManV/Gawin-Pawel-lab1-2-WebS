class Brush {
    constructor(shape, ctx, x, y) {
        this.shape = shape
        this.ctx = ctx
        this.x = x
        this.y = y
        this.brush;
        this.styleBrush()
    }

    styleBrush() {
        if (this.shape == 'square') {
            this.ctx.beginPath()
            this.ctx.rect(this.x, this.y, canvas.width * 0.025, canvas.width * 0.025)
            this.brush = this.ctx.fill()
        } else if (this.shape == 'circle') {
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
            this.brush = this.ctx.fill()
        }
    }
}