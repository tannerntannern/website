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

	public width: number = 1;
	public height: number = 1;

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
 * Manages colors internally in hex format, but exposes an interface to edit them as strings, as to take advantage IDE
 * color assistance.
 */
export class ColorManager {
	/**
	 * Where all colors are stored.
	 */
	private colors: {[name:string]: number} = {};

	/**
	 * Constructs a new ColorManager.
	 */
	constructor(colors: {[name:string]: string}) {
		this.set(colors);
	}

	/**
	 * Sets the given color to the given value.
	 */
	public set(name: string, value: string);
	/**
	 * Sets the given colors to the given values.
	 */
	public set(colors: {[name:string]: string});
	public set(p1: string|{[name:string]: string}, p2?: string) {
		// Normalize arguments
		let colors = {};
		if (typeof p1 === 'string') colors[p1] = p2;
		else colors = p1;

		// Assign colors
		for(let name in colors){
			this.colors[name] = parseInt(colors[name].replace('#', '0x'), 16);
		}
	}

	/**
	 * Returns the numeric value of the particular color.
	 */
	public get(name: string, string?: boolean) {
		let color = this.colors[name];
		return string ? '#' + color.toString(16) : color;
	}
}