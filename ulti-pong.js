const canvas = document.getElementById("pong")
const ctx = canvas.getContext("2d");

const ballSprite = new Image(); 
const backgroundSprite1 = new Image();
const playerPaddleSprite = new Image();
const enemyPaddleSprite = new Image();
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let playerPoints = 0;
let enemyPoints = 0;
let isStarted = false;

const ball = {
    x: 50,
    y: 50,
    speed: 5,
    hspeed: 5,
    vspeed: 5,
    radius: 22,
    startX: canvas.width/2 -11,
    startY: canvas.height-46,
}

const player = {
    x: canvas.width/2-52,
    y: canvas.height-24,
    speed: 5,
}

const enemy = {
    x: canvas.width/2-52,
    y: 0,
    speed: 5,
}

const drawBackground1 = () => {
    ctx.drawImage(backgroundSprite1, 0, 0);
}

const drawBall = () => {
    ctx.drawImage(ballSprite, ball.x, ball.y);
    ball.x += ball.hspeed;
    ball.y += ball.vspeed;
    if (ball.x + ball.radius> canvas.width) {
        ball.hspeed =- ball.hspeed;
    }
    if(ball.x < 0)
    {
        ball.hspeed =- ball.hspeed;
    }
    if(ball.y + ball.radius > canvas.height)
    {
        ball.vspeed =- ball.vspeed;
    }
    if(ball.y < 0)
    {
        playerPoints += 1;
        isStarted = false;
    }
    if(ball.y + ball.vspeed >= player.y && ball.x + ball.hspeed >= player.x && ball.x + ball.hspeed <= player.x+104)
    {
        ball.vspeed =- ball.vspeed;
    }
    if(ball.y + ball.vspeed <= enemy.y && ball.x >= enemy.x && ball.x <= enemy.x + 104) {
        ball.vspeed = - ball.vspeed;
    }
}

const drawPlayerPaddle = () => {
    ctx.drawImage(playerPaddleSprite, player.x, player.y);
    if(rightPressed && player.x < canvas.width - 104)
    {
        player.x += player.speed;
    }
    if(leftPressed && player.x > 0)
    {
        player.x -= player.speed;
    }
}

const drawEnemyPaddle = () => {
    ctx.drawImage(enemyPaddleSprite, enemy.x, enemy.y);
    if(enemy.x -20 < ball.x)
    {
        enemy.x += enemy.speed;
    }
    if(enemy.x + 20 > ball.x)
    {
        enemy.x -= enemy.speed;
    }
}

const drawScore = () => {
    ctx.font = '36px serif';
    ctx.textAlign = "left";
    ctx.fillText(`Player: ${playerPoints}`, 10, 50);
    ctx.textAlign = "right";
    ctx.fillText(`Enemy: ${enemyPoints}`, canvas.width-10, 50);
}

const draw = () => {
    drawBackground1();
    drawBall();
    drawPlayerPaddle();
    drawEnemyPaddle();
    drawScore();
}

const startText = () => {
    ctx.font = '48px serif';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Press Space to Start!`, canvas.width/2, canvas.height/2);
}

const main = () => {
    draw();
    if(!isStarted)
    {
    startText();
    playerPoints = 0;
    ball.x = ball.startX;
    ball.y = ball.startY;
    ball.speed = 0;
    ball.vspeed = 0;
    ball.hspeed = 0;
    }
    if (playerPoints >= 5) {
            playerPoints = 0;
            ball.x = ball.startX;
            ball.y = ball.startY;
            ball.speed = 0;
            ball.vspeed = 0;
            ball.hspeed = 0;
            isStarted = false;
    }
    if(!isStarted && spacePressed)
    {
        isStarted = true;
        playerPoints = 0;
        ball.x = ball.startX;
        ball.y = ball.startY;
        ball.speed = 5;
        ball.vspeed = 5;
        ball.hspeed = 5;
    }
    
}

setInterval(main, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        console.log('prawy')
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        console.log('lewy')
    }
    if (e.keyCode == 32)
    {
        console.log('space')
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if (e.keyCode == 32) {
        console.log('space')
        spacePressed = false;
    }
}



backgroundSprite1.src = "https://gmclan.org/uploader/8618/background_0.png";
ballSprite.src = "https://gmclan.org/uploader/8618/ballBlue.png";
playerPaddleSprite.src = "https://gmclan.org/uploader/8618/paddleBlu.png";
enemyPaddleSprite.src = "https://gmclan.org/uploader/8618/paddleRed.png"