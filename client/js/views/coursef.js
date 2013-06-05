(function() {

    PUES.ViewLoader.register('coursef', function() {
        console.log('course functions loaded.');
        
        var $this = this;

        this.find('.pr.create .button > input').click(function() {
            var inputs = $this.find('.pr.create input[type=text]'),
                course = {};

            for (var i=0; i<inputs.length; ++i) {
                course[inputs[i].name] = inputs[i].value;
            }

            course.instructor_id = $this.find('.pr.create select').val();

            $.ajax({
              'url': '/api/v1.0/course'
              ,'type': 'post'
              ,'data': course
            }).done(function(result) {
                if (result.status === 'OK') {
                    PUES.ViewLoader.load({
                      'viewName': 'coursef'
                      ,'clearBeforeLoad': true
                    });
                }
            });
        });

        this.find('.pr.excel').fileuploader({
          'name': 'course_excel',
          'url': '/api/v1.0/course/excel',
          'method': 'POST'
        });

        this.find('.pr.list .single_course .remove input').click(function() {
            $.ajax({
              'url': '/api/v1.0/course/' + $(this).parents('.single_course').find('input[type=hidden]').val()
              ,'type': 'delete'
            }).done(function(result) {
                if (result.status === 'OK') {
                    PUES.ViewLoader.load({
                      'viewName': 'coursef'
                      ,'clearBeforeLoad': true
                    });
                }
                else
                {
                    alert(result.message);
                }
            }).fail(function() {
                console.log( arguments );
            });
        });

        this.find('.pr.list .single_course .addpt input').click(function() {
            $(this).parents('.single_course')
                .append('<div class="addpt_name"><input type="text" placeholder="Name" /></div>')
                .append('<div class="addpt_deadline"><input type="text" placeholder="Deadline" /></div>')
                .append('<div class="addpt_button"><input type="button" value="Add" /></div>')
                .find('input[type=button]').click(function() {
                    var projectType = {
                        'name': $(this).parents('.single_course').find('.addpt_name input').val()
                        ,'deadline': $(this).parents('.single_course').find('.addpt_deadline input').val()
                    }
                    $.ajax({
                        'url': '/api/v1.0/course/projecttype'
                        ,'type': 'post'
                        ,'data': {
                          'course_id': $(this).parents('.single_course').find('input[type=hidden]').val()
                          ,'projectType': projectType
                        }
                    }).done(function(result) {
                        if (result.status === 'OK') {
                            $(this).parents('.single_course').find('select').append('<option value="' + 
                                projectType.name + 
                                '">' + 
                                projectType.name + 
                                '/' + 
                                projectType.deadline +
                                '</option>');
                            $(this).parents('.single_course').find('.addpt_name,.addpt_deadline,.addpt_button').detach();
                        }
                        else {
                          console.log(result);
                        }
                    });

                });


        });

        this.find('.pr.list .single_course .removept input').click(function() {
            var projectType = {
                'name': $(this).parents('.single_course').find('select').val()
            };
            $.ajax({
                'url': '/api/v1.0/course/projecttype/' + $(this).parents('.single_course').find('input[type=hidden]').val()
                ,'type': 'delete'
                ,'data': { 
                  'projectType': projectType
                }
            }).done(function(result) {
                if (result.status === 'OK') {
                    console.log(result);
                }
                else {
                  console.log(result);
                }
            });
        });


        this.find('.pr.classlist_create input[type=button]').click(function() {
            var students = [],
                nos = document.getElementsByName('student_no'),
                names = document.getElementsByName('student_firstname'),
                lnames = document.getElementsByName('student_lastname'),
                emails = document.getElementsByName('student_email'),
                course_id = $this.find('.pr.classlist_create select').val();

            for (var i=0; i<10; ++i) {
                var student = {};
                student.no = nos[i].value;
                student.firstname = names[i].value;
                student.lastname = lnames[i].value;
                student.email = emails[i].value;
                
                if (student.no && student.firstname && student.lastname && student.email) {
                  students.push( student );
                }
            }

            $.ajax({
                'url': '/api/v1.0/course/classlist'
                ,'type': 'post'
                ,'data': {
                  'course_id': course_id
                  ,'students': students
                }
            }).done(function(result) {
                if (result.status === 'OK') {
                    alert('ClassList has been created.');
                }
                else {
                  console.log(result.message||result.error);
                }
            });

        });
    });

})();
