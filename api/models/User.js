/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  attributes: {
	
    username: {
      type: 'string',
      unique: true,
	  required: true
    },
	
    password: {
      type: 'string',
	  required: true
    }
  },
  
  beforeCreate: async function (inputs, cb) {
    try {
      inputs.password = await bcrypt.hash(inputs.password, saltRounds);
      cb();
	} catch (err) {
	  return cb(err);
	}
  },
  
  createUser: function (inputs, cb) {
    User.create({
      username: inputs.username,
      password: inputs.password
    })
    .exec(cb);
  },
  
  findUser: function (inputs, cb) {
    User.findOne(inputs).exec(cb);
  },
  
  removeSensitiveData : function (user) {
	  delete user.password
	  return user;
  }
};

