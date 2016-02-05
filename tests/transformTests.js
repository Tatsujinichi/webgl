var assert = require('assert');
var util = require('util');
var transformHelper = require('../transformHelper.js');

var matA = [
	1,2,3,4,
	5,6,7,8,
	9,10,11,12,
	13,14,15,16
];
var matB = [
	17,18,19,20,
	21,22,23,24,
	25,26,27,28,
	29,30,31,32
];
var matR = [
	250,260,270,280,
	618,644,670,696,
	986,1028,1070,1112,
	1354,1412,1470,1528
];
describe('#Test Rotation', function () {
	before(function () {

	});
});

describe('#Test Translation', function () {

});

describe('#Test Scale', function () {

});

describe('#Test Transform', function () {

});

describe('#Test Multiply', function () {
	var result = transformHelper.matMultiply4x4(matA, matB);
	console.log(matA);
	console.log(matB);
	console.log(result);
});


// exports.makeRotationMatrix = function makeRotationMatrix(rx, ry, rz) {
// exports.makeTranslationMatrix = function makeTranslationMatrix(tx, ty, tz) {
// exports.makeScaleMatrix = function makeScaleMatrix(sx, sy, sz) {
// exports.makeTransformationMatrix = function makeTransformationMatrix(translation, rotation, scale) {
// exports.matMultiply4x4 = function matMultiply4x4(matA, matB) {
