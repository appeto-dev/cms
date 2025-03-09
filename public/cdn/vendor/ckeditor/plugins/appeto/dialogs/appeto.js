function elfinderDialog(){
    var lastHash = window.location.hash;
    var width = $(window).width() / 2;
    if(width < 400) {
        width = 400;
    }
    var fm = $('<div/>').dialogelfinder({
        lang : 'fa',
        url : app_root+'/elfinder/connector',
        width: width,
        height: 400,
        resizable: true,
        destroyOnClose : true,
        getFileCallback : function(files, fm) {
            $(currentSummerNoteId).summernote('editor.insertImage',files.url);
            var image_tag = '<img src="'+files.url+'" style="width: 100%; height: auto"/>';
            var doctarget = CKEDITOR.instances.editable;
            doctarget.insertHtml(image_tag);
            window.location.hash = lastHash;
        },
        commandsOptions : {
            getfile : {
                oncomplete : 'close',
                folders : false
            }
        },
        commands : [
            'open', 'reload', 'home', 'up', 'back', 'forward',
            'download', 'rm', 'rename', 'mkdir', 'upload', 'copy',
            'paste'/*, 'edit'*/, 'search', 'info', 'view',
            'resize', 'sort'
        ],
        handlers: {
            destroy: function(event, elfinderInstance) {
                window.location.hash = lastHash;
            }
        }
    }).dialogelfinder('instance');
}

CKEDITOR.dialog.add( 'appetoDialog', function( editor ) {
    return {
        title: 'انتخاب تصویر',
        minWidth: 0,
        minHeight: 0,
        contents: [
            {
                id: 'appeto-elfinder',
                elements: [

                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var abbr = editor.document.createElement( 'abbr' );
            abbr.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            abbr.setText( dialog.getValueOf( 'tab-basic', 'abbr' ) );

            var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                abbr.setAttribute( 'id', id );

            editor.insertElement( abbr );
        }
    };
});