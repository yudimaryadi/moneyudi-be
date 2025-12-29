import { Controller, Get, Patch, Body, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateUserSettingsDto } from './user-settings.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-settings')
@UseGuards(JwtAuthGuard)
export class UserSettingsController {
  constructor(private userSettingsService: UserSettingsService) {}

  @Get()
  findOne(@Request() req) {
    return this.userSettingsService.findOne(req.user.userId);
  }

  @Patch()
  update(@Request() req, @Body(ValidationPipe) updateUserSettingsDto: UpdateUserSettingsDto) {
    return this.userSettingsService.update(req.user.userId, updateUserSettingsDto);
  }
}