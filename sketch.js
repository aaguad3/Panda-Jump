var obstacles = [];
var horizon, obstacleSpeed, score, sprite;

function preload() {
  panda = loadImage('panda.png');
}

function setup() {
  createCanvas(windowWidth, 100);
  horizon = height - 40;
	score = 0;
	obstacleSpeed = 6;
	var size = 20;
	sprite = new Sprite(size * 2, height - horizon, size);
  textSize(20);
  textAlign(CENTER);
}

function draw() {
  background(51);
	setupLevel();
	pushObstacles(frameCount);
	sprite.update(horizon);
  defineObstacles();
}

function setupLevel() {
  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);

	/* draw score */
	noStroke();
  text("Score: " + score, width/2, 30);

	/* draw sprite */
	sprite.draw();
}

function defineObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(sprite)) //if collision
			endGame();

    if (!obstacles[i].onScreen) //if not on screen
      obstacles.splice(i, 1); //delete from array to save space
  }
}

function pushObstacles(x) {
  if (x % 30 === 0) { //every 0.5 seconds
    var x = noise(x);
    if (x > 0.5) {
      newObstacle(x); //push new obstacle
    }
	  if (x % 120 === 0) {//every 2 seconds
	    obstacleSpeed *= 1.05; //slightly speed up
    }
  }
	score++;
}

function newObstacle() {
	var myColor = color(random(255), random(255), random(255)); //random RGB values
	var size = random(30) + 20;
  var obst = new Obstacle(width + size, size, horizon, myColor);
  obstacles.push(obst);
}

function keyPressed() {
	if (sprite.onGround && (keyCode === 32 || keyCode === UP_ARROW)) //jump with space/up arrow
		sprite.jump();
}

function endGame() {
	noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Refresh page to restart", width / 2, height / 2 + 20);
}
