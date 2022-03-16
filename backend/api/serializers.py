from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Vehicle, City, CityDistance

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id','name']

class VehicleSerializer(serializers.ModelSerializer):
    currentCity = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'

    def get_currentCity(self, obj):
        currentCity = obj.currentCity
        serializer = CitySerializer(currentCity, many=False)
        return serializer.data