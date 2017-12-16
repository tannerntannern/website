import { Point } from './classes';
import { Quadtree } from './quadtree';
import { ColorManager } from './classes';
declare var PIXI: any;

/*
// Setup point demo
function setup() {
	// Start loop
	app.ticker.add(function(delta){
		// Reset graphics
		g.clear();

		// Update point locations and quadtree
		tree.clear();
		for (let pt of points) {
			pt.update(w, ptDist, h, ptDist, delta);
			tree.insert(pt);
		}

		// Render points
		g.lineStyle(1, colors.get('points'), 1);
		for (let pt of points){
			g.drawRect(pt.x, pt.y, 1, 2);
		}

		// Render point connectors
		let connCol = colors.get('connectors');
		for (let pt of points){
			let	near = tree.retrieve({x: pt.x - ptDist, y: pt.y - ptDist, width: dist2, height: dist2});

			for (let pt2 of near){
				let pt2DistSqr = Math.pow(pt.x - pt2.x, 2) + Math.pow(pt.y - pt2.y, 2);

				if (pt2DistSqr < distSqr){
					g.lineStyle(1, connCol, 1 - pt2DistSqr / distSqr);
					g.moveTo(pt.x, pt.y);
					g.lineTo(pt2.x, pt2.y);
				}
			}
		}
	});
}

setup();*/

// Init colors
let colors = new ColorManager({
	background1: '#1e1e3c',
	background2: '#1c3f4a',
	points: '#ffe699',
	connectors: '#f8ffbe'
});

// Global vars
let ptDist = 80,
	dist2 = ptDist * 2,
	distSqr = ptDist ** 2,
	numPoints = 500,
	spd = 0.5,
	spd2 = spd / 2,
	w = 1000,
	h = 500,
	edgeX = w + ptDist,
	edgeY = h + ptDist,
	bigW = w + (2 * ptDist),
	bigH = h + (2 * ptDist),
	ptSize = 2;

// Setup Pixi.js rendering stuff
let renderer = new PIXI.autoDetectRenderer(w, h);
document.body.appendChild(renderer.view);

let stage = new PIXI.Container(),
	container = new PIXI.particles.ParticleContainer(numPoints, {alpha:true}),
	points = [];

// Setup particle container
let graphic = makeParticleGraphic(),
	texture = renderer.generateTexture(graphic);

graphic.lineStyle(1, colors.get('connectors'), 1);
graphic.moveTo(300,300);
graphic.lineTo(500, 400);

for(let i = 0; i < numPoints; i ++) {
	const p = new PIXI.Sprite(texture);
	p.x = Math.random() * bigW;
	p.y = Math.random() * bigH;
	p.v = createVel();

	container.addChild(p)
}
points = container.children;
stage.addChild(container);

function makeParticleGraphic() {
	const graphic = new PIXI.Graphics();
	graphic.beginFill(colors.get('points'));
	graphic.drawRect(0, 0, ptSize, ptSize);
	return graphic
}

function createVel() {
	const x = (Math.random() * spd - spd2) + spd;
	const y = Math.random() * spd - spd2;
	return {x, y};
}

function render() {
	// Update point locations
	points.map((item) => {
		item.x += item.v.x;
		item.y += item.v.y;

		if (item.x < -ptDist) item.x += bigW;
		if (item.x > edgeX) item.x -= bigW;
		if (item.y < -ptDist) item.y += bigH;
		if (item.y > edgeY) item.y -= bigH;
	});

	// Render and wait for next frame
	renderer.render(stage);
	requestAnimationFrame(render);
}

render();