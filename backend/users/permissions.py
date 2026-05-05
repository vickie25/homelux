from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'SUPER_ADMIN')

class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'MANAGER')

class IsManagerOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'MANAGER']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)

class IsSalesAgent(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'SALES_AGENT')

class IsSalesAgentOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'SALES_AGENT']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)

class IsDispatcher(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'DISPATCHER')

class IsDispatcherOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'DISPATCHER']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)

class IsFundi(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'FUNDI')

class IsDriver(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'DRIVER')

class IsInventoryManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'INVENTORY_MANAGER')

class IsInventoryManagerOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'INVENTORY_MANAGER']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)

class IsAccountant(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ACCOUNTANT')

class IsAccountantOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'ACCOUNTANT']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)
