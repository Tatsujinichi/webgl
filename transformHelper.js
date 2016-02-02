exports.getRotation = function getRotation(rx, ry, rz) {
	var cx = Math.cos(rx), sx = Math.sin(rx);
	var cy = Math.cos(ry), sy = Math.sin(ry);
	var cz = Math.cos(rz), sz = Math.sin(rz);

	return new Float32Array(
		[cy * cz, (sx * sy * cz - cx * sz), (sx * sz + cx * sy * cz), 0,
		cy * sz, (sx * sy * sz + cx * cz), (cx * sy * sz - sx * cz), 0,
		-sy,   sx * cy,            cx * cy,            0,
		0,     0,                0,                1]);
};

exports.makeTranslation = function makeTranslation(tx, ty, tz) {
	return [
		1, 0, 0, tx,
		0, 1, 0, ty,
		0, 0, 1, tz,
		0, 0, 0, 1
	];
};

exports.makeScale = function makeScale(sx, sy, sz) {
	return [
		sx, 0, 0, 0,
		0, sy, 0, 0,
		0, 0, sz, 0,
		0, 0, 0, 1
  ];
};
