from django.contrib import admin
from .models import *

# Register your models here.


# class PostAdmin(admin.ModelAdmin):
# list_display = ('title', 'description',
# 'author', 'updated', 'created')


#admin.site.register(Post, PostAdmin)
admin.site.register(Post)

admin.site.register(Photo)
