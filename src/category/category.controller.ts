import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.delete(id);
  }
}
