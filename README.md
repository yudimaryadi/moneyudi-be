# PengeluaranKu Backend - NestJS + PostgreSQL + Prisma

Backend API untuk aplikasi PengeluaranKu menggunakan NestJS, PostgreSQL, dan Prisma.

## Setup

### 1. Install PostgreSQL
- Download dan install PostgreSQL dari https://www.postgresql.org/download/
- Buat database baru bernama `pengeluaranku`
- Default: username `postgres`, password `password`, port `5432`

### 2. Install Dependencies
```bash
cd pengeluaranku-backend
npm install
```

### 3. Environment Setup
Update file `.env` dengan kredensial PostgreSQL Anda:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/pengeluaranku?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# (Optional) Lihat database dengan Prisma Studio
npx prisma studio
```

### 5. Run Development Server
```bash
npm run start:dev
```

API akan berjalan di `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login user

### Categories (Protected)
- `GET /categories` - Get semua kategori
- `POST /categories` - Buat kategori baru
- `PATCH /categories/:id` - Update kategori
- `DELETE /categories/:id` - Hapus kategori

### Transactions (Protected)
- `GET /transactions?limit=500` - Get transaksi
- `POST /transactions` - Buat transaksi baru
- `PATCH /transactions/:id` - Update transaksi
- `DELETE /transactions/:id` - Hapus transaksi

### Budgets (Protected)
- `GET /budgets` - Get semua budget
- `POST /budgets` - Buat budget baru
- `PATCH /budgets/:id` - Update budget
- `DELETE /budgets/:id` - Hapus budget

## Frontend Integration

Update frontend untuk menggunakan `src/lib/api-client.ts` sebagai pengganti Supabase client.

Contoh penggunaan:
```typescript
import { apiClient } from '@/lib/api-client';

// Login
const result = await apiClient.login('user@example.com', 'password');

// Get categories
const categories = await apiClient.getCategories();

// Create transaction
const transaction = await apiClient.createTransaction({
  amount: 50000,
  description: 'Makan siang',
  categoryId: 'category-id'
});
```