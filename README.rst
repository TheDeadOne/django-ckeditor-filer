======================
django-ckeditor-filer
======================

Adds a button in the ckeditor to load images into the filer.

WYSIWYG-редакторы нужны для облегчения жизни простого пользователя, поэтому
грешно заставлять пользователя копировать URL изображения и вставлять в
формочку, как это делается в плагине Image редатора ckeditor. В django-ckeditor
есть функция загрузки изображений, но она просто загружает файлы в
media-каталог, что лишает пользователей возможности управлять ими из админки.
Не пользоваться удобствами django-filer не менее грешно! Этот django app призван
уберечь ваши проекты от грехопадения с помощью интеграции ckeditor и filer. Он 
добавляет в панель insert кнопку Filer, которая почти полностью идентична кнопке
Image, но загружает изображения в Filer.

Установка
========= 
::

$ pip install django-ckeditor-filer

Потом следует добавить 'ckeditor_filer' в INSTALLED_APPS

В ulrs.py вашего проекта ::

  url(r'^ckeditor-filer/', include('ckeditor_filer.urls')),

И в settings.py ::

  CKEDITOR_CONFIGS = {
      'default': {
      'toolbar_MyToolbar': [
          {
              'name': 'insert',
              'items': ['Image', 'Filer', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
          },
      ],
      'toolbar': 'MyToolbar',
      'extraPlugins': 'filer'
      }
  }

Совместимость с djangocms-text-ckeditor
=======================================

CKEditor в Django CMS подключается с помощью плагина djangocms-text-ckeditor.
Модуль можно использовать и с ним. Для этого понадобиться создать символьную
сслыку на каталог статики плагина ::

    ln -s <STATIC_ROOT>/ckeditor/ckeditor/plugins/filer/ <STATIC_ROOT>/djangocms_text_ckeditor/ckeditor/plugins/filer/

Или прописать alias в конфигурации вашего web-сервера. Например для Nginx ::

    location /static/djangocms_text_ckeditor/ckeditor/plugins/filer/ {
        alias <STATIC_ROOT>/ckeditor/ckeditor/plugins/filer/;
    }
