from rest_framework import serializers
from .models import Category, Product, ProductMedia, ProductVariant

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'description', 'thumbnail', 'display_order', 'is_active', 'children']

    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []

class ProductMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMedia
        fields = ['id', 'image', 'alt_text', 'is_featured', 'display_order', 'product']
        extra_kwargs = {'product': {'required': False}}

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'color', 'size', 'price_adjustment', 'stock_quantity', 'product']
        extra_kwargs = {'product': {'required': False}}

class ProductSerializer(serializers.ModelSerializer):
    media = ProductMediaSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
