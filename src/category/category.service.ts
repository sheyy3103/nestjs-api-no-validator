import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['products'] });
  }
  async getById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: [{ id: id }],
      relations: ['products'],
    });
  }
  async create(category: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
  async update(id: number, category: UpdateCategoryDto): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, category);
  }
  async delete(id: number): Promise<DeleteResult> {
    const category = await this.getById(id);
    const products = category.products;
    products.forEach((element) => {
      this.productRepository.delete(element.id);
    });
    return this.categoryRepository.delete(id);
  }
}
