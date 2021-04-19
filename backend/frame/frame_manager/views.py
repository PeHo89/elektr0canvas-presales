import json

from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core import serializers

from frame_manager.serializers import UserSerializer, GroupSerializer
from .models import *
from .helpers import *

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_frames(request):
    frames = Frame.objects.all()
    result = []
    for f in frames:
        js = {}
        js['id'] = f.pk
        js["title"] = f.title
        js["size"] = f.size
        js["size_mm"] = f.size_mm
        js["category"] = f.category
        js["price"] = f.price
        js["description"] = f.description
        js["main_image"] = f.main_image
        js["extra_image"] = f.extra_image
        js["balance"] = f.balance

        result.append(js)
    return Response({"frames": result})


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_code(request):
    json_data = json.loads(request.body)
    email = json_data["email"]
    code = json_data["code"]
    
    try:
        email = Email.objects.get(email=email)
        if email.code == code:
            email.verified = True
            email.save()
            return Response({"verified": True})
        else:
            return Response({"verified": False})
    except Email.DoesNotExist:
        return Response({"verified": False})


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    json_data = json.loads(request.body)
    email = json_data["email"]
    try:
        e = Email.objects.get(email=email, verified=True)
        return Response({"verified": e.verified})
    except Email.DoesNotExist:
        code = generate_code(6)
        try:
            e = Email.objects.get(email=email)
            e.code = code
            e.save()
        except Email.DoesNotExist:
            e = Email(
                email=email,
                code=code
            )
            e.save()
        print(code)
        # send_verification_code_email(email, code)
        return Response({"verified": False})


@api_view(['POST'])
@permission_classes([AllowAny])
def register_buyer(request):
    json_data = json.loads(request.body)
    email = json_data["email"]
    first_name = json_data["first_name"]
    last_name = json_data["last_name"]
    company = json_data["company"]
    address1 = json_data["address1"]
    address2 = json_data["address2"]
    city = json_data["city"]
    country = json_data["country"]
    zip_code = json_data["zip_code"]
    phone = json_data["phone"]
    frame = json_data["frame"]

    b = Buyer(
        email=email,
        first_name=first_name,
        last_name=last_name,
        company=company,
        address1=address1,
        address2=address2,
        city=city,
        country=country,
        zip_code=zip_code,
        phone=phone,
        frame=Frame.objects.get(pk=int(frame))
    )
    b.save()

    return Response({"success": True})
