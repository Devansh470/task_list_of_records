from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
# Create your views here.

class ListRecordViewSet(viewsets.ModelViewSet):
    queryset = ListRecord.objects.all()
    serializer_class = ListRecordSerializer
