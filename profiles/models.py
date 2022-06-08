from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#avatar = models.ImageField(default='avatar.png', upload_to='avatars')

# avatar = models.ImageField(
# default='https://robohash.org/{id}', upload_to='avatars')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(
        default='avatar.png', upload_to='avatars')
    updated = models.DateTimeField(auto_now_add=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"profile of the Users {self.user.username}"
