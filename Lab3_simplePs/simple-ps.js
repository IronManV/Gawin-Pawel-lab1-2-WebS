document.addEventListener('DOMContentLoaded', appStart)

let myPs
let photo
let filter
let temp = 0
let temp1 = 0
let temp2 = 0
let temp3 = 0
let resetImg
function appStart() {
    myPs = new Photoshop('canvas')
    filter = new Filter(myPs.ctx)

    document
        .querySelector('#squareBtn')
        .addEventListener('touchstart', () => {
            myPs.setBrushShape('square')
        })
    document
        .querySelector('#circleBtn')
        .addEventListener('touchstart', () => {
            myPs.setBrushShape('circle')
        })
    document.querySelector('#fileInput')
        .addEventListener('change', (e) => {
            photo = new Images(e)
            e = resetImg
        })

    document
        .querySelector('#darken')
        .addEventListener('change', () => {
            amount = document.querySelector('#darken').value
            if (amount - temp > 0) {
                filter.darkenFilter(document.querySelector('#darken').value, temp, photo)
                temp = amount
            }
        })
    document
        .querySelector("#brightness")
        .addEventListener('change', () => {
            amount = document.querySelector('#brightness').value
            if (amount - temp1 > 0) {
                filter.brighterFilter(document.querySelector('#brightness').value, temp1)
                temp1 = amount
            }
        })
    document
        .querySelector("#contrast")
        .addEventListener('change', () => {
            amount = document.querySelector('#contrast').value
            if (amount - temp2 > 0) {
                filter.contrastFilter(document.querySelector('#contrast').value, temp2)
                temp2 = amount
            }
        })
    document
        .querySelector("#saturation")
        .addEventListener('change', () => {
            amount = document.querySelector('#saturation').value
            if (amount - temp3 > 0) {
                filter.saturationFilter(document.querySelector('#saturation').value)
                temp3 = amount
            }
        })
    document
        .querySelector("#blur")
        .addEventListener('click', () => filter.blurFilter())
    document
        .querySelector("#sepia")
        .addEventListener('click', () => filter.sepiaFilter())
    document
        .querySelector("#blackWhite")
        .addEventListener('click', () => filter.blackWhiteFilter())
    document
        .querySelector("#resetDraw")
        .addEventListener('click', () => {
            reset()
        })
    document
        .querySelector("#resetFilter")
        .addEventListener('click', () => {
            reset()
        })

    document
        .querySelector('#drawBtn')
        .addEventListener('click', () => displayDraw())
    document
        .querySelector('#filtersBtn')
        .addEventListener('click', () => dispalyFilters())
    document
        .querySelector('#backFromDraw')
        .addEventListener('click', () => backToMenu())
    document
        .querySelector('#backFromFilter')
        .addEventListener('click', () => backToMenu())
}
function reset() {
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')
    ctx.drawImage(photo.reset(), 0, 0)
    document.querySelector('#darken').value = 0
    document.querySelector('#brightness').value = 0
    document.querySelector('#contrast').value = 0
    document.querySelector('#saturation').value = 0
    temp = 0
    temp1 = 0
    temp2 = 0
    temp3 = 0
}
function displayDraw() {
    document.querySelector('#actionNav').style.display = 'none'
    document.querySelector('#draw').style.display = 'flex'
}
function dispalyFilters() {
    document.querySelector('#actionNav').style.display = 'none'
    document.querySelector('#filter').style.display = 'flex'
}
function backToMenu() {
    if (document.querySelector('#draw').style.display == 'flex') {
        document.querySelector('#draw').style.display = 'none'
        document.querySelector('#actionNav').style.display = 'flex'
    } else {
        document.querySelector('#filter').style.display = 'none'
        document.querySelector('#actionNav').style.display = 'flex'
    }
}


