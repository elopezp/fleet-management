from django.shortcuts import get_list_or_404,render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from api.models import City, Vehicle
from api.serializers import VehicleSerializer

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
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getVehicle(request, pk):
    vehicle = Vehicle.objects.get(id=pk)
    serializer = VehicleSerializer(vehicle, many=False)
    return Response({'vehicle': serializer.data, 'cities': [],})

@api_view(['POST'])
def createVehicle(request):
    data = request.data
    city = City.objects.get(id=data['city'])
    vehicle = Vehicle.objects.create(
        vehicleId = data['vehicleId'],
        currentCity = city,
        fuelConsumption = data['fuelConsumption'],
        fuelConsumed = data['fuelConsumed'],
        distanceTraveled = data['distanceTraveled'],
    )

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateVehicle(request, pk):
    data = request.data
    vehicle = Vehicle.objects.get(id=pk)
    city = City.objects.get(id=data['city']['id'])
    vehicle.vehicleId = data['vehicleId']
    vehicle.fuelConsumption = data['fuelConsumption']
    vehicle.city = city
    vehicle.save()

    serializer = VehicleSerializer(vehicle, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteVehicle(request, pk):
    vehicle = Vehicle.objects.get(id=pk)
    vehicle.delete()
    return Response('Vehicle Deleted')
