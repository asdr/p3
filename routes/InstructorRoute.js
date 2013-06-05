var BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole'),
    InstructorController = require('../controllers/InstructorController');

var InstructorRoute = (function() {
    function create(req, res) {
        var instructors = req.body.instructors;

        console.log('Instructors: ', instructors);
        InstructorController.createInstructor(instructors, function(err, count) {
            console.log('args: ', arguments);
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send('{ "status": "OK" }');
            }
        });
    } 

    function remove(req, res) {
        var key = { '_id': req.params.instructor_id };
        
        InstructorController.removeInstructor(key, function(err, count) {
            console.log(arguments);
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                if ( count > 0) {
                    res.send('{ "status": "OK" }');
                }
                else
                {
                    res.send('{ "status": "error", "message": "not found!" }');
                }
            }
        });
    }

    function get(req, res) {
        console.log('get1: ', req.params );
        var key = { '_id': req.params.instructor_id };

        InstructorController.getInstructor(key, function(err, instructors) {
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                if (instructors && instructors.length > 0) {
                    res.send( JSON.stringify({ "status": "OK", "instructor": instructors[0] }) );
                }
            }
            else
            {
                res.send( JSON.stringify({ "status": "error", "error": err }) );
            }
        });
    }

    function list(req, res) {
        console.log('listttt');
        InstructorController.getInstructor({}, function(err, instructors) {
            console.log('ins args: ', arguments);
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                if (instructors) {
                    res.send( JSON.stringify({ "status": "OK", "instructors": instructors }) );
                }
            }
            else
            {
                res.send( JSON.stringify({ "status": "error", "error": err }) );
            }
        });
    }

    return {
        'create': create
        ,'get': get
        ,'remove': remove
        ,'list': list
    };

})();

module.exports = InstructorRoute;
