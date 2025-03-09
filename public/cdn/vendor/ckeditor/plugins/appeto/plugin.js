currentCKEditor = null;
CKEDITOR.plugins.add('appeto', {
    icons: 'appeto',
    hidpi: true,
    init: function( editor ) {
        function elfinderDialog(editor){
            currentCKEditor = editor;
            $('#filemanagerModal').attr('data-load-it', url + 'api/panel/media/selectCkEditorImage');
            $('#filemanagerModal').modal('show');
        }
        editor.addCommand('appeto', {
            exec : function(editor) {
                elfinderDialog(editor);
            }
        });
        editor.ui.addButton( 'Appeto', {
            label: LANG['add_image'],
            command: 'appeto',
            toolbar: 'insert'
        });
    }
});
function selectCkEditorImage(savePath, filePath, id) {
    if(currentCKEditor != null) {
        var image = currentCKEditor.document.createElement( 'img' );
        image.setAttribute( 'src', filePath.url );
        image.setAttribute( 'style', "width: 100%; height: auto;" );
        image.setAttribute( 'class', "img-responsive apt-content-image" );
        currentCKEditor.insertElement( image );
        currentCKEditor = null;
    }
}
