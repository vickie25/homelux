from rest_framework import viewsets, permissions, filters
from .models import Category, Product, ProductMedia, ProductVariant
from .serializers import CategorySerializer, ProductSerializer, ProductMediaSerializer, ProductVariantSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'slug', 'description']
    ordering_fields = ['display_order', 'name']
    ordering = ['display_order', 'name']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'sku', 'slug', 'brand', 'tagline']
    ordering_fields = ['created_at', 'updated_at', 'regular_price', 'sale_price', 'name']
    ordering = ['-created_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

    def get_queryset(self):
        queryset = super().get_queryset()
        status_value = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        product_type = self.request.query_params.get('product_type')
        if status_value:
            queryset = queryset.filter(status=status_value)
        if category:
            queryset = queryset.filter(category_id=category)
        if product_type:
            queryset = queryset.filter(product_type=product_type)
        return queryset

class ProductMediaViewSet(viewsets.ModelViewSet):
    queryset = ProductMedia.objects.all()
    serializer_class = ProductMediaSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['display_order', 'id']
    ordering = ['display_order', 'id']

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['sku', 'color', 'size']
    ordering_fields = ['stock_quantity', 'price_adjustment', 'id']
    ordering = ['id']
