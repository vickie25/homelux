from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsSuperAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email', 'first_name', 'last_name', 'role']
    ordering_fields = ['id', 'email', 'date_joined', 'last_login']
    ordering = ['-id']

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsSuperAdmin()]
        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        is_active = self.request.query_params.get('is_active')
        if role:
            queryset = queryset.filter(role=role)
        if is_active in ('1', 'true', 'True'):
            queryset = queryset.filter(is_active=True)
        elif is_active in ('0', 'false', 'False'):
            queryset = queryset.filter(is_active=False)
        return queryset

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
