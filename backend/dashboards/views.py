from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg, Case, When, Value, DecimalField
from django.utils import timezone
from datetime import timedelta
from sales.models import Order, Customer
from products.models import Product
from inventory.models import StockRecord

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # KPI Cards Stats
        total_revenue = Order.objects.filter(status='DELIVERED').aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        total_orders = Order.objects.count()
        new_customers = Customer.objects.filter(created_at__gte=timezone.now() - timedelta(days=30)).count()
        avg_order_value = Order.objects.aggregate(Avg('total_amount'))['total_amount__avg'] or 0

        # Order Status breakdown
        status_counts = Order.objects.values('status').annotate(count=Count('id'))
        status_data = {item['status']: item['count'] for item in status_counts}

        return Response({
            'kpis': {
                'total_revenue': total_revenue,
                'total_orders': total_orders,
                'new_customers': new_customers,
                'avg_order_value': avg_order_value,
            },
            'order_status': status_data
        })

class DashboardChartsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Revenue over time (Mocking trends for charts)
        # In a real app, this would be a group_by query on date
        return Response({
            'revenue_over_time': [
                {'name': 'Jan', 'online': 4000, 'offline': 2400},
                {'name': 'Feb', 'online': 3000, 'offline': 1398},
                {'name': 'Mar', 'online': 2000, 'offline': 9800},
                {'name': 'Apr', 'online': 2780, 'offline': 3908},
                {'name': 'May', 'online': 1890, 'offline': 4800},
                {'name': 'Jun', 'online': 2390, 'offline': 3800},
                {'name': 'Jul', 'online': 3490, 'offline': 4300},
            ]
        })

class TopProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # In a real app, join with OrderItems
        top_products = Product.objects.all()[:5]
        return Response([{
            'name': p.name,
            'sku': p.sku,
            'price': p.regular_price,
            'sold': 42 # Placeholder for demonstration
        } for p in top_products])
