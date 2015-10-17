$(document).ready(function() {
	$('.exercise .title').on('click', function(){
		$(this).parent().find('.content').slideToggle();
	});
	$('#code0A').text('var code0A = function(){\n   return holaMundo;\n};\nvar holaMundo="Hola mundo!";');
	var code = $('#code0A').val();
	eval(code);
	QUnit.test('Code 0A', function(assert) {
		assert.equal(code0A(), 'Hola mundo!');
	});
	$('#run0A').on('click', function() {
		var code = $('#code0A').val();
		eval(code);
		QUnit.test('Code 0A', function(assert) {
			assert.equal(code0A(), 'Hola mundo!');
		});
	});
	$('#code0B').text('var code0B = function(){\n   return "Error!";\n};');
	var code = $('#code0B').val();
	eval(code);
	QUnit.test('Code 0B', function(assert) {
		assert.equal(code0B(), 'Correcto!');
	});
	$('#run0B').on('click', function() {
		var code = $('#code0B').val();
		eval(code);
		QUnit.test('Code 0B', function(assert) {
			assert.equal(code0B(), 'Correcto!');
		});
	});
	$('#run01').on('click', function() {
		var code = $('#code01').val();
		eval(code);
		QUnit.test('Code 01', function(assert) {
			assert.equal(code01([50], 0).toString(), [1].toString());
			assert.equal(code01([1, 1, 1], 5).toString(), [1, 1, 1].toString());
			assert.equal(code01([0, 1, 2, 3], 2).toString(), [0, 1, 4, 9].toString());
			assert.equal(code01([10, 100], 3).toString(), [1000, 1000000].toString());
		});
	});
	$('#run02').on('click', function() {
		var code = $('#code02').val();
		eval(code);
		QUnit.test('Code 02', function(assert) {
			assert.equal(code02([1, 2, 3, 4]).toString(), [4, 3, 2, 1].toString());
			assert.equal(code02([1, 1, '2,3']).toString(), ['2,3', 1, 1].toString());
		});
	});
	$('#run03').on('click', function() {
		var code = $('#code03').val();
		eval(code);
		QUnit.test('Code 03', function(assert) {
			assert.equal(code03([1, 2, 3, 7]).toString(), (1).toString());
			assert.equal(code03([10, -1, 0]).toString(), (-1).toString());
			assert.equal(code03([1, 2, 1]).toString(), (1).toString());
		});
	});
	$('#run04').on('click', function() {
		var code = $('#code04').val();
		eval(code);
		QUnit.test('Code 04', function(assert) {
			assert.equal(code04([
				[1, 2, 3],
				[8, 9, 4],
				[7, 6, 5]
			]), '1 2 3 4 5 6 7 8 9');
			assert.equal(code04([
				['H', 'O'],
				['A', 'L']
			]), 'H O L A');
			assert.equal(code04([
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
				[13, 14, 15, 16]
			]), '1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10');
		});
	});
	$('#run05').on('click', function() {
		var code = $('#code05').val();
		eval(code);
		QUnit.test('Code 05', function(assert) {
			assert.equal(code05(0), '1');
			assert.equal(code05(1), '1 1');
			assert.equal(code05(2), '1 2 1');
			assert.equal(code05(3), '1 3 3 1');
			assert.equal(code05(4), '1 4 6 4 1');
			assert.equal(code05(5), '1 5 10 10 5 1');
			assert.equal(code05(6), '1 6 15 20 15 6 1');
			assert.equal(code05(7), '1 7 21 35 35 21 7 1');
			assert.equal(code05(8), '1 8 28 56 70 56 28 8 1');
			assert.equal(code05(9), '1 9 36 84 126 126 84 36 9 1');
		});
	});
});