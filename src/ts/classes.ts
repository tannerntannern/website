/**
 * Represents a point on a canvas for the landing page.
 */
export class Point {
	public static ENV_WIDTH: number = 100;
	public static ENV_HEIGHT: number = 100;
	public static DIST: number = 70;

	private static EDGE_X;
	private static EDGE_Y;
	private static BIG_W;
	private static BIG_H;

	public static init(envWidth, envHeight, dist){
		Point.ENV_WIDTH = envWidth;
		Point.ENV_HEIGHT = envHeight;
		Point.DIST = dist;

		Point.EDGE_X = Point.ENV_WIDTH + Point.DIST;
		Point.EDGE_Y = Point.ENV_HEIGHT + Point.DIST;
		Point.BIG_W = Point.EDGE_X + Point.DIST;
		Point.BIG_H = Point.EDGE_Y + Point.DIST;
	}

	constructor(public x: number,
				public y: number,
				public xSpeed: number,
				public ySpeed: number) {
		// ...
	}

	update(delta) {
		delta /= 1000;
		this.x += delta * this.xSpeed;
		this.y += delta * this.ySpeed;

		if (this.x < -Point.DIST) this.x += Point.BIG_W;
		if (this.x > Point.EDGE_X) this.x -= Point.BIG_W;
		if (this.y < -Point.DIST) this.y += Point.BIG_H;
		if (this.y > Point.EDGE_Y) this.y -= Point.BIG_H;
	}
}

/**
 * Represents a point on a canvas for the landing page.
 */
export class Line {
	constructor(public p1: Point, public p2: Point){
		// ...
	}
}