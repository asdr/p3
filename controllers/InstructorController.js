var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    UserRole = require('../core/UserRole'),
    User = require('../model/User');

var InstructorController = (function() {

    function createInstructor(instructor, callback) {

        console.log(instructor.toString());
        if ( instructor.length > 1 )
        {
            bulkCreateInstructor(instructor, callback);
        }
        else
        {
            if ( !instructor[0].email )
            {
                callback.call(this, true, {'message': 'Email is missing.'});
                return;
            }

            if (instructor[0].role) delete instructor[0].role;
            _.extend(instructor[0], { 'role': UserRole.Instructor });

            User.create( instructor[0], callback );
        }
    }

    function bulkCreateInstructor(instructors, callback) {
        var validInstructors = [];
        for (var i=0, len=instructors.length; i<len; ++i) {
            if ( instructors[i].email )
            {
                if (instructors[i].role) delete instructors[i].role;
                _.extend(instructors[i], { 'role': UserRole.Instructors });

                validInstructors.push( instructors[i] );
            }
        }

        if (validInstructors.length > 0) {
            User.create( validInstructors, callback );
        }
        else
        {
            callback.call(this, true, { 'message': 'There is no valid admin entry.' });
        }
    }

    function updateInstructor(key, instructor, callback) {
        key.role = UserRole.Instructor;
        User.update(key, instructor, callback);
    }

    function removeInstructor(key, instructor, callback) {
        key.role = UserRole.Instructor;
        User.remove(key, callback);
    }

    function getInstructor(key, callback) {
        key.role = UserRole.Instructor;
        User.get(key, callback);
    }

    return {
        'createInstructor': createInstructor
        ,'updateInstructor': updateInstructor
        ,'removeInstructor': removeInstructor
        ,'getInstructor': getInstructor
    };

})();

module.exports = InstructorController;
