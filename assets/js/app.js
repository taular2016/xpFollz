$(document).on('ready', function() {
	var modal = $('.modal');
	var colorPicker = $('#color');
	var colorSelect = $('#color-select');
	var colorSelected = $('#color-selected');
	var boardContainer = $('.board-container');
	var board = $('.board');
	var timer = $('.timer');
	var players = $('.players');
	var user = $('#user');
	var loader = $('.progress');
	var startGameButton = $('.start-game-action');
	var onGame = false;
	var isColorSelected = false;
	var playerId;
	var playerColor;
	// CIRCLE FUNCTIONS
	var radius = 15;
	var centersCircles = [];
	var distanceBetweenPoints = function(p1, p2) {
		var distance = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
		return distance;
	};
	var drawCirle = function(circle) {
		var center = {
			x: circle.x,
			y: circle.y
		};
		var circleHTML = $('<div>');
		circleHTML.css({
			top: circle.y - radius,
			left: circle.x - radius
		});
		circleHTML.data('playerId', circle.playerId);
		circleHTML.data('id', circle.id, true);
		circleHTML[0].dataset.id = circle.id;
		circleHTML.addClass('circle');
		circleHTML.css('background-color', circle.color);
		board.append(circleHTML);
		centersCircles.push(center);
	};
	var startCircleRemoveTimer = function(circle) {
		var circleHTML = board.find('[data-id=' + circle.id + ']');
		var removeTimeLimit = 5;
		circleHTML.text(removeTimeLimit);
		var removeTimerInterval = setInterval(function() {
			removeTimeLimit--;
			circleHTML.text(removeTimeLimit);
			if (removeTimeLimit === 0) {
				var index = circleHTML.index();
				centersCircles.splice(index, 1);
				circleHTML.remove();
				$.ajax({
					url: '/circle/' + circleHTML.data('id'),
					method: 'DELETE'
				}).success(function(circle) {}).error(function() {
					alert('There was an error trying to remove circle.');
				});
				clearInterval(removeTimerInterval);
			}
		}, 1000);
	};
	var addCircle = function(event) {
		if (!onGame) {
			return;
		}
		var x = event.clientX + boardContainer.scrollLeft();
		var y = event.clientY + boardContainer.scrollTop();
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
			$.ajax({
				url: '/circle',
				method: 'POST',
				data: {
					x: x,
					y: y,
					playerId: playerId,
					color: playerColor
						// COMMENT: add how many circles
				}
			}).success(function(circle) {
				drawCirle(circle);
			}).error(function() {
				alert('There was an error trying to add circle.');
			});
		}
	};
	var removeCircle = function(event) {
		if (!onGame) {
			return;
		}
		event.preventDefault();
		event.cancelBubble = false;
		event.stopPropagation();
		var circleHTML = $(this);
		if (circleHTML.data('playerId') == playerId) {
			return;
		}
		$.ajax({
			url: '/circle/startRemoveTimer',
			method: 'POST',
			data: {
				id: circleHTML.data('id')
			}
		}).success(function(circle) {
			startCircleRemoveTimer(circle);
		}).error(function() {
			alert('There was an error trying to remove circle.');
		});
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
	var addPlayer = function(player) {
		var li = $('<li>');
		li.addClass('collection-item');
		li.css('color', player.color);
		li.text(player.name);
		players.append(li);
	};
	var startGame = function() {
		onGame = true;
		modal.closeModal();
		getPlayers();
		getCircles();
		setTimer();
		io.socket.post('/user/subscribeGame', function() {
			io.socket.on('new-player', function(user) {
				addPlayer(user);
			});
			io.socket.on('add-circle', function(circle) {
				if (circle.playerId != playerId) {
					drawCirle(circle);
				}
			});
			io.socket.on('remove-circle', function(circle) {
				startCircleRemoveTimer(circle);
			});
		});
	};
	var getCircles = function() {
		$.ajax({
			url: '/circle',
			method: 'GET'
		}).success(function(response) {
			for (var i = 0; i < response.length; i++) {
				drawCirle(response[i]);
			}
		}).error(function() {
			alert('An error has ocurred, please refresh the page.');
		});
	};
	var getPlayers = function() {
		$.ajax({
			url: '/user',
			method: 'GET'
		}).success(function(response) {
			for (var i = 0; i < response.length; i++) {
				addPlayer(response[i]);
			}
		}).error(function() {
			alert('An error has ocurred, please refresh the page.');
		});
	};
	var createPlayer = function() {
		if (!isColorSelected) {
			alert('You must select a color!');
			return;
		}
		loader.show();
		$.ajax({
			url: '/user',
			method: 'POST',
			data: {
				name: user.val(),
				color: colorSelected.css('background-color')
			}
		}).success(function(response) {
			loader.hide();
			playerId = response.id;
			playerColor = response.color;
			startGame();
		}).error(function() {
			loader.hide();
			alert('The user name is already in use, please select another one.');
		});
	};
	var selectColor = function(event) {
		var li = $(this);
		var color = li.css('background-color');
		colorSelected.css('background-color', color);
		isColorSelected = true;
	};
	startGameButton.on('click', createPlayer);
	board.on('click', addCircle);
	board.on('click', '.circle', removeCircle);
	loader.hide();
	modal.openModal({
		dismissible: false
	});
	colorSelect.dropdown();
	colorPicker.on('click', 'li', selectColor);
});