from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'role', 'phone_number', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # Any admin-created user via this endpoint is generally staff
        validated_data['is_staff'] = True 
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

