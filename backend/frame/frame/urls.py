"""frame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls import url
from rest_framework import routers
from frame_manager import views as frame_manager_views

router = routers.DefaultRouter()
router.register(r'users', frame_manager_views.UserViewSet)
router.register(r'groups', frame_manager_views.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include(router.urls)),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^get_frames$', frame_manager_views.get_frames, name='get_frames'),
    url(r'^verify_code$', frame_manager_views.verify_code, name='verify_code'),
    url(r'^verify_email$', frame_manager_views.verify_email, name='verify_email'),
    url(r'^register_buyer$', frame_manager_views.register_buyer, name='register_buyer'),
    re_path(r'', frame_manager_views.catchall),
]
