import { Point } from './classes';
import { Quadtree } from './quadtree';

let c = document.querySelector('canvas').getContext('2d');

// Global vars
let ptDist = 70,
	numPoints = 650,
	w = c.canvas.width,
	h = c.canvas.height,
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
Point.init(w, h, ptDist);
let points = [], spd = 0.5, spd2 = spd / 2;
for (let i = 0; i < numPoints; i ++){
	points[i] = new Point(
		Math.random() * bigW,
		Math.random() * bigH,
		(Math.random() * spd - spd2) + spd,
		Math.random() * spd - spd2
	);
}

// Init quadtree
let tree = new Quadtree({x: 0, y: 0, width: w, height: h}, 4, 30);

function update() {
	// Update point locations
	for (let pt of points) {
		pt.update(w, ptDist, h, ptDist);
	}

	// Update quadtree
	tree.clear();
	for (let pt of points) {
		tree.insert(pt);
	}
}

function render() {
	// Background
	var grd = c.createLinearGradient(0, 0, w, h);
	grd.addColorStop(0, colors.background1);
	grd.addColorStop(1, colors.background2);
	c.fillStyle = grd;
	c.fillRect(-1, -1, w + 2, h + 2);

	// Render points
	c.fillStyle = colors.points;
	for (let pt of points){
		c.fillRect(pt.x, pt.y, 2, 2);
	}

	// Render point connectors
	c.strokeStyle = colors.connectors;
	for (let pt of points){
		let	dist2 = ptDist * 2,
			distSqr = Math.pow(ptDist, 2),
			near = tree.retrieve({x: pt.x - ptDist, y: pt.y - ptDist, width: dist2, height: dist2});

		for (let pt2 of near){
			let pt2DistSqr = Math.pow(pt.x - pt2.x, 2) + Math.pow(pt.y - pt2.y, 2)

			if (pt2DistSqr < distSqr){
				c.globalAlpha = 1 - Math.sqrt(pt2DistSqr / distSqr);
				c.beginPath();
				c.moveTo(pt.x, pt.y);
				c.lineTo(pt2.x, pt2.y);
				c.stroke();
			}
		}
	}
	c.globalAlpha = 1;
}

setInterval(function(){
	update();
	render();
}, 30);