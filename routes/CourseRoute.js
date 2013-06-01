var BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole');

var CourseRoute = (function() {
    function _createCourse(req, res) {
        res.setHeader('Content-Type', 'application/json');

        if ( !req.body.course_code 
            || !req.body.course_name 
            || !req.body.course_year 
            || !req.body.course_semester )
        {
            res.send( "{ 'error': true, 'message': 'Code, Name, Year or Semester is missing' }" );
            return;
        }

        Course.create( {
            'code': req.body.course_code,
            'name': req.body.course_name,
            'year': req.body.course_year,
            'semester': req.body.course_semester,
            'instructor': req.body.course_instructor
        }, 
        function(err, status) {
            res.send( JSON.stringify( status[0] ) );
        } );
    }

    function _listCourses(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var key = {};
        if (req.params.course_name)
        {
            key.course_name = req.body.course_name;
        }
        Course.get(key, function(err, items) {
            res.send( JSON.stringify( items ) );
        });
    }

    function _removeCourse(req, res) {
        var id = req.body.id || '000000000000';

        res.setHeader('Content-Type', 'application/json');
        Course.remove({ '_id': new BSON.ObjectID(id) }, function(err, doc) {
            if (!err)
            {
                res.setHeader('Content-Type', 'application/json');
                res.send( "{ 'status': 'OK', 'message': 'Remove successful' }" );
            }
        });
    }

    return {
        'createCourse': _createCourse,
        'listCourses': _listCourses,
        'removeCourse': _removeCourse
    };

})();

module.exports = CourseRoute;
