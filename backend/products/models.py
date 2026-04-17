from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='categories/', null=True, blank=True)
    display_order = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    class ProductType(models.TextChoices):
        SIMPLE = 'SIMPLE', 'Simple Product'
        SET = 'SET', 'Product Set'
        VARIABLE = 'VARIABLE', 'Variable Product'

    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        PUBLISHED = 'PUBLISHED', 'Published'
        ARCHIVED = 'ARCHIVED', 'Archived'

    # Identity
    name = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    sku = models.CharField(max_length=100, unique=True)
    brand = models.CharField(max_length=100, blank=True)
    product_type = models.CharField(max_length=20, choices=ProductType.choices, default=ProductType.SIMPLE)
    
    # Relationships
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    
    # Description
    short_description = models.TextField(max_length=300, blank=True)
    description = models.TextField(blank=True)  # Rich text on frontend
    
    # Pricing
    regular_price = models.DecimalField(max_digits=12, decimal_places=2)
    sale_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    is_taxable = models.BooleanField(default=True)
    
    # Delivery
    weight = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    free_delivery = models.BooleanField(default=False)
    assembly_required = models.BooleanField(default=False)
    
    # SEO
    seo_title = models.CharField(max_length=100, blank=True)
    seo_description = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    
    # Administration
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductMedia(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='media')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=255, blank=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=100, blank=True)
    size = models.CharField(max_length=100, blank=True)
    price_adjustment = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    stock_quantity = models.IntegerField(default=0)
