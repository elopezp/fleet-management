from django.shortcuts import get_list_or_404,render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from api.models import City, Vehicle, CityDistance
from api.serializers import VehicleSerializer, CitySerializer

from rest_framework import status


@api_view(['GET'])
def getVehicles(request):
    vehicles = Vehicle.objects.all()
    page = request.query_params.get('page')
    paginator = Paginator(vehicles, 5)

    try:
        vehicles = paginator.page(page)
    except PageNotAnInteger:
        vehicles = paginator.page(1)
    except EmptyPage:
        vehicles = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = VehicleSerializer(vehicles, many=True)
    return Response({'vehicles': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getVehicle(request, pk):
    vehicle = Vehicle.objects.get(id=pk)
    serializer = VehicleSerializer(vehicle, many=False)
    cities = City.objects.all()
    serializer_cities = CitySerializer(cities, many=True)
    return Response({'vehicle': serializer.data, 'cities': serializer_cities.data, })

@api_view(['GET'])
def getVehicleCatalog(request):
    cities = City.objects.all()
    serializer_cities = CitySerializer(cities, many=True)
    return Response({'vehicle': {}, 'cities': serializer_cities.data, })

@api_view(['POST'])
def createVehicle(request):
    data = request.data
    fuel_consumption = int(data.get("fuelConsumption", 0))
    fuel_consumed = int(data.get("fuelConsumed", 0))
    distance_traveled = int(data.get("distanceTraveled", 0))
    current_city = City.objects.get(id=data['currentCity']['id'])
    vehicle = Vehicle.objects.create(
        vehicleId = data['vehicleId'],
        currentCity = current_city,
        fuelConsumption = fuel_consumption,
        fuelConsumed = fuel_consumed,
        distanceTraveled = distance_traveled,
    )

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateVehicle(request, pk):
    data = request.data
    vehicle = Vehicle.objects.get(id=pk)
    current_city = City.objects.get(id=data['currentCity']['id'])
    vehicle.vehicleId = data['vehicleId']
    vehicle.currentCity = current_city
    vehicle.fuelConsumption = int(data.get("fuelConsumption", 0))
    vehicle.fuelConsumed = int(data.get("fuelConsumed", 0))
    vehicle.distanceTraveled = int(data.get("distanceTraveled", 0))
    vehicle.save()

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def moveCityVehicle(request, pk):
    data = request.data
    vehicle = Vehicle.objects.get(id=pk)
    current_city = City.objects.get(id=data['currentCity']['id'])
    if current_city.id != vehicle.currentCity.id:
        city_distance = CityDistance.objects.filter(cityFrom__id=vehicle.currentCity.id,cityTo__id=current_city.id).first()
        print(city_distance)
        vehicle.distanceTraveled = vehicle.distanceTraveled + city_distance.distance
        vehicle.fuelConsumed = vehicle.fuelConsumed + (vehicle.fuelConsumption * city_distance.distance)
        vehicle.currentCity = current_city
        vehicle.save()

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteVehicle(request, pk):
    vehicle = Vehicle.objects.get(id=pk)
    vehicle.delete()
    return Response('Vehicle Deleted')
