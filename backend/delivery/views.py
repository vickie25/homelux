from rest_framework import viewsets, permissions
from .models import DeliveryZone, DeliveryAssignment
from .serializers import DeliveryZoneSerializer, DeliveryAssignmentSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class DeliveryZoneViewSet(viewsets.ModelViewSet):
    queryset = DeliveryZone.objects.all()
    serializer_class = DeliveryZoneSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class DeliveryAssignmentViewSet(viewsets.ModelViewSet):
    queryset = DeliveryAssignment.objects.all()
    serializer_class = DeliveryAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
