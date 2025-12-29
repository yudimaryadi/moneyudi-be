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
}