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
	inputs.password  = await this.encryptPassword(inputs.password);
	if(inputs.password instanceof Error) {
	  cb(password);
	}
    cb();
  },
  
  createUser: function (inputs, cb) {
    User.create({
      username: inputs.username,
      password: inputs.password
    }).exec(cb);
  },
  
  findUser: function (inputs, cb) {
    User.findOne(inputs).exec(cb);
  },
  
  updatePassword: async function (inputs, cb) {
    inputs.password = await this.encryptPassword(inputs.password);
	
	User.update({
	  id: inputs.id
	}, {
	  password: inputs.password
	}).exec(cb);
  },
  
  removeSensitiveData : function (user) {
	delete user.password
	return user;
  },
  
  encryptPassword: function (password) {
	try {
      return bcrypt.hash(password, saltRounds);
	} catch (err) {
	  return err;
	}
  },
  
  comparePassword: function (password, hash) {
    return bcrypt.compare(password, hash);
  }
};

