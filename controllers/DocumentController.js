var fs = require('fs'),
    _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole'),
    User = require('../model/User'),
    Document = require('../model/Document');

var DocumentController = (function() {

    function uploadDocument(course, projectType, path, name, extension, data) {

    }

    return {
        'uploadDocument': uploadDocument,
        
    };

})();

module.exports = DocumentController;
