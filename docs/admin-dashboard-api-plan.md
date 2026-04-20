# Admin Dashboard Backend/API Assurance Plan

## Goal
Ensure every admin component from login through all dashboard modules has a working backend API path, a clear ownership map, and a repeatable verification checklist.

## Coverage Matrix (Component -> API)
- Admin Login -> `POST /api/auth/login/`, `POST /api/auth/refresh/`, `GET /api/auth/me/`
- Dashboard Home -> `GET /api/dashboard/stats/`, `GET /api/dashboard/charts/`, `GET /api/dashboard/top-products/`, `GET /api/dashboard/activity-feed/`
- Orders -> `GET/POST /api/orders/`, `GET/PUT/PATCH/DELETE /api/orders/{id}/`, `GET/POST /api/order-items/`, `GET/POST /api/order-notes/`, `GET/POST /api/payments/`
- Products -> `GET/POST /api/products/`, `GET/PUT/PATCH/DELETE /api/products/{id}/`, `GET/POST /api/product-media/`, `GET/POST /api/product-variants/`
- Categories -> `GET/POST /api/categories/`, `GET/PUT/PATCH/DELETE /api/categories/{id}/`
- Customers -> `GET/POST /api/customers/`, `GET/PUT/PATCH/DELETE /api/customers/{id}/`
- Inventory -> `GET/POST /api/inventory/stock/`, `GET/PUT/PATCH/DELETE /api/inventory/stock/{id}/`
- Promotions -> `GET/POST /api/promotions/coupons/`, `GET/POST /api/promotions/flash-sales/`
- Delivery -> `GET/POST /api/delivery/zones/`, `GET/POST /api/delivery/assignments/`
- Financials -> `GET /api/dashboard/financials/summary/` (added)
- Showrooms -> `GET/POST /api/showrooms/`, `GET/PUT/PATCH/DELETE /api/showrooms/{id}/`
- Reviews -> `GET /api/dashboard/reviews/summary/` (added; backed by external order notes as feedback stream)
- Reports -> `GET /api/dashboard/reports/overview/` (added)
- Staff -> `GET/POST /api/staff/`, `GET/PUT/PATCH/DELETE /api/staff/{id}/`
- Settings -> `GET /api/dashboard/settings/` (added)

## Missing APIs Identified and Added
1. Financial summary endpoint for the Financials page.
2. Reports overview endpoint for the Reports page.
3. Reviews summary endpoint sourced from non-internal order notes.
4. Settings endpoint for current admin profile and feature flags.
5. Activity feed endpoint for recent orders, customers, and stock alerts.

## Dynamic Logic Improvements Implemented
1. Dashboard KPIs now include 30-day trend percentages vs previous 30-day period.
2. Revenue charts now use live monthly aggregates from delivered orders (online/offline split by payment method).
3. Top products now use real sales aggregation from order items (`sold` and `revenue`).
4. Reviews endpoint returns live customer feedback stream from external order notes.
5. Admin CRUD modules now support search, ordering, and query-param filtering:
   - Orders: `status`, `showroom`, `payment_method`
   - Products: `status`, `category`, `product_type`
   - Inventory: `showroom`, `low_stock`
   - Delivery assignments: `completed`, `officer`
   - Staff: `role`, `is_active`
   - Coupons/Flash Sales: `is_active`

## Verification Workflow
1. Authenticate with admin credentials via login endpoint; capture JWT access token.
2. Verify all GET list endpoints return `200` with JWT.
3. Verify role-restricted write endpoints:
   - Super Admin/Store Manager can create/update/delete products, categories, stock, coupons.
   - Non-privileged role receives `403` for restricted writes.
4. Verify dashboard analytics endpoints return expected schema and non-error values:
   - `stats`, `charts`, `top-products`, `financials/summary`, `reports/overview`, `settings`, `reviews/summary`.
5. Run regression checks for relationships:
   - Creating an order item links to existing order/product.
   - Inventory stock record uniqueness by `(product, showroom)`.
6. Smoke test pagination/filters in Postman where supported by DRF defaults.

## Frontend Integration Guidance
- Replace mock login in `AdminLoginPage` with `/api/auth/login/`.
- Inject bearer token into all admin API calls.
- For modules currently showing placeholders, wire each page to its mapped endpoint above.
- If you later add a dedicated reviews app/model, switch `reviews/summary` source from order notes to the new model with minimal frontend change.

