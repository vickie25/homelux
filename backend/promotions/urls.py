from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CouponViewSet, FlashSaleViewSet

router = DefaultRouter()
router.register(r'coupons', CouponViewSet)
router.register(r'flash-sales', FlashSaleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
