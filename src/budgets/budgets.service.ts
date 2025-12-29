import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBudgetDto, UpdateBudgetDto } from './budgets.dto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBudgetDto: CreateBudgetDto) {
    try {
      return await this.prisma.budget.create({
        data: {
          ...createBudgetDto,
          period: createBudgetDto.period || 'monthly',
          userId,
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Budget for this category already exists');
      }
      throw error;
    }
  }

  async findAll(userId: string) {
    return this.prisma.budget.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const budget = await this.prisma.budget.findFirst({
      where: { id, userId },
      include: {
        category: true,
      },
    });

    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    return budget;
  }

  async update(id: string, userId: string, updateBudgetDto: UpdateBudgetDto) {
    await this.findOne(id, userId);

    return this.prisma.budget.update({
      where: { id },
      data: updateBudgetDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.budget.delete({
      where: { id },
    });
  }
}