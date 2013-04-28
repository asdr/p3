var BSON = require('mongodb').BSONPure,
    Admin = require('../model/admin');

var AdminRoute = (function() {

    function _create(req, res) {
        res.setHeader('Content-Type', 'application/json');

        if ( !req.body.email || !req.body.password )
        {
            res.send( "{ 'error': true, 'message': 'Email or password is missing' }" );
            return;
        }

        Admin.create( {
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.password
        }, 
        function(err, status) {
            res.send( JSON.stringify( status[0] ) );
        } );
    }

    function _list(req, res) {
        res.setHeader('Content-Type', 'application/json');
        Admin.get({}, function(err, items) {
            res.send( JSON.stringify( items ) );
        });
    }

    function _removeOne(req, res) {
        var id = req.params.id || '000000000000';

        res.setHeader('Content-Type', 'application/json');
        Admin.remove({ '_id': new BSON.ObjectID(id) }, function(err, doc) {
            if (!err)
            {
                res.send( "{ 'status': 'ok', 'message': 'Remove successful' }" );
            }
        });
    }

    function _removeAll(req, res) {
        res.setHeader('Content-Type', 'application/json');
        Admin.remove({}, function(err, doc) {
            if (!err)
            {
                res.send( "{ 'status': 'ok', 'message': 'Remove all successful' }" );
            }
        });
    }

    return {
        'create': _create,
        'list': _list,
        'remove': _removeOne,
        'removeAll': _removeAll
    };

})();

module.exports = AdminRoute;
