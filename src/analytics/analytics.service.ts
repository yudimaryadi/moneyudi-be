import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getMonthlySummary(userId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    return {
      month: now.toISOString().slice(0, 7),
      income,
      expense,
      balance: income - expense,
      transactionCount: transactions.length,
    };
  }

  async getCategoryBreakdown(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
    });

    const breakdown = transactions.reduce((acc, t) => {
      const categoryName = t.category?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = { total: 0, count: 0 };
      }
      acc[categoryName].total += t.amount;
      acc[categoryName].count += 1;
      return acc;
    }, {});

    return Object.entries(breakdown).map(([name, data]: [string, any]) => ({
      category: name,
      ...data,
    }));
  }

  async getSpendingTrends(userId: string) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        type: 'expense',
        date: { gte: sixMonthsAgo },
      },
      orderBy: { date: 'asc' },
    });

    const monthlyTrends = transactions.reduce((acc, t) => {
      const month = t.date.toISOString().slice(0, 7);
      if (!acc[month]) acc[month] = 0;
      acc[month] += t.amount;
      return acc;
    }, {});

    return Object.entries(monthlyTrends).map(([month, amount]) => ({
      month,
      amount,
    }));
  }
}