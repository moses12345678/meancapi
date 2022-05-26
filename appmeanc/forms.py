from django import forms
from django.forms import ModelForm
from .models import *
#import calculation


class UploadForm(ModelForm):
    class Meta:
        model = Upload
        fields = '__all__'
        #fields = ['title','content','users']
