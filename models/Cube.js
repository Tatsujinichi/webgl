'use strict'; //eslint-disable-line no-unused-expressions
var inherits = require('util').inherits;
var Model = require('./Model.js');
function Cube(translation, rotation, scale) {
	Model.call(
		this,
		translation,
		rotation,
		scale,
			[
			// Front face
			-0.7, -0.7,  0.7,
			 0.7, -0.7,  0.7,
			 0.7,  0.7,  0.7,
			-0.7,  0.7,  0.7,

			// Back face
			-0.7, -0.7, -0.7,
			-0.7,  0.7, -0.7,
			 0.7,  0.7, -0.7,
			 0.7, -0.7, -0.7,

			// Top face
			-0.7,  0.7, -0.7,
			-0.7,  0.7,  0.7,
			 0.7,  0.7,  0.7,
			 0.7,  0.7, -0.7,

			// Bottom face
			-0.7, -0.7, -0.7,
			 0.7, -0.7, -0.7,
			 0.7, -0.7,  0.7,
			-0.7, -0.7,  0.7,

			// Right face
			 0.7, -0.7, -0.7,
			 0.7,  0.7, -0.7,
			 0.7,  0.7,  0.7,
			 0.7, -0.7,  0.7,

			// Left face
			-0.7, -0.7, -0.7,
			-0.7, -0.7,  0.7,
			-0.7,  0.7,  0.7,
			-0.7,  0.7, -0.7
		],
		[
			// [1.0, 0.0, 0.0, 1.0],     // Front face  // this is for an element array
			// [1.0, 1.0, 0.0, 1.0],     // Back face
			// [0.0, 1.0, 0.0, 1.0],     // Top face
			// [1.0, 0.5, 0.5, 1.0],     // Bottom face
			// [1.0, 0.0, 1.0, 1.0],     // Right face
			// [0.0, 0.0, 1.0, 1.0]      // Left face
			1,0,0,1,
			1,0,0,1,
			1,0,0,1,
			1,0,0,1,

			0,1,0,1,
			0,1,0,1,
			0,1,0,1,
			0,1,0,1,

			0,0,1,1,
			0,0,1,1,
			0,0,1,1,
			0,0,1,1,

			1,1,0,1,
			1,1,0,1,
			1,1,0,1,
			1,1,0,1,

			1,0,1,1,
			1,0,1,1,
			1,0,1,1,
			1,0,1,1,

			0,1,1,1,
			0,1,1,1,
			0,1,1,1,
			0,1,1,1
		]
	);
}
inherits(Cube, Model);
module.exports = Cube;
