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
    User.findUser({
      username: req.param('username')
    }, async function (err, user) {
      if (err) return res.negotiate(err);
	  
	  if(user && (await User.comparePassword(req.param('password'), user.password))) {
		return res.ok({token: jwTokenService.issueToken({id: user.id})});  
	  }
	  
	  return res.badRequest({error:'Invalid username/password combination.'})
    }); 
  },
};

