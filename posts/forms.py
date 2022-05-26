
#from django import forms
from django.forms import ModelForm
from .models import *


class PostForm(ModelForm):
    #title =  forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=234, required=False)
    #description =  forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=234, required=False)
    class Meta:
        model = Post
        fields = ['title', 'description']
