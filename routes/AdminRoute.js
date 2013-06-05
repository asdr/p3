var BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole'),
    AdminController = require('../controllers/AdminController');

var AdminRoute = (function() {

    function create(req, res) {
        var admins = req.body.admins;

        AdminController.createAdmin(admins, function(result) {
            res.setHeader('Content-Type', 'application/json');
            res.send('{ "status": "OK" }');
        });
    } 

    function remove(req, res) {
        var key = { '_id': req.params.admin_id };
        
        AdminController.removeAdmin(key, function(err, count) {
            console.log(arguments);
            res.setHeader('Content-Type', 'application/json');
            if (!err) {
                if ( count > 0) {
                    res.send('{ "status": "OK" }');
                }
                else
                {
                    res.send('{ "status": "error", "message": "not found!" }');
                }
            }
        });
    }

    return {
        'create': create
        ,'remove': remove
    };

})();

module.exports = AdminRoute;
