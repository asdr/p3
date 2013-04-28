var Auth = require('../core/auth');

var AuthRoute = (function() {

	function signin( req, res ) {
		Auth.signin( req.body, function(err, object) {
			//if (!err)
			//{
				res.setHeader('Content-Type', 'application/json');
				res.send( JSON.stringify( object ) );
			//}
		});
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
