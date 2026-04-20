from rest_framework import viewsets, permissions, filters
from .models import DeliveryZone, DeliveryAssignment
from .serializers import DeliveryZoneSerializer, DeliveryAssignmentSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class DeliveryZoneViewSet(viewsets.ModelViewSet):
    queryset = DeliveryZone.objects.all()
    serializer_class = DeliveryZoneSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'coverage_area']
    ordering_fields = ['name', 'standard_rate', 'express_rate']
    ordering = ['name']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class DeliveryAssignmentViewSet(viewsets.ModelViewSet):
    queryset = DeliveryAssignment.objects.all()
    serializer_class = DeliveryAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['order__order_id', 'tracking_code', 'vehicle_reg_no']
    ordering_fields = ['scheduled_date', 'is_completed', 'id']
    ordering = ['-id']

    def get_queryset(self):
        queryset = super().get_queryset()
        completed = self.request.query_params.get('completed')
        officer = self.request.query_params.get('officer')
        if completed in ('1', 'true', 'True'):
            queryset = queryset.filter(is_completed=True)
        elif completed in ('0', 'false', 'False'):
            queryset = queryset.filter(is_completed=False)
        if officer:
            queryset = queryset.filter(officer_id=officer)
        return queryset
