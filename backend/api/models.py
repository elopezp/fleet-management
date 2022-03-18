from django.db import models

# Create your models here.

class City(models.Model):
    name = models.CharField(max_length = 100, unique=True)
    id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return self.name


class CityDistance(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    cityFrom = models.ForeignKey(City, related_name='cityFrom',on_delete=models.CASCADE)
    cityTo = models.ForeignKey(City, related_name='cityTo',on_delete=models.CASCADE)
    distance =  models.IntegerField(null=False, blank=True)

    def __str__(self):
        return str('{0} to {1} - {2} km'.format(self.cityFrom.name, self.cityTo.name, self.distance))

class Vehicle(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    vehicleId = models.CharField(max_length = 100, unique=True)
    currentCity = models.ForeignKey(City, on_delete=models.CASCADE)
    fuelConsumption = models.IntegerField(null=False, blank=True)
    fuelConsumed = models.IntegerField(null=True, blank=True, default=0)
    distanceTraveled = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.vehicleId


