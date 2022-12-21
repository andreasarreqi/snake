const canvas =document.getElementById("board");
const ctx = canvas.getContext("2d");

let speed = 7;

class snakePart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let tileCount = 25;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts  = [];
let tailLength  =  2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

var width = canvas.width;
var height = canvas.height;
var score = 0;

var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

//Game LOOP
function drawGame() {
    changeSnakePosition(); 
    let result = isGameOver();
    if (result){
        return;
    }

    checkAppleCollision();
    drawScore();
    clearScreen();
    drawApple();

    drawSnake();
 
    drawScore();
    if (score > 5) {
        speed = 9;
      }
      if (score > 15) {
        speed = 20;
      }
      if (score > 30) {
        speed = 30;
      }
setTimeout (drawGame, 1000 / speed);
}
//wall borders
function isGameOver(){
    if(headX < 0) {//if snake hits left wall
     alert("Game Over. Please refresh the page to restart the game");
        
    }
    else if(headX === tileCount) {//if snake hits right wall
        alert("Game Over. Please refresh the page to restart the game");
    }
    else if(headY < 0) {//if snake hits wall at the top
        alert("Game Over. Please refresh the page to restart the game");
    }
    else if(headY === tileCount) {//if snake hits wall at the bottom
        alert("Game Over. Please refresh the page to restart the game");
    }

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
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    if (headY < 0) {
        headY = canvas.height - tileCount;
      }
      else if (headY >= canvas.height) {
        headY = 0;
      }
      if (headX < 0) {
        headX = canvas.width - tileCount;
      }
      else if (headX >= canvas.width) {
        headX = 0;
      }

        snakeParts.push(new snakePart(headX, headY));
        while (snakeParts.length > tailLength){
            snakeParts.shift();
        }
        ctx.fillStyle = "orange";
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    
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
        score++;
        tailLength++;
      
    }
}

document.addEventListener('keydown', keyDown);

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
