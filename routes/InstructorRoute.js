var BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole');

var InstructorRoute = (function() {
    function _createInstructor(req, res) {
        res.setHeader('Content-Type', 'application/json');

        if ( !req.body.email || !req.body.password )
        {
            res.send( "{ 'error': true, 'message': 'Email or password is missing' }" );
            return;
        }

        User.create( {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'password': req.body.password,
            'role': UserRole.Instructor
        }, 
        function(err, status) {
            res.send( JSON.stringify( status[0] ) );
        } );
    }

    function _listInstructors(req, res) {
        res.setHeader('Content-Type', 'application/json');
        User.get({ 'role': UserRole.Instructor }, function(err, items) {
            res.send( JSON.stringify( items ) );
        });
    }

    function _removeInstructor(req, res) {
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
        'createInstructor': _createInstructor,
        'listInstructors': _listInstructors,
        'removeInstructor': _removeInstructor
    };

})();

module.exports = InstructorRoute;
