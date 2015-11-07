/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribePlayerList: function(request, response, next) {
		var socket = request.socket;
		socket.join('players');
		return response.ok('Subscribed to room players!');
	}
};