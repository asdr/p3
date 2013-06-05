(function() {

    PUES.ViewLoader.register('uploadf', function() {
        $this = this;

        this.fileuploader({
            'url': '/api/v1.0/document/upload'
            ,'method': 'post'
            ,'name': 'std_upload'
        });

        this.find('form').append('<input type="hidden" name="course_id" />');
        this.find('.pr.upload select:first').on('change', function() {
            $this.find('input[name=course_id]').val( $(this).val() );
        });

        this.find('form').append('<input type="hidden" name="projectType" />');
        this.find('.pr.upload select:last').on('change', function() {
            $this.find('input[name=projectType]').val( $(this).val() );
        });
    });

})();
