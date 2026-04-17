import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from products.models import Category, Product
from inventory.models import Showroom, StockRecord
from sales.models import Customer, Order, OrderItem, Payment
from promotions.models import Coupon

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with comprehensive initial data for the Homelux Admin Dashboard'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting comprehensive database seeding...")
        
        # 1. Users
        admin, _ = User.objects.get_or_create(
            email='admin@homelux.co.ke',
            defaults={
                'password': 'vick3900',
                'first_name': 'John',
                'last_name': 'Kamau',
                'role': 'SUPER_ADMIN',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if _: admin.set_password('vick3900'); admin.save()

        manager, _ = User.objects.get_or_create(
            email='manager@homelux.co.ke',
            defaults={'first_name': 'Alice', 'last_name': 'Manager', 'role': 'STORE_MANAGER', 'is_staff': True}
        )
        if _: manager.set_password('password123'); manager.save()

        # 2. Categories
        categories_data = [
            {'name': 'Living Room', 'description': 'Sofas, coffee tables, and more'},
            {'name': 'Bedroom', 'description': 'Beds, mattresses, and wardrobes'},
            {'name': 'Office', 'description': 'Desks, chairs, and storage'},
            {'name': 'Outdoor', 'description': 'Patio sets and garden furniture'},
        ]
        categories = []
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(name=cat_data['name'], defaults={'description': cat_data['description']})
            categories.append(cat)

        # 3. Showrooms
        showrooms_data = [
            {'name': 'Mombasa Road', 'branch_code': 'MBD-01', 'city': 'Nairobi', 'street_address': 'Kellico Complex'},
            {'name': 'Two Rivers Mall', 'branch_code': 'TRM-01', 'city': 'Nairobi', 'street_address': 'Limuru Road'},
        ]
        showrooms = []
        for s_data in showrooms_data:
            showroom, created = Showroom.objects.get_or_create(branch_code=s_data['branch_code'], defaults=s_data)
            showrooms.append(showroom)

        # 4. Products
        products_data = [
            {'name': 'Hollyann 3-Seater Sofa', 'sku': 'ASH-1024', 'price': 147544, 'cat': categories[0]},
            {'name': 'Finch Bedroom Set', 'sku': 'ASH-2089', 'price': 84995, 'cat': categories[1]},
            {'name': 'Mesh Office Chair', 'sku': 'OFF-500', 'price': 12500, 'cat': categories[2]},
        ]
        products = []
        for p_data in products_data:
            product, created = Product.objects.get_or_create(
                sku=p_data['sku'],
                defaults={
                    'name': p_data['name'],
                    'regular_price': p_data['price'],
                    'category': p_data['cat'],
                    'status': 'PUBLISHED'
                }
            )
            products.append(product)
            
            # Create stock records for each showroom
            for showroom in showrooms:
                StockRecord.objects.get_or_create(
                    product=product,
                    showroom=showroom,
                    defaults={'stock_quantity': random.randint(5, 20)}
                )

        # 5. Customers
        customers_data = [
            {'email': 'grace@email.com', 'first_name': 'Grace', 'last_name': 'Wanjiku', 'city': 'Nairobi'},
            {'email': 'john.o@email.com', 'first_name': 'John', 'last_name': 'Otieno', 'city': 'Kisumu'},
        ]
        customers = []
        for c_data in customers_data:
            customer, created = Customer.objects.get_or_create(email=c_data['email'], defaults=c_data)
            customers.append(customer)

        # 6. Orders & Analytics Data
        if Order.objects.count() < 10:
            for i in range(15):
                customer = random.choice(customers)
                order_status = random.choice(['PENDING', 'PROCESSING', 'DELIVERED'])
                order = Order.objects.create(
                    order_id=f"HX-{4500 + i}",
                    customer=customer,
                    total_amount=0,
                    payment_method=random.choice(['MPESA', 'CARD']),
                    status=order_status,
                    showroom=random.choice(showrooms),
                    created_at=timezone.now() - timedelta(days=random.randint(0, 30))
                )
                
                # Add 1-3 items
                order_total = 0
                for _ in range(random.randint(1, 3)):
                    product = random.choice(products)
                    qty = random.randint(1, 2)
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=qty,
                        unit_price=product.regular_price
                    )
                    order_total += product.regular_price * qty
                
                order.total_amount = order_total
                order.save()
                
                # Create payment
                Payment.objects.create(
                    order=order,
                    amount=order_total,
                    is_successful=True if order_status != 'CANCELLED' else False,
                    transaction_id=f"TXN-{random.randint(10000, 99999)}"
                )

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
