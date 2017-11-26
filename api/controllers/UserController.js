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
    var username = req.param('username'),
    password = req.param('password');
    if(!username || !password) {
      return res.badRequest({error:'Required parameters missing.'});
    }
	
	User.createUser({
      username: username,
      password: password
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
    var password = req.param('password');
    if(!password) {
      return res.badRequest({error:'Required parameters missing.'});
    }
	
    User.updatePassword({
	  id: req.id,
	  password: password
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  
	  return res.ok({success: "Password changed successfully."});
	});
  },
  
  likeUser: function (req, res) {
    var id = req.param('id')
	if(req.id == id) return res.badRequest({error: "You can't like yourself!"});
	
	User.findUser({
	  id: id
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  if (!user) return res.notFound({error: "User does not exists."});
    
	  Like.likeUser({
	    from: req.id,
	    to: id,
	    toUsername: user.username
	  }, function (err, like) {
	    if (err) return res.negotiate(err);
	  
	    return res.ok({success: "User liked successfully."});
	  });
	}); 
  },
  
  unlikeUser: function (req, res) {
    var id = req.param('id')
    Like.unlikeUser({
	  from: req.id,
	  to: id
	}, function (err, like) {
	  if (err) return res.negotiate(err);
	  
	  return res.ok({success: "User unliked successfully."});
	});
  },
  
  getUserLikes: function (req, res) {
    var id = req.param('id')
    User.findUser({
	  id: id
	}, function (err, user) {
	  if (err) return res.negotiate(err);
	  if (!user) return res.notFound({error: "User does not exists."});
	  
	  Like.countLikes({to: id}, function (err, count) {
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

