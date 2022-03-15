from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Vehicle, City, CityDistance

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id','name']

class VehicleSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Vehicle

    def get_city(self, obj):
        city = obj.city
        serializer = CitySerializer(city, many=False)
        return serializer.data