from django.db import models
from products.models import Product, Category

class Coupon(models.Model):
    class DiscountType(models.TextChoices):
        PERCENTAGE = 'PERCENTAGE', 'Percentage'
        FIXED_AMOUNT = 'FIXED_AMOUNT', 'Fixed Amount'
        FREE_DELIVERY = 'FREE_DELIVERY', 'Free Delivery'

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=DiscountType.choices)
    discount_value = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)
    
    # Usage limits
    max_total_uses = models.IntegerField(null=True, blank=True)
    max_per_customer = models.IntegerField(default=1)
    used_count = models.IntegerField(default=0)
    
    # Constraints
    min_order_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    max_discount_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    
    # Applicability
    all_products = models.BooleanField(default=True)
    specific_categories = models.ManyToManyField(Category, blank=True)
    specific_products = models.ManyToManyField(Product, blank=True)
    exclude_sale_items = models.BooleanField(default=True)
    
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} ({self.discount_type})"

class FlashSale(models.Model):
    name = models.CharField(max_length=255)
    banner_image = models.ImageField(upload_to='promotions/flash_sales/', null=True, blank=True)
    products = models.ManyToManyField(Product, related_name='flash_sales')
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    show_countdown = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
