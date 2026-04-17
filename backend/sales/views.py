from rest_framework import viewsets, permissions
from .models import Customer, Order, OrderItem, OrderNote, Payment
from .serializers import CustomerSerializer, OrderSerializer, OrderItemSerializer, OrderNoteSerializer, PaymentSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class OrderNoteViewSet(viewsets.ModelViewSet):
    queryset = OrderNote.objects.all()
    serializer_class = OrderNoteSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
