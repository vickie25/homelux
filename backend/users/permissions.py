from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'SUPER_ADMIN')

class IsStoreManagerOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'STORE_MANAGER']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)
