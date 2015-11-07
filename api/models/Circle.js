/**
 * Circle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		x: {
			type: 'string'
		},
		y: {
			type: 'string'
		},
		color: {
			type: 'string'
		},
		playerId: {
			type: 'string'
		}
	},
	afterCreate: function(circle, next) {
		sails.io.sockets.in('game').emit('add-circle', circle);
		next();
	}
};