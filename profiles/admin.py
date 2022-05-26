from django.contrib import admin
from .models import *

# Register your models here.


class UserProfile(admin.ModelAdmin):
    list_display = ('user', 'bio', 'avatar',
                    'updated', 'created')


admin.site.register(Profile, UserProfile)
