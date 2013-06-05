(function() {

    function createAdmin_pressed() {
        $this = arguments[0].data['$this'];

        var admin = {
            'firstname': $this.find('input[name=firstname]').val()
            ,'lastname': $this.find('input[name=lastname]').val()
            ,'email': $this.find('input[name=email]').val()
        };

        $.ajax({
            'url': '/api/v1.0/admin/create'
            ,'type': 'post'
            ,'data': {
                'admins': [ admin ]
            }
        }).done(function() {

            $this.find('h2').detach();
            $this.find('.pr').detach();
            PUES.ViewLoader.load({
                'viewName': 'adminf'
                ,'clearBeforeLoad': true
            });

        }).fail(function() {
            console.log(arguments);
        }); 
    }

    function remove_pressed() {
        $this = arguments[0].data['$this'];
        var admin_id = $(this).parents('.single_admin').find('input[type=hidden]').val();
        $.ajax({
            'url': '/api/v1.0/admin/'+admin_id
            ,'type': 'delete'
        }).done(function(json) {
            if (json.status === 'OK') {
                $this.find('h2').detach();
                $this.find('.pr').detach();
                PUES.ViewLoader.load({
                    'viewName': 'adminf'
                    ,'clearBeforeLoad': true
                });
            }
        });
    }

    PUES.ViewLoader.register('adminf', function() {
        console.log('admin functions loaded.');

        this.find('.create_admin input[type=button]').on('click', { '$this': this }, createAdmin_pressed);
        this.find('.single_admin .buttons input[name=remove]').on('click', { '$this': this }, remove_pressed);
    });

})();
