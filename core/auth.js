var DBConnector = require('./dbconnector').getInstance(),
	Admin = require('../model/admin'),
	Lecturer = require('../model/lecturer'),
	Student = require('../model/student');

var Auth = (function() {

	var $this = this,
		isAdmin = false,
		isLecturer = false,
		isStudent = false,
		signedInUser = null;

	function signin( data, callback ) {
		var db = DBConnector.db();

		if ( !(data && data['email'] && data['password']) )
		{
			callback.call($this, true, { 'message': 'email and password is required' });
			return;
		}

		Admin.get( data, function(err, admins) {
			if (err)
			{
				callback.call($this, true, err);
				return;
			}

			// not an admin !
			if ( admins.length == 0 )
			{
				Lecturer.get( data, function(err, lecturers) {
					if (err)
					{
						callback.call($this, true, err);
						return;
					}

					// not a lecturer !
					if ( lecturers.length == 0 )
					{
						Student.get( data, function(err, students) {
							if (err)
							{
								callback.call($this, true, err);
								return;
							}

							// not a student
							if ( students.length == 0 )
							{
								callback.call( $this, false, false );
							}
							else
							{
								isStudent = true;
								signedInUser = students[0];
								callback.call( $this, false, students[0] );
							}

						} );
					}
					else
					{
						isLecturer = true;
						signedInUser = lecturers[0];
						callback.call( $this, false, lecturers[0] );
					}
				} );
			}
			else
			{
				isAdmin = true;
				signedInUser = admins[0];
				callback.call( $this, false, admins[0] );
			}
		} );
	}

	function signup( data ) {
		if ( !data )
			return false;
	}

	return {
		'signin': signin,
		'signup': signup
	};

})();

module.exports = Auth;
