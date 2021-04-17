from django.db import models

class Frame(models.Model):
    title = models.CharField(max_length=50)
    size = models.IntegerField()
    size_mm = models.CharField(max_length=50, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True, default="category text here")
    price = models.FloatField()
    description = models.TextField()
    main_image = models.TextField(null=True, blank=True)
    extra_image = models.TextField(null=True, blank=True)
    balance = models.IntegerField(default=150)

class Buyer(models.Model):
    email = models.CharField(max_length=200)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    company = models.CharField(max_length=200, null=True, blank=True)
    address1 = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200, null=True, blank=True)
    zip_code = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    phone = models.CharField(max_length=50, null=True, blank=True)
    frame = models.ForeignKey(Frame, on_delete=models.CASCADE)
