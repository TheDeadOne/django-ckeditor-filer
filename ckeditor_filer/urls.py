try:
    from django.urls import re_path
except ImportError:
    from django.conf.urls import url as re_path

from .views import upload_to_filer


app_name = 'ckeditor_filer'
urlpatterns = [
    re_path(r'upload/$', upload_to_filer, name='upload_to_filer'),
]
