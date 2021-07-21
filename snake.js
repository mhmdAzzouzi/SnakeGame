const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32

//load images
const ground = new Image();
ground.src = "background.png";

const foodImg = new Image();
foodImg.src = "apple.png";

//creat snake

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 9 * box
};
//create food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score

let score = 0;
//control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT" ) {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }


  /* 

  
 
  

  
  */





}

// draw everything
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "yellow" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  ctx.fillstyle = "white";
  ctx.font = "45px changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //IF THE snake eats the food

  if (snakeX == food.x && snakeY == food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };

    // dont remove tail
  } else {
    //remove tail
    snake.pop();
  }

  //which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //game over rules

  //collision

  //new head

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (
    snakeX < box - box ||
    snakeX > 18 * box ||
    snakeY < box - box ||
    snakeY > 18 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);

    console.log("you lost");
  }

  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
  }

  

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
