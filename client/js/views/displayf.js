(function() {

    PUES.ViewLoader.register('displayf', function() {

        var selects = this.find('.pr.display select'),
            button = this.find('.pr.display input[type=button]:first');

        $(selects[0]).on('change', function() {
            $.ajax({
                'url': '/api/v1.0/course/' + $(selects[0]).val()
                ,'type': 'get'
            }).done(function(result) {
                if (result.status === 'OK') {
                    var projectTypes = result.courses[0].projectTypes;
                    if (projectTypes) {
                        $(selects[1]).html('<option value="-1"> -- ProjectTypes --</option>');
                        for (var i=0; i<projectTypes.length; ++i) {
                            $(selects[1]).append('<option name="' + projectTypes[i].name + '">' + projectTypes[i].name + '</option>');
                        }
                    }
                }
                else
                {
                    alert('alarm');
                }
            })
        });

        $(selects[1]).on('change', function() {
            $.ajax({
                'url': '/api/v1.0/course/classlist/' + $(selects[0]).val()
                ,'type': 'get'
            }).done(function(result) {
                if (result.status === 'OK' && result.classList.students.length > 0) {
                    var students = result.classList.students;
                    if (students) {
                        $(selects[2]).html('<option value="-1"> -- Students --</option>');
                        for (var i=0; i<students.length; ++i) {
                            $(selects[2]).append('<option name="' + students[i] + '">' + students[i] + '</option>');
                        }
                    }
                }
                else
                {
                    alert('alarm');
                }
            })
        });

        $(selects[2]).on('change', function() {
            $.ajax({
                'url': '/api/v1.0/document/name'
                ,'type': 'post'
                ,'data': {
                    'course_id': $(selects[0]).val()
                    ,'projectType': $(selects[1]).val()
                    ,'user_id': $(selects[2]).val()
                }
            }).done(function(result) {
                if ( result.status === 'OK' ) {
                    $(selects[3]).html('<option value="-1"> -- File Name --</option>');
                    $(selects[3]).append('<option name="' + result.file_name + '">' + result.file_name + '</option>');
                }
                else
                {
                    alert('alarm');
                }
            })
        });

            
        // button.on('click', function() {
        //     $.ajax({
        //         'url': '/api/v1.0/document/download'
        //         ,'type': 'post'
        //         ,'data': {
        //             'course_id': $(selects[0]).val()
        //             ,'projectType': $(selects[1]).val()
        //             ,'user_id': $(selects[2]).val()
        //             ,'fileName': $(selects[3]).val()
        //         }
        //     }).done(function() {
        //         ;
        //     });
        // });

    });

})();