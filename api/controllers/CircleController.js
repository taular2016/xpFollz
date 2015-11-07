/**
 * CircleController
 *
 * @description :: Server-side logic for managing circles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	startRemoveTimer: function(request, response, next) {
		var circle = request.params.all();
		sails.io.sockets.in('game').emit('remove-circle', request.params.all());
		response.json(circle);
	}
};

