/**
 * Represents a point on a canvas for the landing page.
 */
export class Point {
	constructor(public x: number, public y: number, public xSpeed: number, public ySpeed: number) {
		// ...
	}
}

/**
 * Represents a line on a canvas for the landing page.
 */
export class Line {
	constructor(public p1: Point, public p2: Point){
		// ...
	}
}