var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    UserRole = require('../core/UserRole'),
    User = require('../model/User');

var InstructorController = (function() {

    function createInstructor(instructor, callback) {

        if ( !instructor.email )
        {
            res.send( "{ 'error': true, 'message': 'Email is missing' }" );
            return;
        }

        if (instructor.role) delete instructor.role;
        _.extend(instructor, { 'role': UserRole.Instructor });

        User.create( instructor, callback );
    }

    function updateInstructor(key, instructor, callback) {
        User.update(key, instructor, callback);
    }

    function removeInstructor(key, instructor, callback) {
        User.remove(key, callback);
    }

    function getInstructor(key, callback) {
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
