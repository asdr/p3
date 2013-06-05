(function() {

    function signin_pressed() {
        PUES.ViewLoader.load({
            'viewName': 'signin'
        });
    }

    function signout_pressed() {
        $.ajax({
            'url': '/api/v1.0/auth/signout'
        }).done(function( json ) {
            if (json.status === 'OK')
                window.document.location.reload( true );
        }).fail(function() {
            console.log(arguments);
        });
    }

    PUES.ViewLoader.register('index', function() {
        this.find('#header_signin .signin').live('click', signin_pressed);
        this.find('#header_signin .user_email').live('click', signout_pressed);

        PUES.ViewLoader.triggerLoaded({
            'viewName': 'sidebar'
        });
    });

})();
