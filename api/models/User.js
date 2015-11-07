/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    color: {
      type: 'string',
      required: true
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    }
  },
  afterCreate: function(user, next) {
    sails.io.sockets.in('players').emit('new-player', user);
    next();
  }
};