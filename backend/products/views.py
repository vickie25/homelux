from rest_framework import viewsets, permissions
from .models import Category, Product, ProductMedia, ProductVariant
from .serializers import CategorySerializer, ProductSerializer, ProductMediaSerializer, ProductVariantSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class ProductMediaViewSet(viewsets.ModelViewSet):
    queryset = ProductMedia.objects.all()
    serializer_class = ProductMediaSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
