var BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole');

var StudentRoute = (function() {
    function _createStudent(req, res) {
        res.setHeader('Content-Type', 'application/json');

        if ( !req.body.email )
        {
            res.send( "{ 'error': true, 'message': 'Email is missing' }" );
            return;
        }

        User.create( {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'role': UserRole.Student
        }, 
        function(err, status) {
            res.send( JSON.stringify( status[0] ) );
        } );
    }

    function _listStudents(req, res) {
        res.setHeader('Content-Type', 'application/json');
        User.get({ 'role': UserRole.Student }, function(err, items) {
            res.send( JSON.stringify( items ) );
        });
    }

    function _removeStudent(req, res) {
        var id = req.params.id || '000000000000';

        res.setHeader('Content-Type', 'application/json');
        User.remove({ '_id': new BSON.ObjectID(id) }, function(err, doc) {
            if (!err)
            {
                res.send( "{ 'status': 'ok', 'message': 'Remove successful' }" );
            }
        });
    }

    return {
        'createStudent': _createStudent,
        'listStudents': _listStudents,
        'removeStudent': _removeStudent
    };

})();

module.exports = StudentRoute;
