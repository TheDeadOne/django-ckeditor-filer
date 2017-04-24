CKEDITOR.plugins.add('filer', {
	icons: 'filer',
    lang: 'en,ru',
	init: function(editor) {
		editor.addCommand('insertImage', new CKEDITOR.dialogCommand('filerDialog'));

		editor.ui.addButton('Filer', {
			label: editor.lang.filer.btnLabel,
			command: 'insertImage',
			toolbar: 'insert'
		});

        CKEDITOR.dialog.add('filerDialog', this.path + 'dialogs/filer.js');
	}
});
