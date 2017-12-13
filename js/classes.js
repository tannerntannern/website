var Point = function(x, y, xSpeed, ySpeed) {
	this.x = x;
	this.y = y;
	this.width = 1;
	this.height = 1;
	this.xSpeed = xSpeed || 0;
	this.ySpeed = ySpeed || 0;
};

Point.prototype = {
	update: function() {
		this.x +=this.xSpeed;
		this.y +=this.ySpeed;

		if (this.x < -ptDist) this.x += bigW;
		if (this.x > w + ptDist) this.x -= bigW;
		if (this.y < -ptDist) this.y += bigH;
		if (this.y > h + ptDist) this.y -= bigH;
	}
};