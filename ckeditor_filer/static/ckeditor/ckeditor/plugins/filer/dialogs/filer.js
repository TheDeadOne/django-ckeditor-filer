CKEDITOR.dialog.add('filerDialog', function(editor) {
    return {
        title: editor.lang.filer.dlgTitle,
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: editor.lang.filer.basicTabName,
                elements: [
                    {
                        type: 'file',
                        id: 'image',
                        label: editor.lang.filer.dlgImgLabel,
                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.filer.dlgImgErrorMsg)
                    },
                    {
                        type: 'text',
                        id: 'alt-text',
                        label: editor.lang.filer.dlgAltLabel,
                    },
                    {
                        type: 'text',
                        id: 'img-width',
                        label: editor.lang.filer.dlgWidthLabel,
                        validate: CKEDITOR.dialog.validate.integer(editor.lang.filer.dlgDimErrorMsg)
                    },
                    {
                        type: 'text',
                        id: 'img-height',
                        label: editor.lang.filer.dlgHeightLabel,
                        validate: CKEDITOR.dialog.validate.integer(editor.lang.filer.dlgDimErrorMsg)
                    }
                ]
            },
            {
                id: 'tab-advanced',
                label: editor.lang.filer.advTabName,
                elements: [
                    {
                        type: 'text',
                        id: 'img-id',
                        label: editor.lang.filer.dlgIdLabel,
                    },
                    {
                        type: 'text',
                        id: 'img-class',
                        label: editor.lang.filer.dlgClassLabel,
                    },
                    {
                        type: 'text',
                        id: 'img-style',
                        label: editor.lang.filer.dlgStyleLabel,
                    },
                    {
                        type: 'text',
                        id: 'img-title',
                        label: editor.lang.filer.dlgTitleLabel,
                    }
                ]
            },
            {
                id: 'tab-link',
                label: editor.lang.filer.linkTabName,
                elements: [
                    {
                        type: 'text',
                        id: 'img-link',
                        label: editor.lang.filer.dlgLinkLabel,
                    },
                    {
                        type: 'select',
                        id: 'link-target',
                        label: editor.lang.filer.dlgTargetLabel,
                        items: [
                            [editor.lang.filer.dlgNewWindow, '_blank'],
                            [editor.lang.filer.dlgMainWindow, '_top'],
                            [editor.lang.filer.dlgCurrentWindow, '_self'],
                            [editor.lang.filer.dlgParentWindow, '_parent']
                        ],
                        'default': '_blank'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var altText = dialog.getValueOf('tab-basic', 'alt-text');
            var width = dialog.getValueOf('tab-basic', 'img-width');
            var height = dialog.getValueOf('tab-basic', 'img-height');
            var imgId = dialog.getValueOf('tab-advanced', 'img-id');
            var imgClass = dialog.getValueOf('tab-advanced', 'img-class');
            var style = dialog.getValueOf('tab-advanced', 'img-style');
            var title = dialog.getValueOf('tab-advanced', 'img-title');
            var href = dialog.getValueOf('tab-link', 'img-link');
            var target = dialog.getValueOf('tab-link', 'link-target');

            if(window.FormData !== undefined) {
                var formData = new FormData();

                var fileInput = dialog.getContentElement('tab-basic', 'image').getInputElement().$;
                formData.append('image', fileInput.files[0], fileInput.files[0].name);

                var csrftoken = null;
                if(document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for(var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        if(cookie.substring(0, 10) == ('csrftoken=')) {
                            csrftoken = decodeURIComponent(cookie.substring(10));
                            break;
                        }
                    }
                }

                if(csrftoken)
                    formData.append('csrfmiddlewaretoken', csrftoken);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/ckeditor-filer/upload/', true);
                xhr.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest');
                if(csrftoken)
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            result = JSON.parse(xhr.responseText);
                            if(result.status == 'ok') {
                                imgHtml = '<img src="' + result.url + '"';
                                if(imgId)
                                    imgHtml += ' id="' + imgId + '"';
                                if(imgClass)
                                    imgHtml += ' class="' + imgClass + '"';
                                if(width)
                                    imgHtml += ' width="' + width + '"';
                                if(height)
                                    imgHtml += ' height="' + height + '"';
                                if(title)
                                    imgHtml += ' title="' + title + '"';
                                if(altText)
                                    imgHtml += ' alt="' + altText + '"';
                                else
                                    imgHtml += ' alt=""';
                                if(style)
                                    imgHtml += ' style="' + style + '"';
                                imgHtml += ' />';

                                if(href)
                                    imgHtml = '<a href="' + href + '" target="' + target + '">' + imgHtml + '</a>';

                                editor.insertHtml(imgHtml);
                                editor.insertText('\n');
                            }
                            else if(result.status == 'error') {
                                alert(result.message);
                            }
                        }
                        else {
                            alert(editor.lang.filer.uploadError);
                        }
                    }
                };
                xhr.send(formData);
            }
        }
    };
});
