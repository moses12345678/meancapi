from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Upload(models.Model):
    title = models.CharField(max_length=50)
    users = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    content = models.ImageField(upload_to='images/')
    registrationDate = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
