import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        date: createTransactionDto.date ? new Date(createTransactionDto.date) : new Date(),
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(userId: string, limit = 500) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  async findOne(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(id: string, userId: string, updateTransactionDto: UpdateTransactionDto) {
    await this.findOne(id, userId);

    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...updateTransactionDto,
        date: updateTransactionDto.date ? new Date(updateTransactionDto.date) : undefined,
      },
      include: {
        category: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  async search(userId: string, query: string, limit = 20) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
        note: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        category: true,
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  async createBulk(userId: string, transactions: CreateTransactionDto[]) {
    const results: { created: number; failed: number; errors: string[] } = { created: 0, failed: 0, errors: [] };
    
    for (const transaction of transactions) {
      try {
        await this.create(userId, transaction);
        results.created++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(error.message);
      }
    }
    
    return results;
  }

  async removeBulk(userId: string, transactionIds: string[]) {
    const deleteResult = await this.prisma.transaction.deleteMany({
      where: {
        id: { in: transactionIds },
        userId,
      },
    });
    
    return {
      deleted: deleteResult.count,
      message: `${deleteResult.count} transactions deleted`,
    };
  }
}