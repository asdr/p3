(function() {

    PUES.ViewLoader.register('gradesf', function() {
        console.log('gradesf loaded');

        var selects = this.find('.pr.grades select'),
            grade = this.find('.pr.grades2 input[name=grade]'),
            comment = this.find('.pr.grades2 input[name=comment]');

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
                'url': '/api/v1.0/document'
                ,'type': 'post'
                ,'data': {
                    'course_id': $(selects[0]).val()
                    ,'projectType': $(this).val()
                }
            }).done(function(result) {
                if (result.status === 'OK') {
                    var doc = result['document'];
                    if (doc) {
                        grade.val(doc.grade);
                        comment.val(doc.comment);
                    }
                }
                else
                {
                    alert('alarm');
                }
            })
        });

        
    });

})();
