from django.urls import path
from .views import (api_list_appointment, api_appointment_detail, api_list_technician, api_technician_detail)


urlpatterns = [
    path("appointments/", api_list_appointment, name="list_appointments"),
    path("appointments/<int:pk>/", api_appointment_detail, name="appointment_detail"),
    path("technicians/", api_list_technician, name="list_technician"),
    path("technicians/<int:pk>/", api_technician_detail, name="technician_detail")
]
