import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto, UpdateBudgetDto } from './budgets.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(req.user.userId, createBudgetDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.budgetsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.budgetsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateBudgetDto: UpdateBudgetDto) {
    return this.budgetsService.update(id, req.user.userId, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.budgetsService.remove(id, req.user.userId);
  }
}