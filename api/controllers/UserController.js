/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var bcrypt = require('bcrypt');

module.exports = {
  
  signup: function (req, res) {
	User.createUser({
      username: req.param('username'),
      password: req.param('password')
    }, function (err, user) {
      if (err) return res.negotiate(err);

      return res.ok({success:'Signup successful!'});
    });
  },
  
  login: function (req, res) {
    User.findUser({
      username: req.param('username')
    }, async function (err, user) {
      if (err) return res.negotiate(err);
	  
	  if(user && (await bcrypt.compare(req.param('password'), user.password))) {
		return res.ok({token: jwTokenService.issueToken({id: user.id})});  
	  }
	  
	  return res.badRequest({error:'Invalid username/password combination.'})
    }); 
  },
  
  getLoggedUserInfo: function (req, res) {
	User.findUser({
	  id: req.id
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  if (!user) return res.notFound(err);
	  
	  return res.ok(User.removeSensitiveData(user));
	});
  }
};

