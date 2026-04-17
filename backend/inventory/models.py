from django.db import models
from django.conf import settings
from products.models import Product

class Showroom(models.Model):
    name = models.CharField(max_length=255)
    branch_code = models.CharField(max_length=100, unique=True)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=50, blank=True)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_showrooms')
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} ({self.branch_code})"

class StockRecord(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_records')
    showroom = models.ForeignKey(Showroom, on_delete=models.CASCADE, related_name='stock_records')
    stock_quantity = models.IntegerField(default=0)
    low_stock_threshold = models.IntegerField(default=3)
    
    class Meta:
        unique_together = ('product', 'showroom')
        
    def __str__(self):
        return f"{self.product.name} @ {self.showroom.name}"
