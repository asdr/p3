var _ = require('underscore'),
    BSON = require('mongodb').BSONPure,
    User = require('../model/User'),
    UserRole = require('../core/UserRole');

var AdminController = (function() {

    function createAdmin(admin, callback) {

        console.log(admin.toString());
        if ( admin.length > 1 )
        {
            bulkCreateAdmin(admin, callback);
        }
        else
        {
            if ( !admin[0].email )
            {
                callback.call(this, true, {'message': 'Email is missing.'});
                return;
            }

            if (admin[0].role) delete admin[0].role;
            _.extend(admin[0], { 'role': UserRole.Administrator });

            User.create( admin[0], callback );   
        }
    }

    function bulkCreateAdmin(admins, callback) {
        var validAdmins = [];
        for (var i=0, len=admins.length; i<len; ++i) {
            if ( admins[i].email )
            {
                if (admins[i].role) delete admins[i].role;
                _.extend(admins[i], { 'role': UserRole.Administrator });

                validAdmins.push( admins[i] );
            }
        }

        if (validAdmins.length > 0) {
            User.create( validAdmins, callback );
        }
        else
        {
            callback.call(this, true, { 'message': 'There is no valid admin entry.' });
        }
    }

    function updateAdmin(key, admin, callback) {
        key.role = UserRole.Administrator;
        User.update(key, admin, callback);
    }

    function removeAdmin(key, callback) {
        key.role = UserRole.Administrator;
        User.remove(key, callback);
    }

    function getAdmin(key, callback) {
        key.role = UserRole.Administrator;
        User.get(key, callback);
    }

    return {
        'createAdmin': createAdmin
        ,'bulkCreateAdmin': bulkCreateAdmin
        ,'updateAdmin': updateAdmin
        ,'removeAdmin': removeAdmin
        ,'getAdmin': getAdmin
    };

})();

module.exports = AdminController;
