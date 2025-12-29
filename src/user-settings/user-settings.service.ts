import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserSettingsDto } from './user-settings.dto';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string) {
    let settings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      settings = await this.prisma.userSettings.create({
        data: {
          userId,
          monthlyCutoffDay: 1,
        },
      });
    }

    return settings;
  }

  async update(userId: string, updateUserSettingsDto: UpdateUserSettingsDto) {
    const settings = await this.findOne(userId);

    return this.prisma.userSettings.update({
      where: { id: settings.id },
      data: updateUserSettingsDto,
    });
  }
}