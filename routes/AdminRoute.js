var BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole'),
    AdminController = require('../controllers/AdminController');

var AdminRoute = (function() {

    function create(req, res) {
        var admins = req.body.admins;

        AdminController.createAdmin(admins, function(result) {
            res.setHeader('Content-Type', 'application/json');
            res.send('{ status: "OK" }');
        });
    } 

    return {
        'create': create
    };

})();

module.exports = AdminRoute;
