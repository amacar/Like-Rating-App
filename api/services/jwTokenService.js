var jwt = require('jsonwebtoken');
var tokenSecret = 'topsecret';

module.exports.issueToken = function(payload, options) {
  return token = jwt.sign(payload, tokenSecret, {expiresIn: '6h'});
};

module.exports.verifyToken = function(token, callback) {
  return jwt.verify(token, tokenSecret, {}, callback);
};