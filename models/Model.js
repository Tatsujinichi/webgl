'use strict';

var transformHelper = require('transformHelper.js');

function Model(translation, rotation, scale, vertices, colors) {
	if (vertices.constructor !== Array) {
		throw new Error('vertices must be an array');
	}
	if (colors.constructor !== Array) {
		throw new Error('colors must be an array');
	}
	if (vertices.length / colors.length !== 3 / 4) {
		throw new Error('wrong number of colors for vertices');
	}
	this._translation = translation || [0, 0, 0, 0];
	this._rotation = rotation || [0, 0, 0, 0];
	this._scale = scale || [0, 0, 0, 0];
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

Model.prototype.getTranslationMatrix = function () {
	return transformHelper.makeTranslationMatrix(this._translation);
};

Model.prototype.getRotationMatrix = function () {
	return transformHelper.makeRotationMatrix(this._rotation);
};

Model.prototype.getScaleMatrix = function () {
	return transformHelper.makeScaleMatrix(this._scale);
};

Model.prototype.getTransformationMatrix = function () {
	return transformHelper.makeTransformationMatrix(this._translation, this._rotation, this._scale);
};

 //TODO: add view into buffer
