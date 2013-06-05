var _ = require('underscore'),
    fs = require('fs'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole'),
    InstructorController = require('../controllers/InstructorController'),
    CourseController = require('../controllers/CourseController'),
    ClassListController = require('../controllers/ClassListController');

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

        InstructorController.getInstructor({ '_id': req.body.instructor_id }, function(err, instructors) {
            if (!err) {
                CourseController.createCourse( {
                    'code': req.body.course_code
                    ,'name': req.body.course_name
                    ,'year': req.body.course_year
                    ,'semester': req.body.course_semester
                    ,'instructor_firstname': instructors[0].firstname
                    ,'instructor_lastname': instructors[0].lastname
                    ,'instructor_email': instructors[0].email
                }, 
                function(err) {
                    if (!err) {
                        res.send( JSON.stringify( { 'status': 'OK' } ) );    
                    }
                    else {
                        res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
                    }
                } );
            }
        });
    }

    function _listCourses(req, res) {
        res.setHeader('Content-Type', 'application/json');
        
        CourseController.getCourse({}, function(err, courses) {
            if (!err) {
                res.send( JSON.stringify({ 'status': 'OK', 'courses': courses }) );
            }
            else {
                res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
            }
        });
    }

    function _removeCourse(req, res) {
        res.setHeader('Content-Type', 'application/json');
        
        var id = req.params.course_id || '000000000000';
        console.log(id);
        CourseController.removeCourse({ '_id': id }, function(err, doc) {
            if (!err)
            {
                res.send( JSON.stringify( { 'status': 'OK', 'message': 'Remove successful' } ) );
            }
            else {
                res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
            }
        });
    }

    function _createByExcelFile(req, res) {
        if (req.files.myfile) {

            var doc = req.files.myfile;

            fs.readFile(doc.path, function(err, data) {
                var dotLocation = doc.name.lastIndexOf('.'),
                    fileName,
                    fileExtension;
                if (dotLocation > 0) {
                    fileName = doc.name.substring(0, dotLocation - 1);
                    fileExtension = '.' + doc.name.substring(dotLocation + 1);
                }
                else {
                    fileName = doc.name;
                    fileExtension = '';
                }
                var newPath = __dirname + '/../uploaded/ASDR/NEWDOCUMENT' + fileExtension;

                fs.writeFile(newPath, data, { flag: 'w' }, function(err) {
                    if (err) {
                        res.send( JSON.stringify( { 'status': 'error', 'error': err, 'message': 'Uploading document is failed.' } ) );
                    }
                    else {
                        res.send( JSON.stringify( { 'success': true, 'message': 'Uploading document is finished.' } ) );
                    }

                });
            });

        }
    }

    function _addProjectType(req, res) {
        var course_id = req.body.course_id || '000000000000',
            projectType = req.body.projectType;

        CourseController.addProjectType({ '_id': ""+course_id }, projectType, function(err, count) {
            if (!err) {
                res.send( '{ "status": "OK" }' );
            }
            else {
                res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
            }
        });
    }

    function _removeProjectType(req, res) {
        var course_id = req.params.course_id || '000000000000',
            projectType = req.body.projectType;

        CourseController.removeProjectType({ '_id': ""+course_id }, projectType, function(err, count) {
            if (!err) {
                res.send( '{ "status": "OK" }' );
            }
            else {
                res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
            }
        });
    }

    function _createClassList(req, res) {
        var course_id = req.body.course_id || '000000000000',
            students = req.body.students,
            newStd = [];

        console.log('students: ', students);
        for (var i=0;i<students.length; ++i) {
            if (!students[i].no ||
                !students[i].email ||
                !students[i].firstname ||
                !students[i].lastname ) {
                continue;
            }

            newStd.push(students[i]);
        }

        console.log('newStd: ', newStd);

        if (newStd.length == 0) {
            res.send( JSON.stringify( { 'status': 'error', 'message': 'Student missing' } ) );
            return;
        }

        ClassListController.createClassList({ '_id': course_id}, newStd, function(err, classList) {
            if (!err) {
                res.send( JSON.stringify( { 'status': 'OK' } ) );
            }
            else {
                res.send( JSON.stringify( { 'status': 'error', 'error': err } ) );
            }
        });
    }

    return {
        'createCourse': _createCourse
        ,'listCourses': _listCourses
        ,'removeCourse': _removeCourse
        ,'createByExcelFile': _createByExcelFile
        ,'addProjectType': _addProjectType
        ,'removeProjectType': _removeProjectType
        ,'createClassList': _createClassList
    };

})();

module.exports = CourseRoute;
