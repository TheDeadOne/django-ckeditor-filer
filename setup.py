# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from setuptools import setup
import sys


long_description = []
for file_name in ('README.rst', 'CHANGES.rst'):
    with open(file_name, **({'encoding': 'utf-8'} if sys.version_info.major == 3 else {})) as fh:
        long_description.append(fh.read() if sys.version_info.major == 3 else fh.read().decode('utf-8'))


setup(
    name='django-ckeditor-filer',
    version='1.2.0',
    author='Sergey Gornostaev',
    author_email='sergey@gornostaev.dev',

    packages=['ckeditor_filer'],
    include_package_data=True,

    url='https://bitbucket.org/TheDeadOne/django-ckeditor-filer/',
    license='BSD license',
    description='Adds a button in the django-ckeditor to load images into the django-filer',
    long_description='\n\n'.join(long_description),

    install_requires=['django-filer', 'django-ckeditor'],

    classifiers=(
        'Development Status :: 5 - Production/Stable',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Natural Language :: Russian',
    ),
)
