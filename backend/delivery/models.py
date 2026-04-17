from django.db import models
from django.conf import settings
from sales.models import Order

class DeliveryZone(models.Model):
    name = models.CharField(max_length=100)
    coverage_area = models.CharField(max_length=255)
    standard_rate = models.DecimalField(max_digits=10, decimal_places=2)
    express_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    free_delivery_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return self.name

class DeliveryAssignment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='delivery_assignment')
    officer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='deliveries')
    vehicle_reg_no = models.CharField(max_length=50, blank=True)
    scheduled_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    tracking_code = models.CharField(max_length=100, blank=True)
    is_completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Delivery for {self.order.order_id}"
