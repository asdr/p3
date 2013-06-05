var fs = require('fs'),
    _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Course'),
    UserRole = require('../core/UserRole'),
    User = require('../model/User'),
    Document = require('../model/Document');

var DocumentController = (function() {

    function createDocument(doc, callback) {
        Document.create(doc, callback);
    }

    function getDocument(key, callback) {
        Document.get(key, callback);
    }

    function removeDocument(key, callback) {
        Document.remove(key, callback);
    }

    function updateDocument(key, doc, callback) {
        Document.update(key, doc, callback);
    }

    return {
        'createDocument': createDocument
        ,'getDocument': getDocument
        ,'removeDocument': removeDocument
        , 'updateDocument': updateDocument
    };

})();

module.exports = DocumentController;
