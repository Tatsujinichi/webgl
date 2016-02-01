

function start() {
	var canvas = document.getElementById('canvas');
	var gl = canvas.getContext('experimental-webgl');

	var vshader = gl.createShader(gl.VERTEX_SHADER);
	var vsource = document.getElementById('2d-vertex-shader').text;
	gl.shaderSource(vshader, vsource);
	gl.compileShader(vshader);
	if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
		throw "could not compile shader:" + gl.getShaderInfoLog(vshader);
	}

	var fshader = gl.createShader(gl.FRAGMENT_SHADER);
	var fsource = document.getElementById('2d-fragment-shader').text;
	gl.shaderSource(fshader, fsource);
	gl.compileShader(fshader);
	if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
		throw "could not compile shader:" + gl.getShaderInfoLog(fshader);
	}

	var program = gl.createProgram();
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!success) {
		throw ("program filed to link:" + gl.getProgramInfoLog (program));
	}
	gl.useProgram(program);

	var apos = gl.getAttribLocation(program, 'a_position');
	gl.enableVertexAttribArray(apos);
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	var vertices = new Float32Array([0.0, 0.8, 0.0, -0.8, -0.8, 0.0, 0.8, -0.8, 0.0]);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 0, 0);

	var amvp = gl.getUniformLocation(program, 'mvp');
	if(amvp === -1) {
		throw ('Error during uniform address retrieval');
	}

	setInterval(function () { draw(gl) }, 200);
}

function draw(gl)
{
	gl.clearColor(0.0, 0.0, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	gl.flush();
}

function getTransformationMatrix(rx, ry, rz)
{
	var cx = Math.cos(rx), sx = Math.sin(rx);
	var cy = Math.cos(ry), sy = Math.sin(ry);
	var cz = Math.cos(rz), sz = Math.sin(rz);

	return new Float32Array(
		[cy*cz, (sx*sy*cz-cx*sz), (sx*sz+cx*sy*cz), 0,
		cy*sz, (sx*sy*sz+cx*cz), (cx*sy*sz-sx*cz), 0,
		-sy,   sx*cy,            cx*cy,            0,
		0,     0,                0,                1]);
}
