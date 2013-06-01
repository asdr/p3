var _ = require('underscore'),
    AdminController = require('../controllers/AdminController');

var ApplicationRoute = (function() {

    function open(req, res) {

        AdminController.getAdmin({}, function(err, admins) {
            res.setHeader('Content-Type', 'application/json');
            
            if (!err && admins && admins.length > 0) {
                res.send( JSON.stringify( { 'state': 'normal', 'user': req.session.user } ) );
            }
            else
            {
                res.send( JSON.stringify( { 'state': 'firsttime' } ) );   
            }
        });
    }

    return {
        'open': open
    }

})();

module.exports = ApplicationRoute;
