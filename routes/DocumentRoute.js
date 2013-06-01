var _ = require('underscore'),
    fs = require('fs'),
    BSON = require('mongodb').BSONPure,
    Course = require('../model/Document');

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
        if (req.files.document) {

            fs.readFile(req.files.document.path, function(err, data) {
                var dotLocation = req.files.document.name.lastIndexOf('.'),
                    fileName,
                    fileExtension;
                if (dotLocation > 0) {
                    fileName = req.files.document.name.substring(0, dotLocation - 1);
                    fileExtension = '.' + req.files.document.name.substring(dotLocation + 1);
                }
                else {
                    fileName = req.files.document.name;
                    fileExtension = '';
                }
                var newPath = __dirname + '/../uploaded/ASDR/NEWDOCUMENT' + fileExtension;

                fs.writeFile(newPath, data, { flag: 'w' }, function(err) {
                    if (err) {
                        res.send( JSON.stringify( { 'error': true, 'message': 'Uploading document is failed.' } ) );
                    }
                    else {
                        res.send( JSON.stringify( { 'success': true, 'message': 'Uploading document is finished.' } ) );
                    }

                });
            });

        }
    }

    return {
        'upload': upload
    };

})();

module.exports = DocumentRoute;
