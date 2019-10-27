document.addEventListener('DOMContentLoaded', appStart)

const channel1 = []
const channel2 = []
const channel3 = []
const channel4 = []
let aaa
let startTime


function appStart() {
    document.body.addEventListener('keypress', playAudio)
    document.body.addEventListener('keypress', saveSound)


    document.querySelector('#recordCh1').addEventListener('click', record)
    document.querySelector('#recordCh1').addEventListener('click', change1)

    document.querySelector('#recordCh2').addEventListener('click', record)
    document.querySelector('#recordCh2').addEventListener('click', change2)

    document.querySelector('#recordCh3').addEventListener('click', record)
    document.querySelector('#recordCh3').addEventListener('click', change3)

    document.querySelector('#recordCh4').addEventListener('click', record)
    document.querySelector('#recordCh4').addEventListener('click', change4)

    document.querySelector('#playCh1').addEventListener('click', () => play(channel1))
    document.querySelector('#playCh2').addEventListener('click', () => play(channel2))
    document.querySelector('#playCh3').addEventListener('click', () => play(channel3))
    document.querySelector('#playCh4').addEventListener('click', () => play(channel4))

    document.querySelector('#playAll').addEventListener('click', playAll)

}

function saveSound(e) {
    const time = Date.now()
    switch (aaa) {
        case 1:
            channel1.push({
                key: e.code,
                time: time
            })
            break
        case 2:
            channel2.push({
                key: e.code,
                time: time
            })
            break
        case 3:
            channel3.push({
                key: e.code,
                time: time
            })
            break
        case 4:
            channel4.push({
                key: e.code,
                time: time
            })
            break
        default:
            break;
    }
}

function change1() {
    aaa = 1
}
function change2() {
    aaa = 2
}
function change3() {
    aaa = 3
}
function change4() {
    aaa = 4
}

function record(e) {
    if (startTime === undefined)
        startTime = Date.now()
}


function playAll(e) {
    play(channel1);
    play(channel2);
    play(channel3);
    play(channel4);
}

function play(e) {
    e.forEach(el => {
        setTimeout(playSound, el.time - startTime, el.key)
    })
}

function playSound(e) {
    sound = document.getElementById(e)
    sound.currentTime = 0
    sound.play()

}

function playAudio(e) {
    playSound(e.code);
    sound.currentTime = 0
    //add visual effect
    sound.parentNode.classList.add('playing')
    //remove visual effect
    setTimeout(function () {
        document.querySelectorAll('.soundBtn').forEach(el => el.classList.remove('playing'));
    }, 200)
}





