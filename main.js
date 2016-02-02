/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var model = __webpack_require__(1);
	__webpack_require__(2);
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

		var positions = model.positions;

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
		gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 3 * 4, 0);

		var colors = new Float32Array([
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
		]);

		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
		gl.vertexAttribPointer(acolor, 4, gl.FLOAT, false, 4 * 4, 0);

		var amvp = gl.getUniformLocation(program, 'mvp');
		if (amvp === -1) {
			throw new Error('Error during uniform address retrieval');
		}
		setInterval(function () { draw(gl, amvp); }, 50);
	}

	function draw(gl, amvp) {
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
			var mat = getTransformationMatrix(ax, ay, az);

			// Sets the model-view-projections matrix in the shader
			gl.uniformMatrix4fv(amvp, false, mat);

			gl.clearColor(0.0, 0.0, 0.5, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.flush();
		}
	}

	function getTransformationMatrix(rx, ry, rz) {
		var cx = Math.cos(rx), sx = Math.sin(rx);
		var cy = Math.cos(ry), sy = Math.sin(ry);
		var cz = Math.cos(rz), sz = Math.sin(rz);

		return new Float32Array(
			[cy * cz, (sx * sy * cz - cx * sz), (sx * sz + cx * sy * cz), 0,
			cy * sz, (sx * sy * sz + cx * cz), (cx * sy * sz - sx * cz), 0,
			-sy,   sx * cy,            cx * cy,            0,
			0,     0,                0,                1]);
	}

	function makeTranslation(tx, ty, tz) {
		return [
			1, 0, 0, tx,
			0, 1, 0, ty,
			0, 0, 1, tz,
			0, 0, 0, 1
		];
	}

	function makeScale(sx, sy, sz) {
		return [
			sx, 0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0, 1
	  ];
	}

	start();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var positions = new Float32Array([
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
	]);

	exports.positions = positions;


/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);