from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, AutomobileVO, Sale
from common.json import ModelEncoder
import json
from decimal import Decimal


# Encoders


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "sold"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salesperson", "customer", "price", "id"]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


    def get_extra_data(self, o):
        return {"salesperson_id": o.salesperson.id}


    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            return decimal_to_str(o)

# Salesperson


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalespersonEncoder)

    try:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    except:
        response = JsonResponse({"message": "Could not create salesperson"})
        response.status_code = 400
        return response


@require_http_methods(["GET", "DELETE"])
def api_salesperson(request, id):
    try:
        salesperson = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse({"error": "Salesperson does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    else:
        salesperson.delete()
        return JsonResponse({"message": "Delete successful"})

# Customer


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)

    try:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    except:
        response = JsonResponse({"message": "Could not create customer"})
        response.status_code = 400
        return response


@require_http_methods(["GET", "DELETE"])
def api_customer(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse({"error": "Customer does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    else:
        customer.delete()
        return JsonResponse({"message": "Delete successful"})

# Sales and Available Cars


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    else:
        content = json.loads(request.body)
        try:
            automobile_href = content['automobile']
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
            content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid automobile"}, status=400)
        try:
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "invalid salesperson id"}, status=400)
        try:
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid customer id"}, status=400)
        sale = Sale.objects.create(**content)
        sale.save()
        sale.automobile.sell()
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    try:
        sale = Sale.objects.get(id=id)
    except Sale.DoesNotExist:
        return JsonResponse({"error": "no such sale"}, status=404)

    if request.method == "GET":
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)
    else:
        sale.delete()
        return JsonResponse({"message": "delete successful"})


@require_http_methods("GET")
def available_cars(request):
    automobiles = AutomobileVO.objects.filter(sold=False)
    return JsonResponse({"automobiles": automobiles}, encoder=AutomobileVOEncoder)


@require_http_methods("GET")
def api_salesperson_sales(request, id):
    sales = Sale.objects.filter(salesperson_id=id)
    return JsonResponse({"sales": sales}, encoder=SaleEncoder)


def decimal_to_str(o):
    if isinstance(o, Decimal):
        return str(o)
    raise TypeError()
