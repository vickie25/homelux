from django.urls import path
from .views import DashboardStatsView, DashboardChartsView, TopProductsView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('charts/', DashboardChartsView.as_view(), name='dashboard_charts'),
    path('top-products/', TopProductsView.as_view(), name='top_products'),
]
