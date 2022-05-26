#from ipaddress import summarize_address_range
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import View
from .forms import *
from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model
from .models import *


# ------Section homePage ----------------#

def home(request):
    return render(request, "home.html")

# ------Section homePage ----------------#


class uploadContent(View):

    def get(self, request):
        form = UploadForm()

        return render(request, "uploadcontent.html", context={'form': form})

    def post(self, request):
        if request.method == 'POST':
            form = UploadForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return JsonResponse({'data': 'Video uploaded successfull'})
            else:
                return JsonResponse({'data': 'Something went wrong'})

# ------section dashboard ---------------#


def dashboard(request):
    return render(request, "dashboard.html")


# ------section registration file ----------#
'''
def register(request):
    if request.method == "POST":
        #form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"New account created: {username}")
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        else:
            messages.error(request, "Account creation failed")

        return redirect("main:homepage")

    form = UserCreationForm()
    return render(request, "register.html", {"form": form})
'''
