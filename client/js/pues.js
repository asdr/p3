(function($) {

    // admin create function
    $('.pues-admin-create span.submit>input').live('click', function() {
        var emails = [];
        $('.pues-admin-create span.input>input').each( function() {
            var val = $(this).val();
            if (val && val.length > 0)
                emails.push( { 'email': val } );
        });

        if (emails.length > 0) {
            $.ajax({
                'url': '/api/v1.0/admin/create',
                'type': 'post',
                'data': {
                    'admins': emails
                }
            }).done(function(json) {
                $('.pues-content').load('include/default.html');
            });
        }
    });

    //sigin function
    $('.pues-login-form li.button>input').live('click', function() {
        var data = {};
        data.email = $('.pues-login-form li.email>input').val();
        data.password = $('.pues-login-form li.password>input').val();

        $.ajax({
            'url': '/api/v1.0/auth/signin',
            'type': 'post',
            'data': data
        }).done(function( json ) {
            loadSignedInContent( json );
        });
    });

    //signedin-content links
    $('.pues-signedin-content li>a').live('click', function() {

        var role = this.parentNode.classList.toString();
        if ( role == 'admin' ) {
            $('.pues-content').load('include/adminfunctions.html', function(responseText, textStatus, XMLHttpRequest) {
                
                $('.pues-admin-menu input[type=button]:first').click(function() {
                    var option = $('#adminmenu').val();
                    if (option != '-1') {

                        if (option == 'mod-course')
                        {
                            $('.pues-admin-content').load('include/admin/course.html', function(responseText, textStatus, XMLHttpRequest) {
                                if (textStatus == 'success') {

                                    // crud functions
                                    $('.courses-crud>input[type=button]').click(function() {

                                        var fn = $('#courses-function-menu').val(),
                                            courseId = $('#courses-menu').val();

                                        if (courseId == '-1' && fn != 'fn-create') {
                                            $('.courses-crud-area').html('<h4>Select a course before trying a function.</h4>');
                                            return;
                                        }

                                        if (fn == 'fn-create') {
                                            $('.courses-crud-area').load('include/admin/courseform.html', function(responseText, textStatus) {
                                                if (textStatus == 'success') {
                                                    $(this).find('.course-form input[type=button]')
                                                        .val('Create')
                                                        .click(function() {
                                                            var data = {};
                                                            $('.courses-crud-area .course-form input[type=text]')
                                                                .each(function() {
                                                                    data[this.name] = this.value;
                                                                });

                                                            $.ajax({
                                                                'url': '/api/v1.0/course',
                                                                'type': 'post',
                                                                'data': data
                                                            }).done(function( result ) {
                                                                $('.courses-crud-area').html('<h4>Course create successfully.</h4>');

                                                            });

                                                        });


                                                }
                                            });
                                        }
                                        else if (fn == 'fn-update') {
                                            $('.courses-crud-area').load('include/admin/courseform.html', function(responseText, textStatus) {
                                                if (textStatus == 'success') {
                                                    $(this).find('.course-form input[type=button]').val('Update');
                                                }
                                            });
                                        }
                                        else if (fn == 'fn-remove') {
                                            $.ajax({
                                                'url': '/api/v1.0/course',
                                                'type': 'delete',
                                                'data': {
                                                    'id': courseId
                                                }
                                            }).done(function(response) {
                                                if (response.status && response.status == 'OK') {
                                                    $('#courses-menu>option:selected').detach();
                                                    $('.courses-crud-area').html('<h4>Course deleted successfully.</h4>');
                                                }
                                            });
                                        }

                                    });

                                    // load courses into list
                                    $.ajax({
                                        'url': '/api/v1.0/course/list'
                                    }).done(function( courses ) {
                                        for (var i=0, len=courses.length; i<len; ++i) {

                                            $('#courses-menu').append('<option value="' 
                                                + courses[i]._id 
                                                + '">' 
                                                + courses[i].code 
                                                + ' '
                                                + courses[i].year
                                                + courses[i].semester  
                                                + '</option>');
                                        }
                                    });

                                }
                            });
                        }
                        else if (option == 'mod-instructor')
                        {
                            $('.pues-admin-content').load('include/admin/instructor.html');
                        }
                        else if (option == 'mod-student')
                        {
                            $('.pues-admin-content').load('include/admin/student.html');
                        }

                    }
                });

            });
        }
        else if ( role == 'instructor' ) {
            $('.pues-content').load('include/instructorfunctions.html', function(responseText, textStatus, XMLHttpRequest) {
            
            });
        }
        else if ( role == 'student' ) {
            $('.pues-content').load('include/studentfunctions.html', function(responseText, textStatus, XMLHttpRequest) {
            
            });
        }        

        return false;
    });



    function loadSignedInContent( responseObject ) {
        $('.pues-content').load('include/signedin.html', function(responseText, textStatus, XMLHttpRequest) {
            if (textStatus == 'success') {
                if (responseObject.user.isAdmin == true) {
                    $('.pues-signedin-content>ul')
                        .append('<li class="admin"><a href="">Administrator Functions</a></li>');
                }
                if (responseObject.user.isInstructor == true) {
                    $('.pues-signedin-content>ul')
                        .append('<li class="instructor"><a href="">Instructor Functions</a></li>');
                }
                if (responseObject.user.isStudent == true) {
                    $('.pues-signedin-content>ul')
                        .append('<li class="student"><a href="">Student Functions</a></li>');
                }
            }
        });
    }



    function openApplication() {
        $.ajax({
            'url': '/api/v1.0/open'
        }).done(function( result ) {
            if (result.state === 'firsttime')
            {
                $('.pues-content').load('include/firsttime.html');
            }
            else
            {
                if (typeof result.user == 'undefined') {
                    $('.pues-content').load('include/default.html');
                }
                else
                {
                    loadSignedInContent(result);
                }
            }
        });
    }

    // $(window).on( 'beforeunload', function() {
    //     return "You're leaving PUES...?";
    // });

    window.PUES = {
        'open': openApplication
    };

}) (jQuery);
