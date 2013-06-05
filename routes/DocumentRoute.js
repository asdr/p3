var _ = require('underscore'),
    fs = require('fs'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Document'),
    mkdirp = require('mkdirp'),
    DocumentController = require('../controllers/DocumentController');

var DocumentRoute = (function() {

    // SAMPLE UPLOADED FILE
    // {
    //   displayImage: {
    //     size: 11885,
    //     path: '/tmp/1574bb60b4f7e0211fd9ab48f932f3ab',
    //     name: 'avatar.png',
    //     type: 'image/png',
    //     lastModifiedDate: Sun, 05 Feb 2012 05:31:09 GMT,
    //     _writeStream: {
    //       path: '/tmp/1574bb60b4f7e0211fd9ab48f932f3ab',
    //       fd: 14,
    //       writable: false,
    //       flags: 'w',
    //       encoding: 'binary',
    //       mode: 438,
    //       bytesWritten: 11885,
    //       busy: false,
    //       _queue: [],
    //       drainable: true
    //     },
    //     length: [Getter],
    //     filename: [Getter],
    //     mime: [Getter]
    //   }
    // }

    function upload(req, res) {
        var doc = req.files.document;
        if (doc) {

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

                var newPath = '/home/sg/Desktop/p3/uploaded/'+ req.body.course_id + '/' + req.body.projectType + '/' + req.session.user._id + '/';
                mkdirp.sync(newPath);

                newPath += fileName + fileExtension;

                fs.writeFile(newPath, data, { flag: 'w' }, function(err) {
                    if (err) {
                        res.send( JSON.stringify( { 'error': true, 'message': 'Uploading document is failed.' } ) );
                    }
                    else {

                        var doc = {
                            'path': newPath
                            ,'course_id': req.body.course_id
                            ,'projectType': req.body.projectType
                            ,'student_id': req.session.user._id.toString()
                            ,'fileName': fileName + fileExtension
                        }

                        DocumentController.removeDocument({
                            'course_id': req.body.course_id
                            ,'projectType': req.body.projectType
                            ,'student_id': req.session.user._id.toString()
                        }, function(err0) {
                            if (!err0) {
                                DocumentController.createDocument(doc, function(err, doc) {
                                    if (!err) {
                                        var script = '<script language="javascript" type="text/javascript">window.top.window.stopUpload(\'' + req.params.uploader_name + '\', \'{ "status": "OK" }\');</script>';
                                        res.send( script );
                                    }
                                    else
                                    {
                                        res.send( JSON.stringify( { 'error': true, 'message': 'Uploading document is failed.' } ) );
                                    }
                                });
                            }
                        });
                    }
                });
                
            });

        }
    }

    function download(req, res) {
        var newPath = '/home/sg/Desktop/p3/uploaded/'+ req.body.course_id + '/' + req.body.projectType + '/' + req.body.user_id + '/' + req.body.fileName;
        res.download(newPath);
    }

    function getDocumentName(req, res) {
        res.setHeader('Content-Type', 'application/json');

        DocumentController.getDocument({
            'course_id': req.body.course_id
            ,'projectType': req.body.projectType
            ,'student_id': req.body.user_id
        }, function(err, docs) {
            console.log('docroute: ', docs);
            if (!err) {
                if (docs && docs.length > 0) {
                    console.log(docs[0]);
                    res.send( JSON.stringify( { 'status': 'OK', 'file_name': docs[0].fileName } ) );
                }
                else
                {
                    res.send( JSON.stringify( { 'error': true, 'message': 'no document found.' } ) );
                }
            }
            else
            {
                res.send( JSON.stringify( { 'error': true, 'error': err } ) );
            }
        });
    }

    function evaluate(req, res) {
        res.setHeader('Content-Type', 'application/json');

        var key = {
            'course_id': req.body.course_id
            ,'projectType': req.body.projectType
            ,'student_id': req.body.user_id
        };

        var doc = {
            'grade': req.body.grade
            ,'comment': req.body.comment
        }

        DocumentController.getDocument(key, function(err, documents) {
            if (!err) {
                if (documents && documents.length > 0) {
                    doc = _.extend(documents[0], doc);

                    DocumentController.updateDocument(key, doc, function(err) {
                        if (!err) {
                            res.send( JSON.stringify( { 'status': 'OK' } ) );
                        }
                        else
                        {
                            res.send( JSON.stringify( { 'error': true, 'message': 'Cannot update document.' } ) );
                        }
                    });
                }
            }
            else
            {
                res.send( JSON.stringify( { 'error': true, 'error': err } ) );
            }
        });
    }

    function getDocument(req, res) {
        res.setHeader('Content-Type', 'application/json');

        DocumentController.getDocument({
            'course_id': req.body.course_id
            ,'projectType': req.body.projectType
            ,'student_id': req.session.user._id.toString()
        }, function(err, docs) {
            if (!err) {
                if (docs && docs.length > 0) {
                    console.log(docs[0]);
                    res.send( JSON.stringify( { 'status': 'OK', 'document': docs[0] } ) );
                }
                else
                {
                    res.send( JSON.stringify( { 'error': true, 'message': 'no document found.' } ) );
                }
            }
            else
            {
                res.send( JSON.stringify( { 'error': true, 'error': err } ) );
            }
        });
    }

    return {
        'upload': upload
        ,'download':download
        ,'getDocumentName':getDocumentName
        ,'evaluate': evaluate
        ,'getDocument': getDocument
    };

})();

module.exports = DocumentRoute;
