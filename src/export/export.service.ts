import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  async exportTransactions(
    userId: string,
    format: string,
    from?: string,
    to?: string,
    res?: Response,
  ) {
    const whereClause: any = { userId };
    
    if (from || to) {
      whereClause.date = {};
      if (from) whereClause.date.gte = new Date(from);
      if (to) whereClause.date.lte = new Date(to);
    }

    const transactions = await this.prisma.transaction.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { date: 'desc' },
    });

    if (format === 'csv' && res) {
      const csv = this.convertToCSV(transactions);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
      return res.send(csv);
    }

    return transactions;
  }

  private convertToCSV(transactions: any[]): string {
    const headers = ['Date', 'Amount', 'Type', 'Note', 'Category'];
    const rows = transactions.map(t => [
      t.date.toISOString().split('T')[0],
      t.amount,
      t.type,
      t.note || '',
      t.category?.name || '',
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}