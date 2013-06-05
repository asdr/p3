var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    UserRole = require('../core/UserRole'),
    User = require('../model/User');

var StudentController = (function() {

    function createStudent(student, callback) {

        if ( !student.email )
        {
            callback.call(this, false, {'message': 'Email is missing.'});
            return;
        }

        if (student.role) delete student.role;
        _.extend(student, { 'role': UserRole.Student });

        User.create( student, callback );
    }

    function bulkCreateStudent(students, callback) {
        var validStudents = [];
        for (var i=0, len=students.length; i<len; ++i) {
            if ( students[i].email )
            {
                if (students[i].role) delete students[i].role;
                _.extend(students[i], { 'role': UserRole.Student });

                validStudents.push( students[i] );
            }
        }

        if (validStudents.length > 0) {
            User.create( validStudents, callback );
        }
        else
        {
            callback.call(this, false, '{ "message": "Couldnt create students." }');
        }
    }

    function updateStudent(key, student, callback) {
        User.update(key, student, callback);
    }

    function removeStudent(key, student, callback) {
        User.remove(key, callback);
    }

    function getStudent(key, callback) {
        User.get(key, callback);
    }

    return {
        'createStudent': createStudent
        ,'bulkCreateStudent': bulkCreateStudent
        ,'updateStudent': updateStudent
        ,'removeStudent': removeStudent
        ,'getStudent': getStudent
    };

})();

module.exports = StudentController;
