from rest_framework import serializers
from .models import ListRecord

class ListRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListRecord
        fields = '__all__'