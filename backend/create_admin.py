import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User

email = 'admin@homelux.co.ke'
password = 'vick3900'

try:
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(
            email=email,
            password=password,
            first_name='Admin',
            last_name='Homelux'
        )
        print(f"Successfully created superuser: {email}")
    else:
        user = User.objects.get(email=email)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.role = User.Role.SUPER_ADMIN
        user.save()
        print(f"User {email} updated with new password and superuser privileges.")
except Exception as e:
    print(f"Error: {e}")
