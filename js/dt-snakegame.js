const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create unit
const box = 32;

//load image bg and food
const bgimageName = new Image();
bgimageName.src = "/images/carobg_green.jpg";
const foodImage = new Image();
foodImage.src = "/images/icons8-hamburger-48.png";

//load audio bg
let audioName = new Audio();
audioName.src = "/audio/Ao Cuoi (Gia Y).mp3";

audioName.play();
audioName.volume = 0.3;
audioName.loop = true;

//load audio file for dead, eat
let dead = new Audio();
let eat = new Audio();

dead.src = "/audio/HEAVYNANO_WallBreak_3.WAV";
eat.src = "/audio/CritHit.wav";

let snake = [];
let food;
let score;
let direction;
let game;
const GAMEOVER_DELAY = 3000;

function init() {
  direction = "";

  //create snake
  snake[0] = {
    x: 9 * box,
    y: 10 * box,
  };

  //create food in random position
  food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };

  //create the score var
  score = 0;
}

function initDocListeners() {
  document.addEventListener("keydown", function direct(event) {
    let key = event.keyCode;
    if (key == 37 && direction != "RIGHT") {
      direction = "LEFT";
    } else if (key == 38 && direction != "DOWN") {
      direction = "UP";
    } else if (key == 39 && direction != "LEFT") {
      direction = "RIGHT";
    } else if (key == 40 && direction != "UP") {
      direction = "DOWN";
    }
  });
}

function draw() {
  ctx.drawImage(bgimageName, 0, 0);

  const snakehead = new Image();
  snakehead.src = "/images/(32x28)doggo_meme.png";
  var tl = ctx.drawImage(snakehead, snake[0].x, snake[0].y, 32, 32);

  var pattern1;
  pattern1 = ctx.createPattern(snakehead, "no-repeat");

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? pattern1 : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImage, food.x, food.y, 32, 32);

  //old head position of snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //direction
  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  //snake eats food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    eat.volume = 0.2;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    // unshift the snake head without pop the snake tail
  } else {
    // pop the snake tail 'cause just move, dont eat food
    snake.pop();
  }

  //add new head position of snake
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //game over, snake crashes into the wall or eats his body
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
    dead.volume = 0.2;
    audioName.pause();
    //reset game state
    setTimeout(function () {
      init();
      game = setInterval(draw, 100);
    }, GAMEOVER_DELAY);
  } else {
    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "38px Consolas";
    ctx.fillText(score, 2.1 * box, 1.4 * box);
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
}

/**
 * MAIN PROCESSING
*/
initDocListeners();
init();
game = setInterval(draw, 100);

function viewHighScore(score) {
  var saved = 0;
  try {
    saved = parseFloat(localStorage.highScore);
  } catch (e) {
    saved = 0;
  }
  if (!(typeof score === "undefined")) {
    try {
      score = parseFloat(score);
    } catch (e) {
      score = 0;
    }
    if (score > saved) {
      saved = score;
      localStorage.highScore = "" + score;
    }
  }

  if (isNaN(saved)) {
    saved = 0;
    localStorage.highScore = "0";
  }
  alert("Your high score is " + saved);
  return saved;
}

function viewHelp() {
  var textHelp =
    "- Use the arrow key to change direction of the snake\n- If he crashes the wall, you'll lose\n- Eat as much as food you can\nCHEER! :))";
  alert("Tips: \n" + textHelp);
}
