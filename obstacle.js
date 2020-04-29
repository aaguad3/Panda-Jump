function Obstacle(x, size, horizon, color) {
  this.x = x;
  this.y = horizon - size;
  this.size = size;
  this.color = color;
  this.onScreen = true;
}

Obstacle.prototype.update = function(speed) { //x and onscreen values
  this.onScreen = (this.x > -this.size); //check if onscreen
  this.x -= speed; //movement
};

Obstacle.prototype.draw = function() {
	fill(this.color);
	stroke(255);
	strokeWeight(2);
	rect(this.x, this.y, this.size, this.size);
};

Obstacle.prototype.hits = function(sprite) { //collision check
	var halfSize = this.size / 2;
	var minimumDistance = halfSize + (sprite.radius); // closest before collision

	/* find center coordinates */
	var xCenter = this.x + halfSize;
	var yCenter = this.y + halfSize;

	var distance = dist(xCenter, yCenter, sprite.x, sprite.y); //distance from centers

	return (distance < minimumDistance); //return result
};
