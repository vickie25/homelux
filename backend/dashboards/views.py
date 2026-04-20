from decimal import Decimal
from datetime import timedelta
from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg, F
from django.db.models.functions import TruncMonth
from django.utils import timezone
from sales.models import Order, Customer, OrderItem, OrderNote
from inventory.models import StockRecord
from users.models import User


ONLINE_PAYMENT_METHODS = {'CARD', 'MPESA'}


def _percentage_change(current, previous):
    current_value = Decimal(current or 0)
    previous_value = Decimal(previous or 0)
    if previous_value == 0:
        return Decimal("100.00") if current_value > 0 else Decimal("0.00")
    return ((current_value - previous_value) / previous_value) * Decimal("100")


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        this_30_days = now - timedelta(days=30)
        previous_30_days_start = now - timedelta(days=60)

        delivered_orders_all = Order.objects.filter(status='DELIVERED')
        delivered_30d = delivered_orders_all.filter(created_at__gte=this_30_days)
        delivered_prev_30d = delivered_orders_all.filter(
            created_at__gte=previous_30_days_start, created_at__lt=this_30_days
        )

        total_revenue = delivered_orders_all.aggregate(total=Sum('total_amount'))['total'] or Decimal("0")
        total_orders = Order.objects.count()
        total_orders_prev = Order.objects.filter(
            created_at__gte=previous_30_days_start, created_at__lt=this_30_days
        ).count()
        total_orders_curr = Order.objects.filter(created_at__gte=this_30_days).count()

        new_customers = Customer.objects.filter(created_at__gte=this_30_days).count()
        new_customers_prev = Customer.objects.filter(
            created_at__gte=previous_30_days_start, created_at__lt=this_30_days
        ).count()

        avg_order_value = delivered_orders_all.aggregate(avg=Avg('total_amount'))['avg'] or Decimal("0")
        avg_order_value_prev = delivered_prev_30d.aggregate(avg=Avg('total_amount'))['avg'] or Decimal("0")

        # Order Status breakdown
        status_counts = Order.objects.values('status').annotate(count=Count('id'))
        status_data = {item['status']: item['count'] for item in status_counts}

        return Response({
            'kpis': {
                'total_revenue': total_revenue,
                'total_orders': total_orders,
                'new_customers': new_customers,
                'avg_order_value': avg_order_value,
                'trends': {
                    'revenue_pct_change_30d': _percentage_change(
                        delivered_30d.aggregate(total=Sum('total_amount'))['total'] or Decimal("0"),
                        delivered_prev_30d.aggregate(total=Sum('total_amount'))['total'] or Decimal("0"),
                    ),
                    'orders_pct_change_30d': _percentage_change(total_orders_curr, total_orders_prev),
                    'new_customers_pct_change_30d': _percentage_change(new_customers, new_customers_prev),
                    'avg_order_value_pct_change_30d': _percentage_change(avg_order_value, avg_order_value_prev),
                },
            },
            'order_status': status_data,
        })

class DashboardChartsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        start_window = now - timedelta(days=210)  # 7 months
        monthly = (
            Order.objects.filter(created_at__gte=start_window, status='DELIVERED')
            .annotate(month=TruncMonth('created_at'))
            .values('month', 'payment_method')
            .annotate(total=Sum('total_amount'))
            .order_by('month')
        )

        aggregated_by_month = defaultdict(lambda: {'online': Decimal("0"), 'offline': Decimal("0")})
        for row in monthly:
            month_key = row['month'].strftime('%b')
            bucket = 'online' if row['payment_method'] in ONLINE_PAYMENT_METHODS else 'offline'
            aggregated_by_month[month_key][bucket] += row['total'] or Decimal("0")

        chart_rows = [
            {'name': month, 'online': values['online'], 'offline': values['offline']}
            for month, values in aggregated_by_month.items()
        ]

        return Response({
            'revenue_over_time': chart_rows
        })

class TopProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        top_products = (
            OrderItem.objects.values(
                'product__id',
                'product__name',
                'product__sku',
                'product__regular_price',
            )
            .annotate(
                sold=Sum('quantity'),
                revenue=Sum(F('quantity') * F('unit_price')),
            )
            .order_by('-sold')[:10]
        )

        return Response([
            {
                'product_id': row['product__id'],
                'name': row['product__name'],
                'sku': row['product__sku'],
                'price': row['product__regular_price'],
                'sold': row['sold'] or 0,
                'revenue': row['revenue'] or Decimal("0"),
            }
            for row in top_products
            if row['product__id'] is not None
        ])


class FinancialsSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        prev_month_end = month_start - timedelta(seconds=1)
        prev_month_start = prev_month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        month_revenue = (
            Order.objects.filter(created_at__gte=month_start, status='DELIVERED')
            .aggregate(total=Sum('total_amount'))['total']
            or Decimal("0")
        )
        previous_month_revenue = (
            Order.objects.filter(
                created_at__gte=prev_month_start,
                created_at__lte=prev_month_end,
                status='DELIVERED',
            ).aggregate(total=Sum('total_amount'))['total']
            or Decimal("0")
        )
        month_expenses = month_revenue * Decimal("0.35")
        net_profit = month_revenue - month_expenses

        payment_breakdown_qs = (
            Order.objects.values('payment_method')
            .annotate(count=Count('id'), total=Sum('total_amount'))
            .order_by('-total')
        )
        payment_breakdown = [
            {
                'payment_method': row['payment_method'],
                'count': row['count'],
                'total': row['total'] or Decimal("0"),
            }
            for row in payment_breakdown_qs
        ]

        return Response({
            'summary': {
                'month_revenue': month_revenue,
                'previous_month_revenue': previous_month_revenue,
                'month_expenses_estimate': month_expenses,
                'month_net_profit_estimate': net_profit,
            },
            'payment_breakdown': payment_breakdown,
        })


class ReportsOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        last_30_days = timezone.now() - timedelta(days=30)
        orders_30d = Order.objects.filter(created_at__gte=last_30_days)
        delivered_30d = orders_30d.filter(status='DELIVERED')

        top_customers = (
            Customer.objects.order_by('-total_spent').values(
                'id', 'first_name', 'last_name', 'email', 'total_spent'
            )[:10]
        )

        low_stock_alerts = StockRecord.objects.filter(
            stock_quantity__lte=3
        ).values('id', 'product__name', 'showroom__name', 'stock_quantity')[:20]

        return Response({
            'period': 'last_30_days',
            'orders_count': orders_30d.count(),
            'delivered_orders_count': delivered_30d.count(),
            'revenue': delivered_30d.aggregate(total=Sum('total_amount'))['total'] or 0,
            'average_order_value': delivered_30d.aggregate(avg=Avg('total_amount'))['avg'] or 0,
            'top_customers': list(top_customers),
            'low_stock_alerts': list(low_stock_alerts),
        })


class ReviewsSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # The project has no dedicated review model yet.
        # External (non-internal) order notes are used as an operational feedback stream.
        feedback_qs = OrderNote.objects.filter(is_internal=False).order_by('-created_at')
        return Response({
            'reviews_enabled': True,
            'source': 'order_notes_external_feedback',
            'message': 'Using external order notes as customer feedback until a dedicated reviews model is introduced.',
            'pending_reviews': feedback_qs.count(),
            'average_rating': None,
            'recent_reviews': list(
                feedback_qs.values('id', 'note', 'created_at', 'order__order_id')[:20]
            ),
        })


class AdminSettingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'profile': {
                'id': user.id,
                'email': user.email,
                'role': getattr(user, 'role', None),
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone_number': getattr(user, 'phone_number', ''),
            },
            'roles': [choice[0] for choice in User.Role.choices],
            'feature_flags': {
                'reviews_module': True,
                'advanced_reports': True,
                'multi_showroom': True,
            },
        })


class AdminActivityFeedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recent_orders = Order.objects.order_by('-created_at').values(
            'id', 'order_id', 'status', 'total_amount', 'created_at'
        )[:10]
        recent_customers = Customer.objects.order_by('-created_at').values(
            'id', 'first_name', 'last_name', 'created_at'
        )[:10]
        low_stock = StockRecord.objects.filter(stock_quantity__lte=3).values(
            'id', 'product__name', 'showroom__name', 'stock_quantity'
        )[:10]

        return Response({
            'recent_orders': list(recent_orders),
            'recent_customers': list(recent_customers),
            'low_stock_alerts': list(low_stock),
        })
