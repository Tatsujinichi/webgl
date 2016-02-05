'use strict'; //eslint-disable-line no-unused-expressions

require('style.less');
var Pyramid = require('./models/Pyramid.js');
var Cube = require('./models/Cube.js');
var transformHelper = require('transformHelper.js');

var running = true;

function start() { //eslint-disable-line no-unused-vars
	var canvas = document.getElementById('canvas'); //eslint-disable-line no-undef
	var gl = canvas.getContext('experimental-webgl');
	canvas.width = 800;
	canvas.height = 600;

	var vshader = gl.createShader(gl.VERTEX_SHADER);
	var vsource = document.getElementById('2d-vertex-shader').text; //eslint-disable-line no-undef
	gl.shaderSource(vshader, vsource);
	gl.compileShader(vshader);
	if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
		throw new Error('could not compile shader:' + gl.getShaderInfoLog(vshader));
	}

	var fshader = gl.createShader(gl.FRAGMENT_SHADER);
	var fsource = document.getElementById('2d-fragment-shader').text; //eslint-disable-line no-undef
	gl.shaderSource(fshader, fsource);
	gl.compileShader(fshader);
	if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
		throw new Error('could not compile shader:' + gl.getShaderInfoLog(fshader));
	}

	var program = gl.createProgram();
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!success) {
		throw new Error('program filed to link:' + gl.getProgramInfoLog(program));
	}
	gl.useProgram(program);

	var apos = gl.getAttribLocation(program, 'a_position');
	var acolor = gl.getAttribLocation(program, 'a_color');

	gl.enableVertexAttribArray(apos);
	gl.enableVertexAttribArray(acolor);

	gl.enable(gl.DEPTH_TEST);
	// gl.enable(gl.CULL_FACE);

	gl.enable(gl.BLEND);
	gl.blendEquation(gl.FUNC_ADD);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	var positionBuffer = gl.createBuffer();
	var colorBuffer = gl.createBuffer();



	var pyramidTranslation = [0, 0, 0, 0];
	var pyramidRotation = [0, 0, 0, 0];
	var pyramidScale = [0, 0, 0, 0];
	var pyramid = new Pyramid(pyramidTranslation, pyramidRotation, pyramidScale);

	var cubeTranslation = [50, 50, 0, 0];
	var cubeRotation = [0, 0, 0, 0];
	var cubeScale = [0, 0, 0, 0];
	var cube = new Cube(cubeTranslation, cubeRotation, cubeScale);

	var positions = new Float32Array(pyramid.getPositions().concat(cube.getPositions()));
	var colors = new Float32Array(pyramid.getColors().concat(cube.getColors()));

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
	gl.vertexAttribPointer(acolor, 4, gl.FLOAT, false, 0, 0);

	var amvp = gl.getUniformLocation(program, 'mvp');
	if (amvp === -1) {
		throw new Error('Error during uniform address retrieval');
	}

	console.log('vertices', positions.length);
	console.log('colors', colors.length);
	console.log(positions.length / colors.length);
	setInterval(function () { draw(gl, amvp, positions.length); }, 50);
}

function draw(gl, amvp, totalVertices) {
	if (gl && running) {
		// Gets control value angles from HTML page via DOM
		var ax = parseInt(document.getElementById('ax').innerHTML, 10); //eslint-disable-line no-undef
		var ay = parseInt(document.getElementById('ay').innerHTML, 10); //eslint-disable-line no-undef
		var az = parseInt(document.getElementById('az').innerHTML, 10); //eslint-disable-line no-undef

		// Use increments via DOM to update angles (still in degrees)
		ax = (ax + parseInt(document.getElementById('dx').value, 10) + 360) % 360; //eslint-disable-line no-undef
		ay = (ay + parseInt(document.getElementById('dy').value, 10) + 360) % 360; //eslint-disable-line no-undef
		az = (az + parseInt(document.getElementById('dz').value, 10) + 360) % 360; //eslint-disable-line no-undef

		// Update HTML page with new values
		document.getElementById('ax').innerHTML = ax.toString(); //eslint-disable-line no-undef
		document.getElementById('ay').innerHTML = ay.toString(); //eslint-disable-line no-undef
		document.getElementById('az').innerHTML = az.toString(); //eslint-disable-line no-undef
		ax *= 2 * Math.PI / 360;
		ay *= 2 * Math.PI / 360;
		az *= 2 * Math.PI / 360;

			// Creates matrix using rotation angles
		var mat = transformHelper.makeRotationMatrix(ax, ay, az);

		// Sets the model-view-projections matrix in the shader
		gl.uniformMatrix4fv(amvp, false, mat);

		gl.clearColor(0.0, 0.0, 0.5, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, totalVertices / 3);
		//gl.drawArrays(gl.LINE_STRIP, 0, totalVertices / 3);
		gl.flush();
	}
}

start();
