import uuid
from django.db import models
from django.utils import timezone


class Frame(models.Model):
    title = models.CharField(max_length=50)
    size = models.IntegerField()
    size_mm = models.CharField(max_length=50, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    price = models.FloatField()
    description = models.TextField()
    main_image = models.TextField(null=True, blank=True)
    extra_image = models.TextField(null=True, blank=True)
    balance = models.IntegerField(default=150)

    def __str__(self):
        return self.title


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
    order_date = models.DateTimeField(default=timezone.now)
    order_id = models.UUIDField(default=uuid.uuid4, editable=False)
    tx_hash = models.CharField(max_length=66, null=True, blank=True)
    tx_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return "{} {} ({})".format(
            self.first_name,
            self.last_name,
            self.email
        )


class Email(models.Model):
    email = models.CharField(max_length=200)
    code = models.CharField(max_length=10)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email
