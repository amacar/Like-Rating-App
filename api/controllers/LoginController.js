/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
    
  login: function (req, res) {
    var username = req.param('username'),
    password = req.param('password');
    if(!username || !password) {
      return res.badRequest({error:'Required parameters missing.'});
    }
	  
    User.findUser({
      username: username
    }, async function (err, user) {
      if (err) return res.negotiate(err);
	  
	  if(user && (await User.comparePassword(password, user.password))) {
		return res.ok({token: jwTokenService.issueToken({id: user.id})});  
	  }
	  
	  return res.badRequest({error:'Invalid username/password combination.'})
    }); 
  },
};

