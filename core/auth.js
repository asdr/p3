var DBConnector = require('./dbconnector').getInstance();

var Auth = (function() {

	function signin( data ) {
		DBConnector.db();
		DBConnector.close();
		
		if ( !(data && data['username'] && data['password']) )
			return false;

		// check if the user has right to access
		if ( data.username === 'asdr' && data.password === '123' )
			return true;

		return false;
	}

	function signup( data ) {
		if ( !data )
			return false;
	}

	return {
		'signin': signin,
		'signup': signup
	};

})();

module.exports = Auth;
