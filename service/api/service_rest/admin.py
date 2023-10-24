from django.contrib import admin
from service_rest.models import Appointment, Technician


admin.site.register(Technician)
admin.site.register(Appointment)
