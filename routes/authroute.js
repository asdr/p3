var Auth = require('../core/auth');

var AuthRoute = (function() {

	function signin( req, res ) {
		res.send (Auth.signin({}));
	}

	function signup( req, res ) {
		res.send (Auth.signup({}));
	}

	return {
		'signin': signin,
		'signup': signup
	};

})();

module.exports = AuthRoute;
