from rest_framework import viewsets, permissions, filters
from .models import Coupon, FlashSale
from .serializers import CouponSerializer, FlashSaleSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'description']
    ordering_fields = ['valid_from', 'valid_until', 'used_count', 'discount_value']
    ordering = ['-valid_until']

    def get_queryset(self):
        queryset = super().get_queryset()
        is_active = self.request.query_params.get('is_active')
        if is_active in ('1', 'true', 'True'):
            queryset = queryset.filter(is_active=True)
        elif is_active in ('0', 'false', 'False'):
            queryset = queryset.filter(is_active=False)
        return queryset

class FlashSaleViewSet(viewsets.ModelViewSet):
    queryset = FlashSale.objects.all()
    serializer_class = FlashSaleSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['start_time', 'end_time', 'discount_percentage']
    ordering = ['-start_time']

    def get_queryset(self):
        queryset = super().get_queryset()
        is_active = self.request.query_params.get('is_active')
        if is_active in ('1', 'true', 'True'):
            queryset = queryset.filter(is_active=True)
        elif is_active in ('0', 'false', 'False'):
            queryset = queryset.filter(is_active=False)
        return queryset
