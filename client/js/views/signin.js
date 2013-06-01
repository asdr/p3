(function() {

    function signin_pressed() {
        var data = {};
        data.email = arguments[0].data.find('li.email>input').val();
        data.password = arguments[0].data.find('li.password>input').val();

        $.ajax({
            'url': '/api/v1.0/auth/signin',
            'type': 'post',
            'data': data
        }).done(function( json ) {
            if ( json.status === 'OK' ) {
                signin_success.call(arguments[0].data, json);
            }
            else
            {
                alert('alarmmmm!!');
            }
        });
    }

    function signin_success( responseObject ) {
        $('#header_signin > ul').children().detach();
        $('#header_signin > ul').append(
            '<li><a class="user_email" href="#">' 
            + responseObject.user.email 
            + '</a></li>' 
            + '<li><a class="about" href="#">About</a></li>');

        PUES.ViewLoader.load({ 
           'viewName': 'sidebar'
           ,'selector': '#sidebar_content > ul'
           ,'clearBeforeLoad': true
        });

        PUES.ViewLoader.load({
            'viewName': 'welcome'
            ,'selector': '.panel_container > .page'
            ,'clearBeforeLoad': true
        });
    }

    PUES.ViewLoader.register('signin', function() {
        this.find('input[type=button]:first').on('click', this, signin_pressed);
    });

})();