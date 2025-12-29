@echo off
echo Setting up PostgreSQL database...

echo 1. Make sure PostgreSQL is running on localhost:5432
echo 2. Create database 'pengeluaranku' if not exists
echo 3. Update .env file with your PostgreSQL credentials

echo.
echo Running Prisma migrations...
npx prisma generate
npx prisma db push

echo.
echo Setup complete! You can now run: npm run start:dev