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
	}
};