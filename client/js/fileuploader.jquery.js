(function($) {

    function startUpload( name ){
          document.getElementById(name + '_upload_process').style.visibility = 'visible';
          document.getElementById(name + '_upload_form').style.visibility = 'hidden';
          return true;
    }

    function stopUpload( name, success ){
          var result = '';
          if (success == 1) {
             result = '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
          }
          else {
             result = '<span class="emsg">There was an error during file upload!<\/span><br/><br/>';
          }
          document.getElementById(name + '_upload_process').style.visibility = 'hidden';
          document.getElementById(name + '_upload_form').innerHTML = result + '<label>File: <input name="myfile" type="file" size="30" /><\/label><label><input type="submit" name="submitBtn" class="sbtn" value="Upload" /><\/label>';
          document.getElementById(name + '_upload_form').style.visibility = 'visible';
          return true;
    }

    $.fn.fileuploader = function( options ) {

        if ( !!(options.name) === false ) {
            console.log('name is required for fileuploader');
            return;
        }

        if ( !!(options.url) === false ) {
            console.log('url is required for fileuploader');
            return;
        }

        if ( !!(options.method) === false ) {
            console.log('method is required for fileuploader');
            return;
        }

        this.append(
            '<div class="upload_container">'+
            '    <div class="content">'+
            '        <form name="' + options.name + '" action="' + options.url + '/' + options.name + '" method="' + options.method + '" enctype="multipart/form-data" target="' + options.name + '_upload_target" >'+
            '            <p style="visibility: hidden;" id="' + options.name + '_upload_process">Loading...<br/><img src="/images/loader.gif" /><br/></p>'+
            '            <p id="' + options.name + '_upload_form" align="center"><br/>'+
            '                <label>File:  '+
            '                    <input name="document" type="file" size="30" />'+
            '                </label>'+
            '                <label>'+
            '                    <input type="submit" name="submitBtn" class="sbtn" value="Upload" />'+
            '                </label>'+
            '            </p>'+
            '            <iframe id="' + options.name + '_upload_target" name="' + options.name + '_upload_target" src="#" style="width:0;height:0;border:0px solid #fff;"></iframe>'+
            '        </form>'+
            '    </div>'+
            '</div>');
        
        /*this.find('form').on('submit', function() {
            startUpload(options.name);
        });*/
    };

    window.startUpload = startUpload;
    window.stopUpload = stopUpload;

})(jQuery);
