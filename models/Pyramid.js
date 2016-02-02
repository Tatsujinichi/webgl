'use strict'; //eslint-disable-line no-unused-expressions
var inherits = require('util').inherits;
var Model = require('./Model.js');
function Pyramid() {
	Model.call(
		this,
		[
			0,0,0,
			0.8,0,0,
			0.5,0.8,0,

			0.8,0,0,
			0.5,0,0.8,
			0.5,0.8,0,

			0,0,0,
			0.5,0,0.8,
			0.5,0.8,0,

			0,0,0,
			0.8,0,0,
			0.5,0,0.8
		],
		[
			1,0,0,1,
			1,0,0,1,
			1,0,0,1,

			0,1,0,1,
			0,1,0,1,
			0,1,0,1,

			0,0,1,1,
			0,0,1,1,
			0,0,1,1,

			1,0,0,1,
			0,1,0,1,
			0,0,1,1
		]
	);
}
inherits(Pyramid, Model);
module.exports = Pyramid;
