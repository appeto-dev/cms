currentCKEditor = null;
CKEDITOR.plugins.add('appeto_button', {
    icons: 'appetobutton',
    hidpi: true,
    init: function( editor ) {
        function routerDialog(editor){
            currentCKEditor = editor;
            $("#button_router_text").val('');
            $("#button_router_type_0").val('none');
            $("#button_router_router_0").val('');
            $("#button_router_router_0").html('');
            button_router_show_settings();
            $("#buttonRouter").modal('show');
        }
        editor.addCommand('appetoButton', {
            exec : function(editor) {
                routerDialog(editor);
            }
        });
        editor.ui.addButton( 'AppetoButton', {
            label: LANG['add_button'],
            command: 'appetoButton',
            toolbar: 'insert'
        });
    }
});
function insertAptButton() {
    if(currentCKEditor != null) {
        var text = $("#button_router_text").val();
        if(text == '') {
            my_alert(LANG['field_error']);
            currentCKEditor = null;
            return false;
        }
        var data = JSON.stringify({
            'type': $("#button_router_type_0").val(),
            'link': $("#button_router_link_0").val(),
            'router': $("#button_router_router_0").html()
        });
        currentCKEditor.insertHtml('<button type="button" style="width: 100%" data-router="'+Base64.encode(data) +'">'+text+'</button>');
        currentCKEditor = null;
        $("#buttonRouter").modal('hide');
    }
}
