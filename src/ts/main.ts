import { Point, Line } from './classes';
import { MainLoop } from './mainloop';
import { debounce } from './util';
declare var $: any, jQuery: any;

function setup() {
	// Grab canvas context
	let c = document.querySelector('canvas').getContext('2d');

	// Set width and height
	c.canvas.width = window.innerWidth;
	c.canvas.height = window.innerHeight;

	// Global vars
	let ptDist = 120,
		pixelsPerPoint = 1500,
		numPointsMax = 1000,
		w = c.canvas.width,
		h = c.canvas.height,
		numPoints = Math.min(Math.round((w * h) / pixelsPerPoint), numPointsMax),
		edgeX = w + ptDist,
		edgeY = h + ptDist,
		bigW = w + (2 * ptDist),
		bigH = h + (2 * ptDist);

	// Init colors
	let colors = {
		background1: '#1e1e3c',
		background2: '#1c3f4a',
		points: '#ffe699',
		connectors: '#f8ffbe'
	};

	// Init Points
	let points = [], spd = 0.5, spd2 = spd / 2;
	for (let i = 0; i < numPoints; i ++){
		points[i] = new Point(
			Math.random() * bigW,
			Math.random() * bigH,
			(Math.random() * spd - spd2) + spd,
			Math.random() * spd - spd2
		);
	}

	// Init Lines
	let lines = [];
	for (let i = 0; i < numPoints; i ++) {
		for (let j = i; j < numPoints; j ++) {
			lines.push(new Line(points[i], points[j]));
		}
	}

	// Pre-calculate values to cut down on render time
	let grd = c.createLinearGradient(0, 0, w, h);
	grd.addColorStop(0, colors.background1);
	grd.addColorStop(1, colors.background2);

	// https://gist.github.com/aurbano/4693462
	function distanceApprox(p1, p2){
		let x = p2.x-p1.x,
			y = p2.y-p1.y;
		return 1.426776695*Math.min(0.7071067812*(Math.abs(x)+Math.abs(y)), Math.max (Math.abs(x), Math.abs(y)));
	}

	// Update function
	function update(delta){
		// Normalize delta
		delta /= 20;

		// Update point locations
		for (let pt of points) {
			pt.x += delta * pt.xSpeed;
			pt.y += delta * pt.ySpeed;

			if (pt.x < -ptDist) pt.x += bigW;
			if (pt.x > edgeX) pt.x -= bigW;
			if (pt.y < -ptDist) pt.y += bigH;
			if (pt.y > edgeY) pt.y -= bigH;
		}
	}

	// Render function
	function render() {
		// Background
		c.fillStyle = grd;
		c.fillRect(-1, -1, w + 2, h + 2);

		// Render points
		c.fillStyle = colors.points;
		for (let pt of points){
			c.fillRect(pt.x, pt.y, 2, 2);
		}

		// Render point connectors
		c.strokeStyle = colors.connectors;
		for (let ln of lines){
			let p1 = ln.p1, p2 = ln.p2,
				lineLengthApprox = distanceApprox(p1, p2);

			if (lineLengthApprox < ptDist){
				c.globalAlpha = 1 - (lineLengthApprox / ptDist);
				c.beginPath();
				c.moveTo(p1.x, p1.y);
				c.lineTo(p2.x, p2.y);
				c.stroke();
			}
		}
		c.globalAlpha = 1;
	}

	// Kick off main loop
	MainLoop
		.setMaxAllowedFPS(80)
		.setUpdate(update)
		.setDraw(render)
		.start();
}

setup();

$(window).on('resize', debounce(function(){
	MainLoop.stop();
	setup();
}, 200));