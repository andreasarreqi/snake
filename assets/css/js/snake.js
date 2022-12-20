const canvas =document.getElementById("board");
const ctx = canvas.getContext("2d");

let speed = 8;

class snakePart {
    constructor(x, y){
        thix.x = x;
        this.y = y;
    }
}

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts  = [];
let tailLength  =  2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//Game LOOP
function drawGame() {
    changeSnakePosition();

    checkAppleCollision();
    drawScore()
    clearScreen();
    drawApple();

    drawSnake();
   gameOver();
    drawScore();
setTimeout (drawGame, 1000 / speed);
}

function gameOver () {

}

//score 
function drawScore() {
    ctx.fillStyle = "white";
  ctx.font = "13px Verdana";
  ctx.fillText("Score " + score, canvas.width - 70, 20);
 }

function clearScreen() {
ctx.fillStyle= "black";
ctx.fillRect(0, 0, canvas.height, canvas.width);
}

function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = "green";
    
}

function changeSnakePosition() {
    headX = headX + xVelocity; 
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize); 
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
       score++;
    }
}

document.addEventListener('keydown', keyDown)
//up key
function keyDown (event) {
    //up key
    if(event.keyCode == 38) {
        if (yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    //down key
    if(event.keyCode == 40) {
        if (yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    //left key
    if(event.keyCode == 37) {
        if (xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    //right key
    if(event.keyCode == 39) {
        if (xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();