var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole'),
    Course = require('../model/User'),
    ClassList = require('../model/ClassList'),
    StudentController = require('./StudentController');

var ClassListController = (function() {

    function createClassList(course, students, callback) {

        StudentController.bulkCreateStudent(students, function(result) {
            var studentIds = [];
            for (var i=0, len=students.length; i<len; ++i) {
                studentIds.push( students[i]._id );
            }
            ClassList.create( { 'course': course._id, 'students': studentIds }, callback );
        });
    }

    function getClassList(course, callback) {
        ClassList.get({ 'course': course._id }, callback);
    }

    function addStudent(course, student, callback) {
        ClassList.get({ 'course': course._id }, function(classLists) {
            if (classLists && classLists.length > 0) {

                var classList = classLists[0];
                classList.students = _.union(classList.students, [ student._id ]);

            }
        });
    }

    function removeStudent(course, student) {
        
    }

    return {
        'createClassList': createClassList
        ,'getClassList': getClassList
        ,'addStudent': addStudent
        ,'removeStudent': removeStudent
    };

})();

module.exports = ClassListController;
