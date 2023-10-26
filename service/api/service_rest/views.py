import json
from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from service_rest.models import Appointment, AutomobileVO, Technician


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    propeties = [
        "color",
        "year",
        "vin",
        "sold"
    ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "is_vip",
        "customer",
        "date_time",
        "reason",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianListEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Unable to add technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_technician_detail(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Technician does not exist"}
            )
            response.status_code=404
            return response

    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        print(appointments, "these are the appointments")
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        print("this is content:", content)
        try:
            tech = content["technician"]
            technician = Technician.objects.get(employee_id=tech)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            vin_num = content["vin"]
            car_sold = AutomobileVO.objects.filter(vin=vin_num)
            if len(car_sold) > 0:
                appointment.is_vip = True
                appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Unable to add appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "PUT"])
def api_appointment_detail(request, pk):
    if request.method == "DELETE":
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )
