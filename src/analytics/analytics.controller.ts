import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('monthly-summary')
  getMonthlySummary(@Request() req) {
    return this.analyticsService.getMonthlySummary(req.user.userId);
  }

  @Get('category-breakdown')
  getCategoryBreakdown(@Request() req) {
    return this.analyticsService.getCategoryBreakdown(req.user.userId);
  }

  @Get('spending-trends')
  getSpendingTrends(@Request() req) {
    return this.analyticsService.getSpendingTrends(req.user.userId);
  }
}