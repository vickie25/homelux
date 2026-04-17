from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DeliveryZoneViewSet, DeliveryAssignmentViewSet

router = DefaultRouter()
router.register(r'zones', DeliveryZoneViewSet)
router.register(r'assignments', DeliveryAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
