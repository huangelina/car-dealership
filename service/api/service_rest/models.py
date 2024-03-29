from django.db import models


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=50, null=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)


class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    is_vip = models.BooleanField(default=False)
    customer = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default='created')

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT
    )
