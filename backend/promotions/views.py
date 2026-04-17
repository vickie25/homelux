from rest_framework import viewsets, permissions
from .models import Coupon, FlashSale
from .serializers import CouponSerializer, FlashSaleSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]

class FlashSaleViewSet(viewsets.ModelViewSet):
    queryset = FlashSale.objects.all()
    serializer_class = FlashSaleSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]
