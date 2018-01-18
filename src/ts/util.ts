/**
 * Debounce function taken from Underscore.js
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns {() => void}
 */
export function debounce(func: Function, wait: number, immediate?: boolean) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * Distance approximation function, based on octagons.
 *
 * https://gist.github.com/aurbano/4693462
 */
export function distApprox(p1: {x: number, y: number}, p2: {x: number, y: number}): number {
	let x = p2.x - p1.x,
		y = p2.y - p1.y;
	return 1.426776695*Math.min(0.7071067812*(Math.abs(x)+Math.abs(y)), Math.max (Math.abs(x), Math.abs(y)));
}