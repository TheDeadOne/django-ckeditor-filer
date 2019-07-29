# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import hashlib

from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.utils.translation import ugettext as _
from django.views.decorators.http import require_POST

from filer.models import Folder, Image


@require_POST
def upload_to_filer(request):
    if request.is_ajax():
        if request.user.is_authenticated:
            if request.user.is_staff:
                folder, created = Folder.objects.get_or_create(name='ckeditor')
                if created:
                    folder.owner = User.objects.filter(is_superuser=True).order_by('id').first()
                    folder.save()
                if request.FILES['image'].content_type:
                    if request.FILES['image'].content_type.split('/')[0] != 'image':
                        return JsonResponse({'status': 'error', 'message': _('The uploaded file must be an image!')})
                data = request.FILES['image'].read()
                sha1 = hashlib.sha1(data).hexdigest()  # nosec
                img = Image.objects.filter(sha1=sha1).first()
                if img is None:
                    img = Image.objects.create(owner=request.user, folder=folder,
                                               original_filename=request.FILES['image'].name,
                                               file=request.FILES['image'])
                return JsonResponse({'status': 'ok', 'url': img.url})
            else:
                return HttpResponseForbidden('')
        else:
            return HttpResponseForbidden('')
    else:
        return HttpResponseBadRequest('')
