class Images {
    constructor(ev) {
        this.ev = ev.target.files
        this.image = new Image()
        this.reader = new FileReader()
        this.loadImage(this.image, this.reader, this.ev)
    }
    loadImage(image, reader, ev) {
        let file = ev[0]
        reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            image.src = e.target.result
            image.onload = function () {
                canvas.width = image.width
                canvas.height = image.height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0)
            }
        }
    }
    reset() {
        return this.image
    }

    /*
    
        loadImage(ev) {
            if (ev.target.files) {
                let file = ev.target.files[0]
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = function (e) {
                    let image = new Image()
                    image.src = e.target.result
                    image.onload = function () {
                        canvas.width = image.width
                        canvas.height = image.height
                        let ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0)
                        this.img = image
                    }
                }
            }
        }*/
}