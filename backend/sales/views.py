from rest_framework import viewsets, permissions, filters
from .models import Customer, Order, OrderItem, OrderNote, Payment
from .serializers import CustomerSerializer, OrderSerializer, OrderItemSerializer, OrderNoteSerializer, PaymentSerializer
from users.permissions import IsStoreManagerOrSuperAdmin

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'phone_number', 'city']
    ordering_fields = ['created_at', 'total_spent', 'first_name', 'last_name']
    ordering = ['-created_at']

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['order_id', 'customer__first_name', 'customer__last_name', 'customer__email']
    ordering_fields = ['created_at', 'updated_at', 'total_amount', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        status_value = self.request.query_params.get('status')
        showroom = self.request.query_params.get('showroom')
        payment_method = self.request.query_params.get('payment_method')
        if status_value:
            queryset = queryset.filter(status=status_value)
        if showroom:
            queryset = queryset.filter(showroom_id=showroom)
        if payment_method:
            queryset = queryset.filter(payment_method=payment_method)
        return queryset

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id', 'quantity', 'unit_price']
    ordering = ['-id']

    def get_queryset(self):
        queryset = super().get_queryset()
        order_id = self.request.query_params.get('order')
        product_id = self.request.query_params.get('product')
        if order_id:
            queryset = queryset.filter(order_id=order_id)
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset

class OrderNoteViewSet(viewsets.ModelViewSet):
    queryset = OrderNote.objects.all()
    serializer_class = OrderNoteSerializer
    permission_classes = [IsStoreManagerOrSuperAdmin]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'amount', 'is_successful']
    ordering = ['-created_at']
