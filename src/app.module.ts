import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetsModule } from './budgets/budgets.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ExportModule } from './export/export.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaService } from './prisma.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [AuthModule, CategoriesModule, TransactionsModule, BudgetsModule, UserSettingsModule, ExportModule, AnalyticsModule],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}