(function () {
'use strict';

/**
 * Represents a point on a canvas for the landing page.
 */
var Point = /** @class */ (function () {
    function Point(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.width = 1;
        this.height = 1;
        // ...
    }
    Point.init = function (envWidth, envHeight, dist) {
        Point.ENV_WIDTH = envWidth;
        Point.ENV_HEIGHT = envHeight;
        Point.DIST = dist;
        Point.EDGE_X = Point.ENV_WIDTH + Point.DIST;
        Point.EDGE_Y = Point.ENV_HEIGHT + Point.DIST;
        Point.BIG_W = Point.EDGE_X + Point.DIST;
        Point.BIG_H = Point.EDGE_Y + Point.DIST;
    };
    Point.prototype.update = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x < -Point.DIST)
            this.x += Point.BIG_W;
        if (this.x > Point.EDGE_X)
            this.x -= Point.BIG_W;
        if (this.y < -Point.DIST)
            this.y += Point.BIG_H;
        if (this.y > Point.EDGE_Y)
            this.y -= Point.BIG_H;
    };
    Point.ENV_WIDTH = 100;
    Point.ENV_HEIGHT = 100;
    Point.DIST = 70;
    return Point;
}());

/**
 * TypeScript Quadtree
 *
 * @version 1.1.1
 * @licence MIT
 * @author Tanner Nielsen
 *
 * TypeScript port of https://github.com/timohausmann/quadtree-js/
 */
var Quadtree = /** @class */ (function () {
    function Quadtree(bounds, max_objects, max_levels, level) {
        this.max_objects = max_objects || 10;
        this.max_levels = max_levels || 4;
        this.level = level || 0;
        this.bounds = bounds;
        this.objects = [];
        this.nodes = [];
    }
    /*
     * Split the node into 4 subnodes
     */
    Quadtree.prototype.split = function () {
        var nextLevel = this.level + 1, subWidth = Math.round(this.bounds.width / 2), subHeight = Math.round(this.bounds.height / 2), x = Math.round(this.bounds.x), y = Math.round(this.bounds.y);
        //top right node
        this.nodes[0] = new Quadtree({
            x: x + subWidth,
            y: y,
            width: subWidth,
            height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        //top left node
        this.nodes[1] = new Quadtree({
            x: x,
            y: y,
            width: subWidth,
            height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        //bottom left node
        this.nodes[2] = new Quadtree({
            x: x,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        //bottom right node
        this.nodes[3] = new Quadtree({
            x: x + subWidth,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
    };
    
    /*
     * Determine which node the object belongs to
     * @param Object pRect		bounds of the area to be checked, with x, y, width, height
     * @return Integer		index of the subnode (0-3), or -1 if pRect cannot completely fit within a subnode and is part of the parent node
     */
    Quadtree.prototype.getIndex = function (pRect) {
        var index = -1, verticalMidpoint = this.bounds.x + (this.bounds.width / 2), horizontalMidpoint = this.bounds.y + (this.bounds.height / 2), 
        //pRect can completely fit within the top quadrants
        topQuadrant = (pRect.y < horizontalMidpoint && pRect.y + pRect.height < horizontalMidpoint), 
        //pRect can completely fit within the bottom quadrants
        bottomQuadrant = (pRect.y > horizontalMidpoint);
        //pRect can completely fit within the left quadrants
        if (pRect.x < verticalMidpoint && pRect.x + pRect.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
            //pRect can completely fit within the right quadrants
        }
        else if (pRect.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }
        return index;
    };
    
    /*
     * Insert the object into the node. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding subnodes.
     * @param Object pRect		bounds of the object to be added, with x, y, width, height
     */
    Quadtree.prototype.insert = function (pRect) {
        var i = 0, index;
        //if we have subnodes ...
        if (typeof this.nodes[0] !== 'undefined') {
            index = this.getIndex(pRect);
            if (index !== -1) {
                this.nodes[index].insert(pRect);
                return;
            }
        }
        this.objects.push(pRect);
        if (this.objects.length > this.max_objects && this.level < this.max_levels) {
            //split if we don't already have subnodes
            if (typeof this.nodes[0] === 'undefined') {
                this.split();
            }
            //add all objects to there corresponding subnodes
            while (i < this.objects.length) {
                index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                }
                else {
                    i = i + 1;
                }
            }
        }
    };
    
    /*
     * Return all objects that could collide with the given object
     * @param Object pRect		bounds of the object to be checked, with x, y, width, height
     * @Return Array		array with all detected objects
     */
    Quadtree.prototype.retrieve = function (pRect) {
        var index = this.getIndex(pRect), returnObjects = this.objects;
        //if we have subnodes ...
        if (typeof this.nodes[0] !== 'undefined') {
            //if pRect fits into a subnode ..
            if (index !== -1) {
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(pRect));
                //if pRect does not fit into a subnode, check it against all subnodes
            }
            else {
                for (var i = 0; i < this.nodes.length; i = i + 1) {
                    returnObjects = returnObjects.concat(this.nodes[i].retrieve(pRect));
                }
            }
        }
        return returnObjects;
    };
    
    /*
     * Clear the quadtree
     */
    Quadtree.prototype.clear = function () {
        this.objects = [];
        for (var i = 0; i < this.nodes.length; i = i + 1) {
            if (typeof this.nodes[i] !== 'undefined') {
                this.nodes[i].clear();
            }
        }
        this.nodes = [];
    };
    
    return Quadtree;
}());

var c = document.querySelector('canvas').getContext('2d');
// Global vars
var ptDist = 70;
var numPoints = 650;
var w = c.canvas.width;
var h = c.canvas.height;
var bigW = w + (2 * ptDist);
var bigH = h + (2 * ptDist);
// Init colors
var colors = {
    background1: '#1e1e3c',
    background2: '#1c3f4a',
    points: '#ffe699',
    connectors: '#f8ffbe'
};
// Init Points
Point.init(w, h, ptDist);
var points = [];
var spd = 0.5;
var spd2 = spd / 2;
for (var i = 0; i < numPoints; i++) {
    points[i] = new Point(Math.random() * bigW, Math.random() * bigH, (Math.random() * spd - spd2) + spd, Math.random() * spd - spd2);
}
// Init quadtree
var tree = new Quadtree({ x: 0, y: 0, width: w, height: h }, 4, 30);
function update() {
    // Update point locations
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var pt = points_1[_i];
        pt.update(w, ptDist, h, ptDist);
    }
    // Update quadtree
    tree.clear();
    for (var _a = 0, points_2 = points; _a < points_2.length; _a++) {
        var pt = points_2[_a];
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
    for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
        var pt = points_3[_i];
        c.fillRect(pt.x, pt.y, 2, 2);
    }
    // Render point connectors
    c.strokeStyle = colors.connectors;
    for (var _a = 0, points_4 = points; _a < points_4.length; _a++) {
        var pt = points_4[_a];
        var dist2 = ptDist * 2, distSqr = Math.pow(ptDist, 2), near = tree.retrieve({ x: pt.x - ptDist, y: pt.y - ptDist, width: dist2, height: dist2 });
        for (var _b = 0, near_1 = near; _b < near_1.length; _b++) {
            var pt2 = near_1[_b];
            var pt2DistSqr = Math.pow(pt.x - pt2.x, 2) + Math.pow(pt.y - pt2.y, 2);
            if (pt2DistSqr < distSqr) {
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
setInterval(function () {
    update();
    render();
}, 30);

}());
