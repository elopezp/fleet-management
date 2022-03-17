from django.urls import path
from api.views import vehicle_views as views

urlpatterns = [

    path('', views.getVehicles, name="vehicles"),
    path('create/', views.createVehicle, name="vehicle-create"),
    path('<str:pk>/', views.getVehicle, name="vehicle"),
    path('catalog', views.getVehicleCatalog, name="vehicle-catalog"),
    path('update/<str:pk>/', views.updateVehicle, name="vehicle-update"),
    path('delete/<str:pk>/', views.deleteVehicle, name="vehicle-delete"),
    path('moveCity/<str:pk>/', views.moveCityVehicle, name="vehicle-move-city"),
]
