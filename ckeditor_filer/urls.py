from django.conf.urls import url

from .views import *

app_name = 'ckeditor_filer'
urlpatterns = [
    url(r'upload/$', upload_to_filer, name='upload_to_filer'),
]
