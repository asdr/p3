var Admin = require('../model/admin');

var AdminRoute = (function() {

    function _createAdmin(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        Admin.create( {
            'name': 'Serdar',
            'email': 'gokcen.serdar@gmail.com',
            'password': '123'
        }, 
        function(err, status) {
            res.send( JSON.stringify( status[0] ) );
        } );
    }

    function _deleteAdmin() {

    }

    return {
        'createAdmin': _createAdmin
    };

})();

module.exports = AdminRoute;
