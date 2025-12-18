from django.db import models

# Create your models here.


class ListRecord(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    active = models.BooleanField(default=True)
    inactive = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
