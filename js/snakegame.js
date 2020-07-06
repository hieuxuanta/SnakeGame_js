const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

//create unit
const box = 32;

//load image bg and food
const bgimageName = new Image();
bgimageName.src = "/images/bg_polygon.jpg";
const foodImage = new Image();
foodImage.src = "/images/icons8-hamburger-48.png";

//load audio bg
let audioName = new Audio();
audioName.src = "/audio/Ao Cuoi (Gia Y).mp3";
// audioName.play();
audioName.volume = 0.8;
audioName.loop = true;

// window.onload = function()
// {
//     ctx.drawImage(imageName,40,50, 25, 25);
// }

//load audio file for dead, eat
let dead = new Audio();
let eat = new Audio();

dead.src = "/audio/HEAVYNANO_WallBreak_3.WAV";
eat.src = "/audio/M4A1SBornBeast_CriticalHit.wav";

let snake = [];
let food;
let score;

function init() {
    //create snake

    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    //create food in random position
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };

    //create the score var
    score = 0;

    let snakeX;
    let snakeY;

    let newHead;

    
}

init();

//control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }

}

//check collision, whenever snake eats his body
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// -----draw snake and food to the canvas
//

// setInterval(() => {
//     requestAnimationFrame(draw);
// }, 100);

function draw() {
    ctx.drawImage(bgimageName, 0, 0);

    const snakehead = new Image();
    snakehead.src = "/images/(32x28)doggo_meme.png";
    var tl = ctx.drawImage(snakehead, snake[0].x, snake[0].y, 32, 32);

    var pattern1;
    pattern1 = ctx.createPattern(snakehead, 'no-repeat');

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? pattern1 : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImage, food.x, food.y, 32, 32);

    //old head position of snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        eat.volume = 0.2;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        // unshift the snake head without pop the snake tail

    } else {
        // pop the snake tail 'cause just move, dont eat food
        snake.pop();
    }

    //add new head position of snake
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //game over, snake crashes into the wall or eats his body
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        // clearInterval(game);
        dead.play();
        dead.volume = 0.2;
        audioName.pause();
        // var r = confirm("Play again ? (OK/Cancel)");
        // if (r == true) {
            // init();
            
            snake = [];
            box = 32;
            //create snake

            snake[0] = {
                x: 9 * box,
                y: 10 * box
            };

            //create food in random position
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };

            score = 0;
            



        // } else {
        //     confirm("Your high score is " + score);
        //     window.clearInterval(game);


        // }
    }
    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "38px Consolas";
    ctx.fillText(score, 2.1 * box, 1.4 * box);

}
let game = setInterval(draw, 100);