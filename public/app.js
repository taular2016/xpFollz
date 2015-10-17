$(document).on('ready', function() {
	var board = $('.board');
	var timer = $('.timer');
	var addCircle = function(event) {
		var x = event.clientX;
		var y = event.clientY;
		var circle = $('<div>');
		circle.css({
			top: y - 15,
			left: x - 15
		});
		circle.addClass('circle');
		board.append(circle);
	};
	board.on('click', addCircle);
});