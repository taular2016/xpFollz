$(document).on('ready', function() {
	var modal = $('.modal');
	var board = $('.board');
	var timer = $('.timer');
	var players = $('.players');
	var user = $('#user');
	var loader = $('.progress');
	var startGameButton = $('.start-game-action');
	var onGame = false;
	// CIRCLE FUNCTIONS
	var radius = 15;
	var centersCircles = [];
	var distanceBetweenPoints = function(p1, p2) {
		var distance = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
		return distance;
	};
	var addCircle = function(event) {
		if (!onGame) {
			return;
		}
		var x = event.clientX;
		var y = event.clientY;
		var canAddToBoard = true;
		var center = {
			x: x,
			y: y
		};
		var diameter = 2 * radius;
		for (var i = 0; i < centersCircles.length; i++) {
			if (distanceBetweenPoints(centersCircles[i], center) <= diameter) {
				canAddToBoard = false;
				break;
			}
		}
		if (canAddToBoard) {
			var circle = $('<div>');
			circle.css({
				top: y - radius,
				left: x - radius
			});
			circle.addClass('circle');
			circle.addClass('blue');
			board.append(circle);
			centersCircles.push(center);
		}
	};
	var removeCircle = function(event) {
		if (!onGame) {
			return;
		}
		event.preventDefault();
		event.cancelBubble = false;
		event.stopPropagation();
		var circle = $(this);
		var removeTimeLimit = 5;
		circle.text(removeTimeLimit);
		var removeTimerInterval = setInterval(function() {
			removeTimeLimit--;
			circle.text(removeTimeLimit);
			if (removeTimeLimit === 0) {
				var index = circle.index();
				centersCircles.splice(index, 1);
				circle.remove();
				clearInterval(removeTimerInterval);
			}
		}, 1000);
	};
	// TIMER FUNCTIONS
	var formatTime = function(time) {
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		var formattedTime = '';
		if (minutes < 10) {
			formattedTime += '0';
		}
		formattedTime += minutes + ':';
		if (seconds < 10) {
			formattedTime += '0';
		}
		formattedTime += seconds;
		return formattedTime;
	};
	var setTimer = function() {
		var time = 0;
		var timeLimit = 180;
		var timerInterval = setInterval(function() {
			timer.text(formatTime(time));
			time++;
			if (time > timeLimit) {
				onGame = false;
				clearInterval(timerInterval);
			}
		}, 1000);
	};
	// START GAME FUNCTIONS
	var startGame = function() {
		onGame = true;
		modal.closeModal();
		getPlayers();
		setTimer();
		io.socket.post('/user/subscribePlayerList', function() {
			io.socket.on('new-player', function(user) {
				var li = $('<li>');
				li.addClass('collection-item');
				li.text(user.name);
				players.append(li);
			});
		});
	};
	var getPlayers = function() {
		$.ajax({
			url: '/user',
			method: 'GET'
		}).success(function(response) {
			for (var i = 0; i < response.length; i++) {
				var li = $('<li>');
				li.addClass('collection-item');
				li.text(response[i].name);
				players.append(li);
			}
		}).error(function() {
			alert('An error has ocurred, please refresh the page.');
		});
	};
	var createPlayer = function() {
		loader.show();
		$.ajax({
			url: '/user',
			method: 'POST',
			data: {
				name: user.val()
			}
		}).success(function() {
			loader.hide();
			startGame();
		}).error(function() {
			loader.hide();
			alert('The user name is already in use, please select another one.');
		});
	};
	startGameButton.on('click', createPlayer);
	board.on('click', addCircle);
	board.on('click', '.circle', removeCircle);
	loader.hide();
	modal.openModal({
		dismissible: false
	});
});