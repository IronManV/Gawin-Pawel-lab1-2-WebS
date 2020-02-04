class Board {
    constructor() {
        this.numberOfHoles = 4;
        this.currentHoleId = 0;
        this.holes = [];
        this.ball;
        this.startTime;
        this.board = document.querySelector('#drawBoard');
        this.boardSize = {
            width: this.board.getBoundingClientRect().width,
            height: this.board.getBoundingClientRect().height
        }
        this.speedX = 0;
        this.speedY = 0;
        this.generateBoard();
        this.generateBall();

        this.startBtn = document.querySelector('#startBtn');
        this.animateArrowFunction = () => this.animate();
        this.setStartTimeArrowFunction = () => this.setStartTime();
        this.changeSpeedArrowFunction = (e) => this.changeBallSpeed(e);
        window.addEventListener('deviceorientation', this.changeSpeedArrowFunction);
        this.startBtn.addEventListener('click', this.animateArrowFunction);
        this.startBtn.addEventListener('click', this.setStartTimeArrowFunction);
        this.isFinished = false;
    }
    setStartTime() {
        this.startBtn.removeEventListener('click', this.animateArrowFunction);
        this.startBtn.removeEventListener('click', this.setStartTimeArrowFunction);
        this.startBtn.style.display = 'none';
        this.startTime = new Date().getTime();
        document.querySelector('#board').style.filter = 'blur(0px)';
    }
    animate() {
        if (!this.isFinished)
            this.moveBall();
        window.requestAnimationFrame(this.animateArrowFunction);
    }
    changeBallSpeed(event) {
        this.speedX = event.alpha * this.ball.speed;
        this.speedY = (event.beta - 90) * this.ball.speed;
    }
    moveBall() {
        let newTop = this.ball.top + this.speedY;
        if (newTop < 0 || newTop > this.boardSize.height - this.ball.size)
            this.loseGame();
        this.ball.top = Math.min(newTop, this.boardSize.height - this.ball.size);
        this.ball.top = Math.max(this.ball.top, this.board.clientTop);

        let newLeft = this.ball.left + this.speedX;
        if (newLeft < 0 || newLeft > this.boardSize.width - this.ball.size)
            this.loseGame();
        this.ball.left = Math.min(newLeft, this.boardSize.width - this.ball.size);
        this.ball.left = Math.max(this.ball.left, this.board.clientLeft);

        this.updateHolesAndGameStates();
        this.setBallPosition();
        this.timer();
    }
    updateHolesAndGameStates() {
        this.holes.forEach(hole => {
            if (this.isOverlapping(this.ball, hole, this.ball.radius + hole.radius)) {
                if (hole.isCurrentTarget) {
                    hole.htmlElement.parentNode.removeChild(hole.htmlElement);
                    this.holes.shift();
                    if (this.holes.length != 0)
                        this.setNewTargetHole();
                    else
                        this.winGame();
                }
                else {
                    this.loseGame();
                }
            }
        });
    }

    generateBall() {
        this.ball = new Ball();
        this.ball.htmlElement = this.ball.createBall();
        this.ball.left = this.boardSize.width / 2 - this.ball.size / 2;
        this.ball.top = this.boardSize.height / 2 - this.ball.size / 2;
        this.setBallPosition();
    }

    setBallPosition() {
        this.ball.htmlElement.setAttributeNS(null, 'cx', this.ball.left + this.ball.radius);
        this.ball.htmlElement.setAttributeNS(null, 'cy', this.ball.top + this.ball.radius);
        this.ball.htmlElement.setAttributeNS(null, 'r', this.ball.radius);
        this.board.appendChild(this.ball.htmlElement);
    }
    setNewTargetHole() {
        if (this.currentHoleId != this.numberOfHoles) {
            this.holes.forEach(hole => {
                hole.htmlElement.setAttributeNS(null, 'fill', hole.color);
                hole.isCurrentTarget = false;
            });
            this.holes[this.currentHoleId].htmlElement.setAttributeNS(null, 'fill', 'grey');
            this.holes[this.currentHoleId].isCurrentTarget = true;
        }
    }
    generateBoard() {
        for (let i = 0; i < this.numberOfHoles; i++) {
            let hole = new Hole(i);
            let svgHole = hole.createHole();
            hole.htmlElement = svgHole;

            this.newHolePosition(hole);

            svgHole.setAttributeNS(null, 'cx', hole.left + hole.radius);
            svgHole.setAttributeNS(null, 'cy', hole.top + hole.radius);
            svgHole.setAttributeNS(null, 'r', hole.radius);
            this.board.appendChild(svgHole);
            this.holes.push(hole);

            if (hole.id == 0) {
                this.currentHoleId = hole.id;
                this.setNewTargetHole();
            }
        }
    }

    newHolePosition(hole) {
        hole.left = this.generateRandomNumber(this.board.clientLeft, this.boardSize.width - hole.size);
        hole.top = this.generateRandomNumber(this.board.clientTop, this.boardSize.height - hole.size);
        hole.centerCoordinates.x = hole.left + hole.radius;
        hole.centerCoordinates.y = hole.top + hole.radius;
    }

    isOverlapping(circularElement, existingHole, minimumDistance) {
        let distance;
        let y = Math.abs((circularElement.top + circularElement.radius) - existingHole.centerCoordinates.y);
        let x = Math.abs((circularElement.left + circularElement.radius) - existingHole.centerCoordinates.x);


        distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (distance < minimumDistance)
            return true;
        return false;

    }

    generateRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    winGame() {
        let text = "You won";
        let resultDiv = document.querySelector('#resultBox')
        resultDiv.innerHTML = text;
        resultDiv.setAttribute('class', 'won');
        document.querySelector('#board').style.filter = 'blur(50px)';
        this.isFinished = true;
    }
    loseGame() {
        let text = "You lose";
        let resultDiv = document.querySelector('#resultBox')
        resultDiv.innerHTML = text;
        resultDiv.setAttribute('class', 'lose');
        document.querySelector('#board').style.filter = 'blur(50px)';
        this.isFinished = true;
    }
    timer() {
        if (!this.isFinished) {
            let currentTime = new Date().getTime();
            document.querySelector('#timer').innerHTML = ((currentTime - this.startTime) / 1000).toFixed(2) + 's';
        }
    }
}