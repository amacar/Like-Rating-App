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
  
  signup: function (req, res) {
	User.createUser({
      username: req.param('username'),
      password: req.param('password')
    }, function (err, user) {
      if (err) return res.negotiate(err);

      return res.ok({success:'Signup successful!'});
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
  },
  
  updatePassword: function (req, res) {
    User.updatePassword({
	  id: req.id,
	  password: req.param('password')
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  
	  return res.ok({success: "Password changed successfuly."});
	});
  },
  
  likeUser: function (req, res) {
	if(req.id == req.param('id')) return res.badRequest({error: "You can't like yourself!"});
	
	User.findUser({
	  id: req.param('id')
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  if (!user) return res.notFound(err);
    
	  Like.likeUser({
	    from: req.id,
	    to: req.param('id'),
	    toUsername: user.username
	  }, function (err, like) {
	    if (err) return res.negotiate(err);
	  
	    return res.ok({success: "User liked successfully."});
	  });
	}); 
  },
  
  unlikeUser: function (req, res) {
    Like.unlikeUser({
	  from: req.id,
	  to: req.param('id')
	}, function (err, like) {
	  if (err) return res.negotiate(err);
	  
	  return res.ok({success: "User unliked successfully."});
	});
  },
  
  getUserLikes: function (req, res) {
    User.findUser({
	  id: req.param('id')
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  if (!user) return res.notFound(err);
	  
	  Like.count({to: req.param('id')}).exec(function (err, count) {
		if (err) return res.negotiate(err);
		
	    return res.ok({username: user.username, count: count}); 
	  });
	}); 
  },
  
  getMostLiked: function (req, res) {
    Like.getMostLiked(function(err, results) {
	  if (err) return res.negotiate(err);
	  
	  return res.ok(results);
	});
  }
};

