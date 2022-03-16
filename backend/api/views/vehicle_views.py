from django.shortcuts import get_list_or_404,render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from api.models import City, Vehicle
from api.serializers import VehicleSerializer, CitySerializer

from rest_framework import status


""" @api_view(['GET'])
def getProducts(request):
    category = request.query_params.get('category')
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    if category != None:
        products = get_list_or_404(Product.objects.filter(
            category__id=category).order_by('-createdAt'))
    else:
        products = Product.objects.filter(
            name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages}) """



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
    print('Page:', page)
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
    currentCity = City.objects.get(id=data['currentCity']['id'])
    vehicle = Vehicle.objects.create(
        vehicleId = data['vehicleId'],
        currentCity = currentCity,
        fuelConsumption = data['fuelConsumption'],
    )

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateVehicle(request, pk):
    data = request.data
    print(data)
    vehicle = Vehicle.objects.get(id=pk)
    currentCity = City.objects.get(id=data['currentCity']['id'])
    vehicle.vehicleId = data['vehicleId']
    vehicle.fuelConsumption = data['fuelConsumption']
    vehicle.currentCity = currentCity
    vehicle.save()

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteVehicle(request, pk):
    vehicle = Vehicle.objects.get(id=pk)
    vehicle.delete()
    return Response('Vehicle Deleted')
