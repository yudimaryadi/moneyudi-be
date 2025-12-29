import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(req.user.userId, createCategoryDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.categoriesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.categoriesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, req.user.userId, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.categoriesService.remove(id, req.user.userId);
  }
}