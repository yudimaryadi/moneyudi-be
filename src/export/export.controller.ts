import { Controller, Get, Query, Request, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Get('transactions')
  async exportTransactions(
    @Request() req,
    @Query('format') format: string = 'json',
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Res() res?: Response,
  ) {
    return this.exportService.exportTransactions(
      req.user.userId,
      format,
      from,
      to,
      res,
    );
  }
}