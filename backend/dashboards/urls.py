from django.urls import path
from .views import (
    DashboardStatsView,
    DashboardChartsView,
    TopProductsView,
    FinancialsSummaryView,
    ReportsOverviewView,
    ReviewsSummaryView,
    AdminSettingsView,
    AdminActivityFeedView,
)

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('charts/', DashboardChartsView.as_view(), name='dashboard_charts'),
    path('top-products/', TopProductsView.as_view(), name='top_products'),
    path('financials/summary/', FinancialsSummaryView.as_view(), name='financials_summary'),
    path('reports/overview/', ReportsOverviewView.as_view(), name='reports_overview'),
    path('reviews/summary/', ReviewsSummaryView.as_view(), name='reviews_summary'),
    path('settings/', AdminSettingsView.as_view(), name='admin_settings'),
    path('activity-feed/', AdminActivityFeedView.as_view(), name='admin_activity_feed'),
]
