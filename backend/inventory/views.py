from rest_framework import viewsets, permissions, filters
from .models import Showroom, StockRecord
from .serializers import ShowroomSerializer, StockRecordSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class ShowroomViewSet(viewsets.ModelViewSet):
    queryset = Showroom.objects.all()
    serializer_class = ShowroomSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'branch_code', 'city', 'street_address']
    ordering_fields = ['name', 'city', 'branch_code']
    ordering = ['name']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class StockRecordViewSet(viewsets.ModelViewSet):
    queryset = StockRecord.objects.all()
    serializer_class = StockRecordSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product__name', 'product__sku', 'showroom__name', 'showroom__branch_code']
    ordering_fields = ['stock_quantity', 'low_stock_threshold', 'id']
    ordering = ['stock_quantity']

    def get_queryset(self):
        queryset = super().get_queryset()
        showroom = self.request.query_params.get('showroom')
        low_stock = self.request.query_params.get('low_stock')
        if showroom:
            queryset = queryset.filter(showroom_id=showroom)
        if low_stock in ('1', 'true', 'True'):
            queryset = queryset.filter(stock_quantity__lte=3)
        return queryset
