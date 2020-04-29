function Sprite(x, y, radius) {
	this.x = x;
	this.y = y;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;

	this.radius = radius; //size of circle
}

Sprite.prototype.update = function(platform) { //handles y values
	var bottom = this.y + this.radius; //bottom middle of circle
	var nextBottom = bottom + this.yVelocity; //calculate next frame's bottom

  if (bottom <= platform && nextBottom >= platform) { //if next frame on platform
		this.yVelocity = 0; //reset velocity
		this.y = platform - this.radius; //don't go past platform
		this.onGround = true;
  }
  else if (platform - bottom > 1) { //far from platform
		this.yVelocity += this.speed; //increase velocity
		this.onGround = false;
  }
	this.y += this.yVelocity; //movement
};

Sprite.prototype.jump = function() { //jump function
	this.yVelocity = -(this.radius * 0.7);
};

Sprite.prototype.draw = function() {
  image(panda, this.x, this.y, this.radius, this.radius);
};
