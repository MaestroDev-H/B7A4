# GearUp Backend API 🏋️
**"Rent Sports & Outdoor Gear Instantly"**

GearUp is a backend RESTful API built for a sports and outdoor equipment rental service. The platform supports role-based functionality for Customers (who browse, rent, and pay for sports gear), Providers (who list, manage stock, and confirm rentals), and Admins (who moderate user accounts, manage categories, and oversee all platform operations).

---

## 🛠️ Tech Stack
- **Runtime Environment**: Node.js & Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon DB Serverless)
- **ORM**: Prisma ORM
- **Request Validation**: Zod Validation
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Payments**: Stripe Payment Intent API

---

## 📹 Walkthrough Video
- **Video Link:** [Watch the Video Walkthrough](https://drive.google.com/file/d/1nZIL2mCqEw2gsICn1OGPDpZeBNxbSqU4/view?usp=sharing)

---

## 🔑 Default Credentials (Seeded)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@gearup.com` | `Admin123!` |
| **Provider** | `provider@gearup.com` | `Provider123!` |
| **Customer** | `customer@gearup.com` | `Customer123!` |

---

## 🚀 Local Setup & Installation

Follow these steps to set up and run the project locally:

### 1. Clone & Install
```bash
git clone <repository-url>
cd B7A4
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and configure the environment variables:
```env
DATABASE_URL="your-postgresql-database-url"
PORT=5000
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS=12
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
CLIENT_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Initialize Database & Seed Data
Generate Prisma Client, push the schema to the database, and seed the initial users and test listing:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

### 4. Run the Server
- **Development Mode** (with hot-reloading):
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

---

## 🔗 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new Customer or Provider
- `POST /api/auth/login` - Login and receive JWT access token
- `GET /api/auth/me` - Retrieve current logged-in user profile

### Gear Items (Public & Provider)
- `GET /api/gear` - Get all gear listings (with filters for search, category, brand, price)
- `GET /api/gear/:id` - Get details of a specific gear item
- `GET /api/categories` - List all gear categories
- `POST /api/provider/gear` - Add a new gear item (Provider only)
- `PUT /api/provider/gear/:id` - Update a gear item listing (Provider only)
- `DELETE /api/provider/gear/:id` - Remove a gear item from inventory (Provider only)

### Rental Orders
- `POST /api/rentals` - Create a new rental order (Customer only)
- `GET /api/rentals` - View customer's own rental history (Customer only)
- `GET /api/rentals/:id` - Retrieve rental order details (Customer, Provider, or Admin)
- `GET /api/provider/orders` - View incoming rental orders (Provider only)
- `PATCH /api/provider/orders/:id` - Update rental order status (Provider/Customer/Admin depending on transition)

### Payments
- `POST /api/payments/create` - Create Stripe PaymentIntent for an order
- `POST /api/payments/confirm` - Confirm payment callback/status check
- `GET /api/payments` - Retrieve payment transaction history (Customer only)
- `GET /api/payments/:id` - Retrieve specific payment details

### Reviews & Admin
- `POST /api/reviews` - Submit a review for a gear item after rental return
- `GET /api/admin/users` - Get all platform users (Admin only)
- `PATCH /api/admin/users/:id` - Activate/suspend user account (Admin only)
- `GET /api/admin/gear` - View all gear listings (Admin only)
- `GET /api/admin/rentals` - View all rental orders (Admin only)
