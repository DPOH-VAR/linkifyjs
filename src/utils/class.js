export function inherits(parent, child, props={}) {
	let extended = Object.create(parent.prototype);
	for (const p in props) {
		extended[p] = props[p];
	}
	extended.constructor = child;
	child.prototype = extended;
	return child;
}
