exports.makeRotationMatrix = function makeRotationMatrix(rx, ry, rz) {
	var cx = Math.cos(rx), sx = Math.sin(rx);
	var cy = Math.cos(ry), sy = Math.sin(ry);
	var cz = Math.cos(rz), sz = Math.sin(rz);

	return new Float32Array(
		[cy * cz, (sx * sy * cz - cx * sz), (sx * sz + cx * sy * cz), 0,
		cy * sz, (sx * sy * sz + cx * cz), (cx * sy * sz - sx * cz), 0,
		-sy,   sx * cy,            cx * cy,            0,
		0,     0,                0,                1]);
};

exports.makeTranslationMatrix = function makeTranslationMatrix(tx, ty, tz) {
	return [
		1, 0, 0, tx,
		0, 1, 0, ty,
		0, 0, 1, tz,
		0, 0, 0, 1
	];
};

exports.makeScaleMatrix = function makeScaleMatrix(sx, sy, sz) {
	return [
		sx, 0, 0, 0,
		0, sy, 0, 0,
		0, 0, sz, 0,
		0, 0, 0, 1
  ];
};

exports.makeTransformationMatrix = function makeTransformationMatrix(translation, rotation, scale) {
	var tr = this.matMultiply4x4(translation, rotation);
	return this.matMultiply4x4(tr, scale);
};

// not the fastest out there
exports.matMultiply4x4 = function matMultiply4x4(matA, matB) {
	var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // so we don't have to change array size.
	var count = 0;
	var sum = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			for (var k = 0; k < 3; k++) {
				sum += matA[i * 4 - k] * matB[k * 4 - j]; // 4 is the number of items in a row.
			}
			result[count] = sum;
			sum = 0;
			count++;
		}
	}
	return result;
};
