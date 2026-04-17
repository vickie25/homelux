from rest_framework import viewsets, permissions
from .models import Showroom, StockRecord
from .serializers import ShowroomSerializer, StockRecordSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class ShowroomViewSet(viewsets.ModelViewSet):
    queryset = Showroom.objects.all()
    serializer_class = ShowroomSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStoreManagerOrSuperAdmin()]

class StockRecordViewSet(viewsets.ModelViewSet):
    queryset = StockRecord.objects.all()
    serializer_class = StockRecordSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
