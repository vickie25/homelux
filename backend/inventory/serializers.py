from rest_framework import serializers
from .models import Showroom, StockRecord

class ShowroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showroom
        fields = '__all__'

class StockRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockRecord
        fields = '__all__'
