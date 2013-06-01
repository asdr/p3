var Auth = require('../core/auth'),
    UserRole = require('../core/UserRole');

var AuthRoute = (function() {

    function signin( req, res ) {
        res.setHeader('Content-Type', 'application/json');
        
        if (typeof req.session.user === 'undefined') {
            Auth.signin( req.body, function(err, object) {

                if (err === false)
                {
                    req.session.regenerate(function() {
                        req.session.user = object;
                        res.send( JSON.stringify( { 'status': 'OK', 'user': object } ) );
                    });
                }
                else
                {
                    res.send( JSON.stringify( { 'error': err, 'message': object.message } ) );
                }
            });
        }
        else
        {
            res.send( JSON.stringify( { 'error': true, 'message': 'User already logged in.'} ) );
        }
    }

    function signout( req, res ) {
        req.session.destroy(function() {
            res.setHeader('Content-Type', 'application/json');
            res.send('{ "status": "OK" }');
        });
    }

    return {
        'signin': signin,
        'signout': signout
    };

})();

module.exports = AuthRoute;
