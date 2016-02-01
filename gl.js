

function start() {
	var canvas = document.getElementById('canvas');
	var gl = canvas.getContext('experimental-webgl');

	var vshader = gl.createShader(gl.VERTEX_SHADER);
	var vsource = document.getElementById('2d-vertex-shader').text;
	gl.shaderSource(vshader, vsource);
	gl.compileShader(vshader)
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
        // something went wrong with the link
        throw ("program filed to link:" + gl.getProgramInfoLog (program));
    }
	gl.useProgram(program);

	gl.clearColor(1.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);


	var apos = gl.getAttribLocation(program, 'a_position');
	var uscale = gl.getUniformLocation(program, 'u_scale');
	var urotate =  gl.getUniformLocation(program, 'u_rotate');
	var utranslate =  gl.getUniformLocation(program, 'u_translate');
	var uperspective = gl.getUniformLocation(program, 'u_perspective');


	gl.enableVertexAttribArray(apos);
	gl.vertexAttribPointer(apos, 3, gl.FLOAT, false, 0, 0);



	draw(gl, uscale, urotate, utranslate);

}

function draw(gl, scale, rotate, translate) {
	// gl.uniform4fv(scale, [0, 0, 0]);
	// gl.uniform4fv(rotate, [0, 0, 0]);
	// gl.uniform4fv(translate, [0, 0, 0]);


	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	var vertices = new Float32Array([
		0.0, 0.8, 0.0,
		-0.8, -0.8, 0.0,
		0.8, -0.8, 0.0,

		0.0, -0.8, -8.0,
		0,0, 0.0, 0.8,
		-0.8, -0.8, 0.0,

		0.0, 0.8, 0.0,
		0.8, -0.8, 0.0,
		0,0, -0.8, -0.8
	]);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}


function makeTranslation(tx, ty, tz) {
	return [
 	1, 0, 0, tx,
	0, 1, 0, ty,
	0, 0, 1, tz,
	0, 0, 0, 1
	];
}

function makeRotation(angleYZ, angleXZ, angleXY) {
	var cosPhi = Math.cos(angleYZ);
	var sinPhi = Math.sin(angleYZ);

	var cosTheta = Math.cos(angleXZ);
	var sinTheta = Math.sin(angleXZ);

	var cosPsi = Math.cos(angleXY);
	var sinPsi = Math.sin(angleXY);

	return [
		cosTheta * cosPsi, cosPhi * sinPsi + sinPhi * sinTheta * cosPsi, sinPhi * sinPsi - cosPhi * sinTheta * cosPsi, 0,
		-cosTheta * sinPsi, cosPhi * cosPsi - sinPhi * sinTheta * sinPsi, sinPhi * cosPsi + cosPhi * sinTheta * sinPsi, 0,
		sinTheta, -sinPhi * cosTheta, cosPhi * cosTheta, 0,
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
