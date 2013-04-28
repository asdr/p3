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

	function signout( req, res ) {
		Auth.signout( function(err, status) {
			if ( status === true )
			{
				res.setHeader('Content-Type', 'application/json');
				res.send("{ 'status': 'ok' }");
			}
			else
			{
				res.setHeader('Content-Type', 'application/json');
				res.send("{ 'error': true }");
			}
		} );
	}

	return {
		'signin': signin,
		'signup': signup,
		'signout': signout
	};

})();

module.exports = AuthRoute;
