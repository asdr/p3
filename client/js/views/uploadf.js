(function() {

    PUES.ViewLoader.register('uploadf', function() {

        this.fileuploader({
            'url': '/api/v1.0/document/upload'
            ,'method': 'post'
            ,'name': 'std_upload'
        });

    });

})();
