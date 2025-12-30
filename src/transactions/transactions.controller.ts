import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './transactions.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.userId, createTransactionDto);
  }

  @Get()
  findAll(@Request() req, @Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 500;
    return this.transactionsService.findAll(req.user.userId, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.transactionsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, req.user.userId, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.transactionsService.remove(id, req.user.userId);
  }

  @Get('search')
  search(@Request() req, @Query('q') query: string, @Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 20;
    return this.transactionsService.search(req.user.userId, query, limitNum);
  }

  @Post('bulk')
  createBulk(@Request() req, @Body() body: { transactions: CreateTransactionDto[] }) {
    return this.transactionsService.createBulk(req.user.userId, body.transactions);
  }

  @Delete('bulk')
  removeBulk(@Request() req, @Body() body: { transactionIds: string[] }) {
    return this.transactionsService.removeBulk(req.user.userId, body.transactionIds);
  }
}