# -*- coding: utf-8 -*- 
from setuptools import setup

try:
    long_description = open('README.rst', encoding='utf-8').read() + u'\n\n' + open('CHANGES.rst', encoding='utf-8').read()
except TypeError:
    long_description = open('README.rst').read().decode('utf-8') + u'\n\n' + open('CHANGES.rst').read().decode('utf-8')

setup(
    name='django-ckeditor-filer',
    version='1.1.0',
    author='Sergey Gornostaev',
    author_email='sergey@gornostaev.su',

    packages=['ckeditor_filer'],
    include_package_data=True,

    url='https://bitbucket.org/TheDeadOne/django-ckeditor-filer/',
    license = 'BSD license',
    description = u'Adds a button in the django-ckeditor to load images into the django-filer',
    long_description = long_description,

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
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Natural Language :: Russian',
    ),
)
