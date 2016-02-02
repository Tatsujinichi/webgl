'use strict';

function Model(vertices, colors) {
	if (vertices.constructor !== Array) {
		throw new Error('vertices must be an array');
	}
	if (colors.constructor !== Array) {
		throw new Error('colors must be an array');
	}
	if (vertices.length / colors.length !== 3/4) {
		throw new Error('wrong number of colors for vertices');
	}
	this._vertices = vertices;
	this._colors = colors;
}
module.exports = Model;

Model.prototype.getPositions = function () {
	return this._vertices;
};

Model.prototype.getColors = function () {
	return this._colors;
};

Model.prototype.getSize = function () {
	return this._vertices.length;
};
