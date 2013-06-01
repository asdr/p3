var _ = require('underscore'),
    DBConnector = require('./dbconnector').getInstance(),
    User = require('../model/User'),
    UserRole = require('./UserRole'); 

var Auth = (function() {

    var $this = this;

    function call_boun_mail_service( service_name, parameters, callback ) {
        // whenever a service call is asked for, it return true as successful
        var result = {
            'status': 'OK'
        };
        callback.call(result, result.status);
    }

    function signin( data, callback ) {
        
        if ( !(data && data['email'] && data['password']) )
        {
            callback.call($this, true, { 'message': 'email and password is required' });
            return;
        }

        call_boun_mail_service('login', { 'username': data['email'], 'password': data['password'] }, function(status) {
            if ( status === 'OK' )
            {
                // we dont care the password, it's boun's business
                delete data.password;

                User.get ( data, function(err, users) {
                    if (err)
                    {
                        callback.call($this, true, err);
                        return;
                    }

                    if ( users.length == 0 ) 
                    {
                        callback.call( $this, true, { "message": "user role not defined" } );
                    }
                    else 
                    {
                        var theUser = _.clone(users[0]);
                        theUser.role = [];
                        for (var i=0, len=users.length; i<len; ++i) {
                            
                            theUser.role.push(users[i].role);

                            if (users[i].role == UserRole.Administrator) {
                                theUser.isAdmin = true;
                            } 
                            else if (users[i].role == UserRole.Instructor) {
                                theUser.isInstructor = true;
                            }
                            else if (users[i].role == UserRole.Student) {
                                theUser.isStudent = true;
                            }
                        }

                        callback.call( $this, false, theUser );
                    }
                });
            }
            else
            {
                callback.call( $this, true, '{ "message": "check email address and password" }' );
            }
        });
    }

    return {
        'signin': signin,
    };

})();

module.exports = Auth;
