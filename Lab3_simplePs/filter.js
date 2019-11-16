class Filter {
    constructor(ctx) {
        this.ctx = ctx
    }
    darkenFilter(amount, temp) {
        let canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] -= amount - temp
            canvasData.data[i + 1] -= amount - temp
            canvasData.data[i + 2] -= amount - temp
        }
        this.applyFilter(canvasData)
    }
    brighterFilter(amount, temp) {
        let canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] += amount - temp
            canvasData.data[i + 1] += amount - temp
            canvasData.data[i + 2] += amount - temp
        }
        this.applyFilter(canvasData)
    }
    contrastFilter(contrast) {
        const canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        contrast = (contrast / 100) + 1
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] = canvasData.data[i] * contrast
            canvasData.data[i + 1] = canvasData.data[i + 1] * contrast
            canvasData.data[i + 2] = canvasData.data[i + 2] * contrast
        }
        this.applyFilter(canvasData)
    }
    saturationFilter(value) {
        const canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        value /= 100
        for (let i = 0; i < canvasData.data.length; i += 4) {
            var r = canvasData.data[i]
            var g = canvasData.data[i + 1]
            var b = canvasData.data[i + 2]
            var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b //weights from CCIR 601 spec
            canvasData.data[i] = -gray * value + canvasData.data[i] * (1 + value)
            canvasData.data[i + 1] = -gray * value + canvasData.data[i + 1] * (1 + value)
            canvasData.data[i + 2] = -gray * value + canvasData.data[i + 2] * (1 + value)
            if (canvasData.data[i] > 255) canvasData.data[i] = 255
            if (canvasData.data[i + 1] > 255) canvasData.data[i] = 255
            if (canvasData.data[i + 2] > 255) canvasData.data[i] = 255
            if (canvasData.data[i] < 0) canvasData.data[i] = 0
            if (canvasData.data[i + 1] < 0) canvasData.data[i] = 0
            if (canvasData.data[i + 2] < 0) canvasData.data[i] = 0
        }
        this.applyFilter(canvasData)
    }
    blurFilter() {
        let canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        let px = canvasData.data
        let tmpPx = new Uint8ClampedArray(px.length)
        for (let i = 0; i < px.length; i++) {
            tmpPx[i] = px[i]
        }
        //Gaussian Blur - Image Processing Algorithm
        for (let i = 0; i < px.length; i++) {
            if (i % 4 === 3) { continue }
            px[i] = (tmpPx[i]
                + (tmpPx[i - 36] || tmpPx[i])
                + (tmpPx[i + 36] || tmpPx[i])
                + (tmpPx[i - 36 * canvasData.width] || tmpPx[i])
                + (tmpPx[i + 36 * canvasData.width] || tmpPx[i])
                + (tmpPx[i - 36 * canvasData.width - 36] || tmpPx[i])
                + (tmpPx[i + 36 * canvasData.width + 36] || tmpPx[i])
                + (tmpPx[i - 36 * canvasData.width + 36] || tmpPx[i])
                + (tmpPx[i + 36 * canvasData.width - 36] || tmpPx[i])
            ) / 9
        }
        this.applyFilter(canvasData)
    }
    blackWhiteFilter() {
        const canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] = canvasData.data[i]
            canvasData.data[i + 1] = canvasData.data[i]
            canvasData.data[i + 2] = canvasData.data[i]
        }
        this.applyFilter(canvasData)
    }
    sepiaFilter() {
        let canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < canvasData.data.length; i += 4) {
            let r = canvasData.data[i]
            let g = canvasData.data[i + 1]
            let b = canvasData.data[i + 2]
            let avg = 0.3 * r + 0.59 * g + 0.11 * b
            canvasData.data[i] = avg + 100
            canvasData.data[i + 1] = avg + 50
            canvasData.data[i + 2] = avg
        }
        this.applyFilter(canvasData)
    }
    reset() {

    }
    applyFilter(canvasData) {
        this.ctx.putImageData(canvasData, 0, 0)
    }

}