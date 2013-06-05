(function() {

    PUES.ViewLoader.register('sidebar', function() {

        this.find('.adminf').on('click', function() {
            PUES.ViewLoader.load({ 
                'viewName': 'adminf'
                ,'clearBeforeLoad': true
            });
        });

        this.find('.instructorf').on('click', function() {
            PUES.ViewLoader.load({ 
                'viewName': 'instructorf'
                ,'clearBeforeLoad': true
            });
        });

        this.find('.coursef').on('click', function() {
            PUES.ViewLoader.load({ 
                'viewName': 'coursef'
                ,'clearBeforeLoad': true
            });
        });

        this.find('.uploadf').on('click', function() {
            PUES.ViewLoader.load({
                'viewName': 'uploadf'
                ,'clearBeforeLoad': true
            });
        });

    });

})();