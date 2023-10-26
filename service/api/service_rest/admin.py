from django.contrib import admin
from service_rest.models import Appointment, Technician, AutomobileVO

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(Appointment)
