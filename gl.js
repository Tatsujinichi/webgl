

function start() {
	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext("experimental-webgl");

	var shader = gl.createShader(gl.VERTEX_SHADER);
	var vs = document.getElementById("2d-vertex-shader");

	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	var vs = document.getElementById("2d-fragment-shader");

}
