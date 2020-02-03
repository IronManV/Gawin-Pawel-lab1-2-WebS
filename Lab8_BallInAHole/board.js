class Board {
    constructor() {
        this.numberOfHoles = 5;
        this.holes = [];
        this.ball;
        this.currentTargetHoleId = 0;
        this.currentTargetHoleColor = 'grey'
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
        this.changeSpeedArrowFunction = (e) => this.changeSpeed(e);
        window.addEventListener('deviceorientation', this.changeSpeedArrowFunction);
        this.startBtn.addEventListener('click', this.animateArrowFunction);
        this.startBtn.addEventListener('click', this.setStartTimeArrowFunction);
        this.timerStart;
        this.isGameFinised = false;
    }
    setStartTime() {
        this.startBtn.removeEventListener('click', this.animateArrowFunction);
        this.startBtn.removeEventListener('click', this.setStartTimeArrowFunction);
        this.startBtn.style.display = 'none';
        this.startTime = new Date().getTime();
        document.querySelector('#board').style.filter = 'blur(0px)';
    }
    animate() {
        this.moveBall();
        window.requestAnimationFrame(this.animateArrowFunction);
    }
    changeSpeed(event) {
        this.speedX = event.alpha * this.ball.speed;
        this.speedY = (event.beta - 90) * this.ball.speed;
    }
    moveBall() {
        let newTop = this.ball.top + this.speedY;
        this.ball.top = Math.min(newTop, this.boardSize.height - this.ball.size);
        this.ball.top = Math.max(this.ball.top, this.board.clientTop);

        let newLeft = this.ball.left + this.speedX;
        this.ball.left = Math.min(newLeft, this.boardSize.width - this.ball.size);
        this.ball.left = Math.max(this.ball.left, this.board.clientLeft);

        this.updateHolesAndGameStates();
        this.setBallPosition();
        this.timer();
    }
    stopMovingBall() {
        window.removeEventListener('deviceorientation', this.changeSpeedArrowFunction);
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
        if (this.currentTargetHoleId != this.numberOfHoles) {
            this.holes.forEach(hole => {
                hole.htmlElement.setAttributeNS(null, 'fill', hole.color);
                hole.isCurrentTarget = false;
            });
            this.holes[this.currentTargetHoleId].htmlElement.setAttributeNS(null, 'fill', this.currentTargetHoleColor);
            this.holes[this.currentTargetHoleId].isCurrentTarget = true;
        }
    }
    generateBoard() {
        for (let i = 0; i < this.numberOfHoles; i++) {
            let hole = new Hole(i);
            let svgHole = hole.createHole();
            hole.htmlElement = svgHole;

            this.calculateNewCircularElementPosition(hole);

            svgHole.setAttributeNS(null, 'cx', hole.left + hole.radius);
            svgHole.setAttributeNS(null, 'cy', hole.top + hole.radius);
            svgHole.setAttributeNS(null, 'r', hole.radius);
            this.board.appendChild(svgHole);
            this.holes.push(hole);

            if (hole.id == 0) {
                this.currentTargetHoleId = hole.id;
                this.setNewTargetHole();
            }
        }
    }

    calculateNewCircularElementPosition(circularElement) {
        circularElement.left = this.generateRandomNumber(this.board.clientLeft, this.boardSize.width - circularElement.size);
        circularElement.top = this.generateRandomNumber(this.board.clientTop, this.boardSize.height - circularElement.size);
        circularElement.centerCoordinates.x = circularElement.left + circularElement.radius;
        circularElement.centerCoordinates.y = circularElement.top + circularElement.radius;
    }

    isOverlapping(circularElement, existingHole, minimumDistance) {
        let sqDistance, distance;
        let y = Math.abs((circularElement.top + circularElement.radius) - existingHole.centerCoordinates.y);
        let x = Math.abs((circularElement.left + circularElement.radius) - existingHole.centerCoordinates.x);


        sqDistance = Math.pow(x, 2) + Math.pow(y, 2);
        distance = Math.sqrt(sqDistance);
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
        this.stopMovingBall();
        document.querySelector('#board').style.filter = 'blur(50px)';
        this.isGameFinised = true;
    }
    loseGame() {
        let text = "You lose";
        let resultDiv = document.querySelector('#resultBox')
        resultDiv.innerHTML = text;
        resultDiv.setAttribute('class', 'lose');
        this.stopMovingBall();
        document.querySelector('#board').style.filter = 'blur(50px)';
        this.isGameFinised = true;
    }
    timer() {
        if (!this.isGameFinised) {
            let currentTime = new Date().getTime();
            document.querySelector('#timer').innerHTML = ((currentTime - this.startTime) / 1000).toFixed(2) + 's';
        }
    }
}