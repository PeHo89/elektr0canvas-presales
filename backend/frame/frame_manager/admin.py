from django.contrib import admin
from .models import *

@admin.register(Frame)
class FrameAdmin(admin.ModelAdmin):
    pass
