var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole'),
    User = require('../model/User'),
    ClassList = require('../model/ClassList'),
    StudentController = require('./StudentController');

var ClassListController = (function() {

    function createClassList(course, students, callback) {

        StudentController.bulkCreateStudent(students, function(result) {
            var studentIds = [];
            for (var i=0, len=students.length; i<len; ++i) {
                studentIds.push( students[i]._id );
            }
            ClassList.remove({ 'course': new BSON.ObjectID(course._id) }, function() {
                ClassList.create( { 'course': new BSON.ObjectID(course._id), 'students': studentIds }, callback );    
            });
        });
    }

    function getClassList(course, callback) {
        console.log('course: ', course);
        ClassList.get({ 'course': new BSON.ObjectID(course._id) }, callback);
    }

    function addStudent(course, student, callback) {
        ClassList.get({ 'course': course._id }, function(classLists) {
            if (classLists && classLists.length > 0) {

                var classList = classLists[0];
                classList.students = _.union(classList.students, [ student._id ]);

            }
        });
    }

    function removeStudent(course, student, callback) {
        callback.call( this, true, 'not implemented!');
    }

    function hasStudent(student, callback) {
        ClassList.get({}, function(err, classLists) {
            if (classLists && classLists.length > 0) {
                var courses = [];
                for (var i=0; i<classLists.length; ++i) {
                    for (var k=0; k<classLists[i].students.length; ++k) {
                        if (classLists[i].students[k].toString() == student._id.toString()) {
                            courses.push(classLists[i].course);
                            break;
                        }
                    }
                }

                var qC = courses.map(function(c) { return { '_id': c }; }),
                    query = { $or: qC };
                Course.get(query, function(err, theCourses) {
                    console.log('tc: ', theCourses);
                    callback.call(this, false, theCourses);
                });
            }
        });
    }

    return {
        'createClassList': createClassList
        ,'getClassList': getClassList
        ,'addStudent': addStudent
        ,'removeStudent': removeStudent
        ,'hasStudent': hasStudent
    };

})();

module.exports = ClassListController;
