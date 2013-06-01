var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole');

var ProjectType = {
    'InterimReport': 'Interim Report'
    ,'FinalReport': 'Final Report'
    ,'PlagiarismReport': 'Plagiarism Report'
    ,'SourceCode': 'Source Code'
    ,'Presentation': 'Presentation'
};

var CourseController = (function() {

    function bulkCreateCourse(courses, callback) {
        if (courses && courses.length > 0) {
            
            var bulkStore = [];
            for (var i=0, len=courses.length; i<len; ++i) {
                var course = courses[i];

                // we need to define default projecttypes before creatinng course
                // projecttypes are associated to courses
                var projectTypes = [];
                for (t in ProjectType) {
                    projectTypes.push(ProjectType[t]);
                }

                if (course.projectTypes) {
                    course.projectTypes = _.union(course.projectTypes, projectTypes);
                }
                else
                {
                    course.projectTypes = projectTypes;
                }

                bulkStore.push( course );
            }

            Course.create(bulkStore, callback);
        }
    }

    function createCourse(course, callback) {
        // we need to define default projecttypes before creatinng course
        // projecttypes are associated to courses
        var projectTypes = [];
        for (t in ProjectType) {
            projectTypes.push( { 'name': ProjectType[t], 'deadline': null } );
        }

        if (course.projectTypes) {
            course.projectTypes = _.union(course.projectTypes, projectTypes);
        }
        else
        {
            course.projectTypes = projectTypes;
        }

        Course.create(course, callback);
    }

    function updateCourse(key, course, callback) {
        Course.update(key, course, callback);
    }

    function removeCourse(key, course, callback) {
        Course.update(course, callback);
    }

    function getCourse(key, callback) {
        Course.get(key, callback);
    }

    function addProjectType(key, projectType, callback) {

        // check if we had room for a new projecttype
        // there may be at most 8 project types, and 
        // 5 of those are predefined, fixed ones. So, 
        // at most 3 more projecttype can be defined.
        Course.get(key, function(courses) {

            if ( courses.length == 0 ) {
                //
                callback.call( this, false, '{ "message": "Course not found." }' );
            }
            else
            {
                var updatedCourse = _.clone(courses[0]);
                delete updatedCourse.projectTypes;
                updatedCourse.projectTypes = _.union(courses[0].projectTypes, [ projectType ]);

                Course.update({ '_id': courses[0]._id }, updatedCourse, callback);
            }

        });
    }

    function removeProjectType(key, projectType, callback) {

        // check if we had room for a new projecttype
        // there may be at most 8 project types, and 
        // 5 of those are predefined, fixed ones. So, 
        // at most 3 more projecttype can be defined.
        Course.get(key, function(courses) {

            if ( courses.length == 0 ) {
                //
                callback.call( this, false, '{ "message": "Course not found." }' );
            }
            else
            {
                var updatedCourse = _.clone(courses[0]);
                
                var newProjectTypes = [];
                for (var i=0, len=updatedCourse.projectTypes.length; i<len: ++i) {
                    if (updatedCourse.projectTypes[i].name != projectType.name) {
                        newProjectTypes.push(updatedCourse.projectTypes[i]);
                    }
                }
                updatedCourse.projectTypes = newProjectTypes;
                
                Course.update({ '_id': courses[0]._id }, updatedCourse, callback);
            }

        });
    }

    return {
        'bulkCreateCourse': 'bulkCreateCourse'
        ,'createCourse': 'createCourse'
        ,'updateCourse': 'updateCourse'
        ,'removeCourse': 'removeCourse'
        ,'getCourse': 'getCourse'
        ,'addProjectType': 'addProjectType'
        ,'removeProjectType': 'removeProjectType'
    };

})();

module.exports = CourseController;
