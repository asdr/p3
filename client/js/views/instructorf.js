(function() {

    function createInstructor_pressed() {
        $this = arguments[0].data['$this'];

        var instructor = {
            'firstname': $this.find('input[name=firstname]').val()
            ,'lastname': $this.find('input[name=lastname]').val()
            ,'email': $this.find('input[name=email]').val()
        };

        $.ajax({
            'url': '/api/v1.0/instructor/create'
            ,'type': 'post'
            ,'data': {
                'instructors': [ instructor ]
            }
        }).done(function() {

            $this.find('h2').detach();
            $this.find('.pr').detach();
            PUES.ViewLoader.load({
                'viewName': 'instructorf'
                ,'clearBeforeLoad': true
            });

        }).fail(function() {
            console.log(arguments);
        }); 
    }

    function remove_pressed() {
        $this = arguments[0].data['$this'];
        var instructor_id = $(this).parents('.single_instructor').find('input[type=hidden]').val();
        $.ajax({
            'url': '/api/v1.0/instructor/'+instructor_id
            ,'type': 'delete'
        }).done(function(json) {
            if (json.status === 'OK') {
                $this.find('h2').detach();
                $this.find('.pr').detach();
                PUES.ViewLoader.load({
                    'viewName': 'instructorf'
                    ,'clearBeforeLoad': true
                });
            }
        });
    }

    PUES.ViewLoader.register('instructorf', function() {
        console.log('instructor functions loaded.');

        this.find('.create_instructor input[type=button]').on('click', { '$this': this }, createInstructor_pressed);
        this.find('.single_instructor .buttons input[name=remove]').on('click', { '$this': this }, remove_pressed);
    });

})();
