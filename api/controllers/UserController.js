/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribeGame: function(request, response, next) {
		var socket = request.socket;
		socket.join('players');
		socket.join('game');
		return response.ok('Subscribed to rooms players and game!');
	},
	restartGame: function(request, response, next) {
		User.destroy().exec(function(error) {
			if (error) {
				return next(error);
			}
			Circle.destroy().exec(function(error) {
				if (error) {
					return next(error);
				}
				response.ok('Game restarted!');
			});
		});
	}
};