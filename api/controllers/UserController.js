/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  
  signup: async function (req, res) {
	try {
      const hash = await bcrypt.hash(req.param('password'), saltRounds);
	  
	  User.signup({
        username: req.param('username'),
        password: hash
      }, function (err, user) {

        if (err) return res.negotiate(err);

        return res.ok('Signup successful!');
      });
	} catch (err) {
	  return res.serverError(err);
	}
  }
};

