(function() {

    var views = {};

    function triggerLoaded( options ) {
        var defaultOptions = {
            'selector': document.body
            ,'clearBeforeLoad': false
            ,'params': ''
            ,'data': {}
        };

        options = _.extend(defaultOptions, options);

        if (views[options.viewName]) {
            var container = $(options.selector);
            views[options.viewName].call( container );
        }
    }

    function register(viewName, loadFunction) {
        views[viewName] = loadFunction;
    }

    function load( options ) {

        var defaultOptions = {
            'selector': document.body
            ,'clearBeforeLoad': false
            ,'params': ''
            ,'data': {}
        };

        options = _.extend(defaultOptions, options);

        $.ajax({
            'url': '/v/' + options.viewName + options.params
            ,'data': options.data
        }).done(function(html) {
            var container = $(options.selector);
            
            if (options.clearBeforeLoad === true) {
                container.html('');
            }

            container
                .addClass(options.viewName)
                .append(html);
             
            setTimeout(function() {
                if (views[options.viewName])
                    views[options.viewName].call( container );
            }, 200);
        });
    }

    window.PUES = {};
    PUES.ViewLoader = {
        'register': register
        ,'load': load
        ,'triggerLoaded': triggerLoaded
    };

})();
