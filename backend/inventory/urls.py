from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShowroomViewSet, StockRecordViewSet

router = DefaultRouter()
router.register(r'showrooms', ShowroomViewSet)
router.register(r'inventory/stock', StockRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
